import api from "./api"; 

export default class ContactApi {
  constructor(baseURL = "http://localhost:5000") {
    this.contactApi = api; 
    this.baseURL = baseURL+"/contact";
  }

  async makeInquiry(inquiryData) {
    try {
      const response = await this.contactApi.post(`${this.baseURL}/`, inquiryData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Registration failed" };
    }
  }

  async getInquiries(params = {}) {
    try {
      const response = await this.contactApi.get(`${this.baseURL}/`, { 
        params, 
        withCredentials: true 
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch inquiries" };
    }
  }

  async sendReply(contactform_id, replyMessage) {
    try {
      const response = await this.contactApi.post(
        `${this.baseURL}/${contactform_id}/reply`,
        { replyMessage }, { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Inquiry reply sending failed" };
    }
  }

  async getReplyByContactFormId(contactform_id) {
    try {
      const response = await this.contactApi.get(
        `${this.baseURL}/${contactform_id}/reply`, { withCredentials: true }
      );
      console.log(`${this.baseURL}/${contactform_id}/reply`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err.response?.data || { error: "Inquiry reply getting failed" };
    }
  }

}
