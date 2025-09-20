import api from "./api"; // adjust the path

export default class PartApi {
  constructor(baseURL = "http://localhost:5000") {
    this.partApi = api; // reuse existing axios instance
    this.baseURL = baseURL + "/part";
  }

  // Create Part
  async createPart({ 
    name, 
    short_description, 
    long_description, 
    price, 
    stock, 
    category, 
    image, 
    status 
  }) {
    try {
      const response = await this.partApi.post(`${this.baseURL}/create`, {
        name,
        short_description,
        long_description,
        price,
        stock,
        category,
        image,
        status
      });
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Failed to create part" };
    }
  }

  // Get Parts (with pagination, search, status)
  async getParts({ page = 1, limit = 10, searchTerm = "", status = "" } = {}) {
    try {
      const params = {};
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (searchTerm) params.searchTerm = searchTerm;
      if (status && status !== "all") params.status = status;

      const response = await this.partApi.get(`${this.baseURL}/`, { params });
      console.log("Parts response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching parts:", error);
      throw error.response?.data || { error: "Failed to fetch parts" };
    }
  }

  // Update Part
  async updatePart(part_id, { 
    name, 
    short_description, 
    long_description, 
    price, 
    stock, 
    category, 
    image, 
    status 
  }) {
    try {
      const response = await this.partApi.put(`${this.baseURL}/${part_id}`, {
        name,
        short_description,
        long_description,
        price,
        stock,
        category,
        image,
        status
      });
      console.log("Update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating part:", error);
      throw error.response?.data || { error: "Failed to update part" };
    }
  }

  // Delete Part
  async deletePart(part_id) {
    try {
      const response = await this.partApi.delete(`${this.baseURL}/${part_id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting part:", error);
      throw error.response?.data || { error: "Failed to delete part" };
    }
  }
}
