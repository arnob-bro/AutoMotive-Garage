const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

class BookingService {
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
  
    // Helper to generate booking_code
    generateBookingCode() {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
        const randomPart = uuidv4().split("-")[0].toUpperCase(); // short unique code
        return `BK-${datePart}-${randomPart}`;
    }

    //create
    async createBooking(bookingData) {
        const {
          booking_date,
          booking_time,
          status,
          paymentStatus,
          vehicle,
          duration = "1 hour",
          total,
          customer_id,
          services 
        } = bookingData;
      
        const client = await this.db.connect();
        try {
          await client.query("BEGIN");
      
          const booking_code = this.generateBookingCode();
      
          // Insert into bookings table
          const bookingResult = await client.query(
            `INSERT INTO bookings 
              (booking_code, booking_date, booking_time, status, paymentStatus, vehicle, duration, total, customer_id) 
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) 
             RETURNING *`,
            [
              booking_code,
              booking_date,
              booking_time,
              status,
              paymentStatus,
              vehicle,
              duration,
              total,
              customer_id
            ]
          );
      
          const booking = bookingResult.rows[0];
      
          // Insert services into booking_services table
          if (services && services.length > 0) {
            for (const service of services) {
              await client.query(
                `INSERT INTO booking_services (booking_id, service_id)
                 VALUES ($1, $2)`,
                [booking.booking_id, service.service_id]
              );
            }
          }
      
          await client.query("COMMIT");
      
          return booking;
        } catch (error) {
          await client.query("ROLLBACK");
          console.error("Error in createBooking service:", error);
          throw error;
        } finally {
          client.release();
        }
    }
  
    // Check if booking exists by code
    async getBookingByCode(booking_code) {
      try {
        const result = await this.db.query(
          "SELECT * FROM bookings WHERE booking_code = $1",
          [booking_code]
        );
        return result.rows[0] || null;
      } catch (error) {
        console.error("Error in getBookingByCode:", error);
        throw error;
      }
    }
  
    // Get all bookings with pagination + search + filter
    async getBookings(page = 1, limit = 10, searchTerm = "", status = "") {
        try {
          const offset = (page - 1) * limit;
      
          let query = `SELECT * FROM bookings WHERE 1=1`;
          let params = [];
          let index = 1;
      
          if (searchTerm) {
            query += ` AND (booking_code ILIKE $${index} OR vehicle ILIKE $${index})`;
            params.push(`%${searchTerm}%`);
            index++;
          }
      
          if (status) {
            query += ` AND status = $${index}`;
            params.push(status);
            index++;
          }
      
          query += ` ORDER BY booking_date DESC LIMIT $${index} OFFSET $${index + 1}`;
          params.push(limit, offset);
      
          // Get bookings
          const result = await this.db.query(query, params);
          const bookings = result.rows;
      
          if (bookings.length === 0) {
            return { page, limit, count: 0, data: [] };
          }
      
          // Get all booking_ids
          const bookingIds = bookings.map(b => b.booking_id);
      
          // Fetch related services in one query
          const servicesResult = await this.db.query(
            `SELECT bs.booking_id, bs.booking_services_id, 
                    s.service_id, s.name, s.description
             FROM booking_services bs
             JOIN services s ON bs.service_id = s.service_id
             WHERE bs.booking_id = ANY($1)`,
            [bookingIds]
          );
      
          // Group services by booking_id
          const servicesMap = {};
          servicesResult.rows.forEach(service => {
            if (!servicesMap[service.booking_id]) {
              servicesMap[service.booking_id] = [];
            }
            servicesMap[service.booking_id].push(service);
          });
      
          // Attach services to each booking
          const data = bookings.map(b => ({
            ...b,
            services: servicesMap[b.booking_id] || []
          }));
      
          return {
            page,
            limit,
            count: data.length,
            data
          };
        } catch (error) {
          console.error("Error in getBookings:", error);
          throw error;
        }
    }
      
  
    // Get booking by ID
    async getBookingById(booking_id) {
      try {
        const result = await this.db.query(
          "SELECT * FROM bookings WHERE booking_id = $1",
          [booking_id]
        );
        return result.rows[0] || null;
      } catch (error) {
        console.error("Error in getBookingById:", error);
        throw error;
      }
    }
  
    // Update booking
    async updateBookingStatus(bookingData) {
        const { booking_id, status } = bookingData;
      
        try {
          // Update booking status
          const result = await this.db.query(
            `UPDATE bookings 
             SET status=$1, updated_at = CURRENT_TIMESTAMP 
             WHERE booking_id=$2
             RETURNING *`,
            [status, booking_id]
          );
      
          const updatedBooking = result.rows[0];
          if (!updatedBooking) return null;
      
          // Get customer_id
          const result2 = await this.db.query(
            "SELECT customer_id FROM bookings WHERE booking_id = $1",
            [booking_id]
          );
          const customer_id = result2.rows[0].customer_id;
      
          // Get customer email
          const result3 = await this.db.query(
            "SELECT email FROM users WHERE user_id = $1",
            [customer_id]
          );
          const email = result3.rows[0].email;
      
          // Send email
          await this.transporter.sendMail({
            from: `"AutoMotive Garage BD" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Booking Status Updated`,
            html: `
              <h2>Dear Customer,</h2>
              <p>Your booking <b>#${updatedBooking.booking_code}</b> has been updated.</p>
              <p><b>Status:</b> ${status}</p>
              <p>Thank you for choosing AutoMotive Garage BD 🚗</p>
            `
          });
      
          return updatedBooking;
        } catch (error) {
          console.error("Error in updateBookingStatus:", error);
          throw error;
        }
    }
      


    async updateBookingPaymentStatus(bookingData) {
        const {
          booking_id,
          paymentStatus
        } = bookingData;
    
        try {
          const result = await this.db.query(
            `UPDATE bookings 
             SET paymentStatus=$1, updated_at = CURRENT_TIMESTAMP 
             WHERE booking_id=$2
             RETURNING *`,
            [
                paymentStatus,
                booking_id
            ]
          );

          const updatedBooking = result.rows[0];
          if (!updatedBooking) return null;
      
          // Get customer_id
          const result2 = await this.db.query(
            "SELECT customer_id FROM bookings WHERE booking_id = $1",
            [booking_id]
          );
          const customer_id = result2.rows[0].customer_id;
      
          // Get customer email
          const result3 = await this.db.query(
            "SELECT email FROM users WHERE user_id = $1",
            [customer_id]
          );
          const email = result3.rows[0].email;

          await this.transporter.sendMail({
            from: `"AutoMotive Garage BD" <${process.env.EMAIL_USER}>`,
            to: email, 
            subject: `Booking Payment Status Updated`,
            html: `
              <h2>Dear Customer,</h2>
              <p>Your booking <b>#${updatedBooking.booking_code}</b> has been updated.</p>
              <p><b>Payment Status:</b> ${paymentStatus}</p>
              <p>Thank you for choosing AutoMotive Garage BD 🚗</p>
            `
          });
    
          return updatedBooking || null;
        } catch (error) {
          console.error("Error in updateBookingPaymentStatus:", error);
          throw error;
        }
      }
  }
  
  module.exports = BookingService;
  