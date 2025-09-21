class BookingController {
    constructor(bookingService) {
      this.bookingService = bookingService;
  
      // Bind methods
      this.createBooking = this.createBooking.bind(this);
      this.getBookings = this.getBookings.bind(this);
      this.updateBookingStatus = this.updateBookingStatus.bind(this);
      this.getBookingById = this.getBookingById.bind(this);
      this.updateBookingPaymentStatus = this.updateBookingPaymentStatus.bind(this);
    }
  
    // Create booking
    async createBooking(req, res) {
      try {
        const {
          booking_date,
          booking_time,
          status,
          paymentStatus,
          vehicle,
          duration,
          total,
          customer_id,
          services
        } = req.body;
  
        if (
          !booking_date ||
          !booking_time ||
          !status ||
          !paymentStatus ||
          !vehicle ||
          total === undefined ||
          !customer_id
        ) {
          return res.status(400).json({ error: "All fields are required" });
        }
  
  
        const booking = await this.bookingService.createBooking({
          booking_date,
          booking_time,
          status,
          paymentStatus,
          vehicle,
          duration,
          total,
          customer_id,
          services
        });
  
        res.status(201).json({
          success: true,
          message: "Booking created successfully",
          booking
        });
      } catch (err) {
        console.error("Error in createBooking:", err);
        res.status(500).json({ error: err.message || "Internal server error" });
      }
    }
  
    // Get all bookings
    async getBookings(req, res) {
      try {
        const { page = 1, limit = 10, searchTerm = "", status = "" } = req.query;
  
        const result = await this.bookingService.getBookings(
          parseInt(page),
          parseInt(limit),
          searchTerm,
          status
        );
  
        res.json({
          success: true,
          bookings: result.data,
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages
        });
      } catch (error) {
        console.error("Error in getBookings:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    }
  
    // Get booking by ID
    async getBookingById(req, res) {
      try {
        const { booking_id } = req.params;
  
        if (!booking_id) {
          return res.status(400).json({ error: "Booking ID is required" });
        }
  
        const booking = await this.bookingService.getBookingById(booking_id);
        if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
        }
  
        res.json({ success: true, booking });
      } catch (error) {
        console.error("Error in getBookingById:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
      }
    }
  
    // Update booking
    async updateBookingStatus(req, res) {
      try {
        const {
          status,
        } = req.body;
  
        const { booking_id } = req.params;
  
        if (!booking_id) {
          return res.status(400).json({ error: "Booking ID is required" });
        }
  
        const updatedBooking = await this.bookingService.updateBookingStatus({
          booking_id,
          status
        });
  
        if (!updatedBooking) {
          return res.status(404).json({ error: "Booking not found" });
        }
  
        res.json({
          success: true,
          message: "Booking status updated successfully",
          booking: updatedBooking
        });
      } catch (error) {
        console.error("Error in updateBooking:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
      }
    }

    // Update booking
    async updateBookingPaymentStatus(req, res) {
        try {
          const {
            paymentStatus,
          } = req.body;
    
          const { booking_id } = req.params;
    
          if (!booking_id) {
            return res.status(400).json({ error: "Booking ID is required" });
          }
    
          const updatedBooking = await this.bookingService.updateBookingPaymentStatus({
            booking_id,
            paymentStatus
          });
    
          if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
          }
    
          res.json({
            success: true,
            message: "Booking status updated successfully",
            booking: updatedBooking
          });
        } catch (error) {
          console.error("Error in updateBooking:", error);
          res.status(500).json({ error: error.message || "Internal server error" });
        }
      }
  
    
  }
  
  module.exports = BookingController;
  