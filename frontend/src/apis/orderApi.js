import api from "./api";

export default class OrderApi {
  constructor(baseURL = "http://localhost:5000") {
    this.orderApi = api;
    this.baseURL = baseURL + "/order";
  }

  // Create new order
  async createOrder(orderData) {
    try {
      const response = await this.orderApi.post(`${this.baseURL}/create`, orderData);
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to create order" };
    }
  }

  // Get all orders (with pagination + filters)
  async getOrders({ page = 1, limit = 10, searchTerm = "", status = "" } = {}) {
    try {
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (searchTerm) params.searchTerm = searchTerm;
      if (status && status !== "all") params.status = status;

      const response = await this.orderApi.get(`${this.baseURL}/`, { params });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to fetch orders" };
    }
  }

  // Get single order by ID
  async getOrderById(orderId) {
    try {
      const response = await this.orderApi.get(`${this.baseURL}/${orderId}`);
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to fetch order" };
    }
  }

  // Update order status
  async updateOrderStatus(order_id, status) {
    try {
      const response = await this.orderApi.put(`${this.baseURL}/status/${order_id}`, {
        status,
      });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to update order status" };
    }
  }

  // Update payment status
  async updatePaymentStatus(order_id, payment_status) {
    try {
      const response = await this.orderApi.put(`${this.baseURL}/payment/${order_id}`, {
        payment_status,
      });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to update payment status" };
    }
  }
}