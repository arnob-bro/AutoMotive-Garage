import api from "./api"; // adjust path

export default class ServiceApi {
  constructor(baseURL = "http://localhost:5000") {
    this.serviceApi = api; // reuse existing axios instance
    this.baseURL = baseURL+"/service";
  }

  async createService(
    {name, description, price, duration, status}
    ) {
    try {
      const response = await this.serviceApi.post(`${this.baseURL}/`, 
        {
            name, description, price, duration, status
        });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to create service" };
    }
  }

  async getServices({ page, limit, searchTerm, status } = {}) {
    try {
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (searchTerm) params.searchTerm = searchTerm;
      if (status) params.status = status;

      const response = await this.serviceApi.get(`${this.baseURL}/`, { params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch services" };
    }
  }


  
  async updateService(service_id,name, description, price, duration, status) {
    try {
      const response = await this.serviceApi.put(`${this.baseURL}/${service_id}`, 
        { 
            name, description, price, duration, status
        });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to update service" };
    }
  }

  



}
