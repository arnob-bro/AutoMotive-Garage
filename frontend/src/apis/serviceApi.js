import api from "./api"; // adjust path

export default class ServiceApi {
  constructor(baseURL = "http://localhost:5000") {
    this.serviceApi = api; // reuse existing axios instance
    this.baseURL = baseURL + "/service";
  }

  async createService({ name, description, price, duration, status }) {
    try {
      const response = await this.serviceApi.post(`${this.baseURL}/create`, {
        name, 
        description, 
        price, 
        duration, 
        status
      });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to create service" };
    }
  }

  async getServices({ page = 1, limit = 10, searchTerm = "", status = "" } = {}) {
    try {
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (searchTerm) params.searchTerm = searchTerm;
      if (status && status !== 'all') params.status = status;

      const response = await this.serviceApi.get(`${this.baseURL}/`, { params });
      console.log('Services response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error.response?.data || { error: "Failed to fetch services" };
    }
  }

  async updateService(service_id, { name, description, price, duration, status }) {
    try {
      const response = await this.serviceApi.put(`${this.baseURL}/${service_id}`, {
        name, 
        description, 
        price, 
        duration, 
        status
      });
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error.response?.data || { error: "Failed to update service" };
    }
  }

  async deleteService(service_id) {
    try {
      const response = await this.serviceApi.delete(`${this.baseURL}/${service_id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error.response?.data || { error: "Failed to delete service" };
    }
  }
}