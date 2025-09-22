import api from "./api"; // adjust path

export default class OrderApi {
  constructor(baseURL = "http://localhost:5000") {
    this.orderApi = api; // reuse existing axios instance
    this.baseURL = baseURL + "/order";
  }

  // Create new order
  async createOrder({ 
    customer_id,
    delivery_address,
    items,
    total_amount,
    tax,
    net_amount,
    payment_status,
    payment_method
  }) {
    try {
      const response = await this.orderApi.post(`${this.baseURL}/create`, {
        customer_id,
        delivery_address,
        items,
        total_amount,
        tax,
        net_amount,
        payment_status,
        payment_method
      });
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
}
