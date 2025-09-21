import api from "./api"; // adjust the path

export default class BookingApi {
  constructor(baseURL = "http://localhost:5000") {
    this.bookingApi = api; // reuse existing axios instance
    this.baseURL = baseURL + "/booking";
  }

  // Create Booking
  async createBooking({
    booking_date,
    booking_time,
    status,
    paymentStatus,
    vehicle,
    duration,
    total,
    customer_id,
    services
  }) {
    try {
      const response = await this.bookingApi.post(`${this.baseURL}/`, {
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
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to create booking" };
    }
  }

  // Get Bookings (with pagination, search, status)
  async getBookings({ page = 1, limit = 10, searchTerm = "", status = "" } = {}) {
    try {
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (searchTerm) params.searchTerm = searchTerm;
      if (status && status !== "all") params.status = status;

      const response = await this.bookingApi.get(`${this.baseURL}/`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch bookings" };
    }
  }

  // Get Booking by ID
  async getBookingById(booking_id) {
    try {
      const response = await this.bookingApi.get(`${this.baseURL}/${booking_id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch booking" };
    }
  }

  // Update Booking Status
  async updateBookingStatus(booking_id, { status }) {
    try {
      const response = await this.bookingApi.put(`${this.baseURL}/${booking_id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to update booking status" };
    }
  }

  // Update Booking Payment Status
  async updateBookingPaymentStatus(booking_id, { paymentStatus }) {
    try {
      const response = await this.bookingApi.put(`${this.baseURL}/${booking_id}/payment-status`, { paymentStatus });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to update payment status" };
    }
  }
}
