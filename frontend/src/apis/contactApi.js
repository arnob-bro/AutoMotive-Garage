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


}
