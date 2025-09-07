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

  async replyToInquiry(contactform_id, replyMessage) {
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
  

 

}

module.exports = ContactService;
