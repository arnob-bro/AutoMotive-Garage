const nodemailer = require("nodemailer");
const {generateInquiryReplyTemplate} = require("../utils/generateInquiryReplyTemplate");

class ContactService {
  constructor(db) {
    this.db = db;

    //email transporter 
    this.transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

  }

  async makeInquiry(name,email, phone, subject, message) {
    try {

      // make an inquiry
      const result = await this.db.query(
        `INSERT INTO contact_forms 
        (name,email, phone, subject, message)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING contactform_id, name,email, phone, subject, message, status, created_at`,
        [
            name,email, phone, subject, message
        ]
      );

      const inquiry = result.rows[0];
      return inquiry || null;
    } catch (err) {
      console.error("Error in creating user:", err.message);
      throw new Error("Failed to create user");
    }
  }

  async getInquiries( page , limit , email, status ) {
    try {
      const offset = (page - 1) * limit;
  
      // Build dynamic WHERE clause
      const conditions = [];
      const values = [];
  
  
      if (email) {
        values.push(`%${email}%`);
        conditions.push(`email ILIKE $${values.length}`);
      }
      if (status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
      }
      
  
      const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  
      // Fetch paginated results
      const result = await this.db.query(
        `SELECT * FROM contact_forms ${whereClause} ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        [...values, limit, offset]
      );
  
      // Get total count for pagination
      const countResult = await this.db.query(
        `SELECT COUNT(*) FROM contact_forms ${whereClause}`,
        values
      );
      const total = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(total / limit);
  
      return {
        success: true,
        inquiries: result.rows,
        pagination: {
          page: page,
          limit,
          total,
          totalPages
        }
      };
    } catch (err) {
      console.error("Error in fetching inquiries:", err.message);
      throw new Error("Failed to fetch inquiries");
    }
  }

  async replyToInquiry(contactform_id, replyMessage, admin_id) {
    try {
      const result = await this.db.query(
        `SELECT * FROM contact_forms WHERE contactform_id = $1`,
        [contactform_id]
      );
  
      if (result.rows.length === 0) throw new Error("Inquiry not found");
  
      const inquiry = result.rows[0];
      const { html, text } = generateInquiryReplyTemplate(inquiry, replyMessage);
  
      await this.transporter.sendMail({
        from: `"Automotive Garage" <${process.env.EMAIL_USER}>`,
        to: inquiry.email,
        subject: `Reply to your inquiry - ${inquiry.subject}`,
        text,
        html,
      });

      const result2 = await this.db.query(
        `SELECT * FROM admins WHERE admin_id = $1`,
        [admin_id]
      );

      const admin_name = result2.rows[0].name;


      await this.db.query(
        `INSERT INTO contact_replies (contactform_id, admin, message) VALUES ($1, $2, $3)`,
        [contactform_id, admin_name, replyMessage]
      );
  
      await this.db.query(
        `UPDATE contact_forms
         SET status = 'Replied'
         WHERE contactform_id = $1`,
        [contactform_id]
      );
  
      return { success: true, message: "Reply sent successfully" };
    } catch (err) {
      console.error("Error in replying to inquiry:", err.message);
      throw err; // throw original error for debugging
    }
  }

  async getReplyByContactFormId(contactform_id) {
    try {
    
        
      const result = await this.db.query(
        `SELECT * FROM contact_replies WHERE contactform_id = $1`,
        [contactform_id]
      );
  
      return result.rows[0] || null;
    } catch (err) {
      console.error("Error in fetching reply:", err.message);
      throw new Error("Failed to fetch reply");
    }
  }

}

module.exports = ContactService;
