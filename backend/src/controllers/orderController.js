const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "autom66f6a5da4f0b0";
const store_passwd = "autom66f6a5da4f0b0@ssl";
const is_live = false;

class OrderController {
    constructor(orderService) {
      this.orderService = orderService;
  
      this.createOrder = this.createOrder.bind(this);
      this.getOrders = this.getOrders.bind(this);
      this.updateOrderStatus = this.updateOrderStatus.bind(this);
      this.paymentSuccess = this.paymentSuccess.bind(this);
    }
  
    async createOrder(req, res) {
      try {
        const {
          customer_id,
          delivery_address,
          items,
          total_amount,
          tax,
          net_amount,
          payment_status,
          payment_method
        } = req.body;
  
        if (
          !customer_id ||
          !delivery_address ||
          !items ||
          !total_amount ||
          !net_amount ||
          !payment_status ||
          !payment_method
        ) {
          return res.status(400).json({ error: "All fields are required" });
        }
  
        const order = await this.orderService.createOrder({
          customer_id,
          delivery_address,
          items,
          total_amount,
          tax,
          net_amount,
          payment_status,
          payment_method
        });

        if(order.payment_method === "ssl"){
              // Payment gateway integration
              const data = {
                  total_amount: order.totalPrice,
                  currency: "BDT",
                  tran_id: order.order_id.toString(),
                  success_url: `http://localhost:5000/order/payment/success/${order.order_id.toString()}`,
                  fail_url: "http://localhost:5000/fail",
                  cancel_url: "http://localhost:5000/cancel",
                  ipn_url: "http://localhost:5000/ipn",
                  shipping_method: "Courier",
                  product_name: "janina",
                  product_category: "janina",
                  product_profile: "general",
                  cus_name: "abc",
                  cus_email: "meow@gmail.com",
                  cus_add1: "Dhaka",
                  cus_add2: "Dhaka",
                  cus_city: "Dhaka",
                  cus_state: "Dhaka",
                  cus_postcode: "1000",
                  cus_country: "Bangladesh",
                  cus_phone: "01711111111",
                  cus_fax: "01711111111",
                  ship_name: "Customer Name",
                  ship_add1: "Dhaka",
                  ship_add2: "Dhaka",
                  ship_city: "Dhaka",
                  ship_state: "Dhaka",
                  ship_postcode: 1000,
                  ship_country: "Bangladesh",
              };
              console.log(data);
              const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
              sslcz.init(data).then((apiResponse) => {
                // Extract the GatewayPageURL
                const GatewayPageURL = apiResponse.GatewayPageURL;
                console.log("Redirecting to: ", GatewayPageURL);
          
                // Respond with the payment URL
                res.status(201).json({ url: GatewayPageURL, order });
              });
        }else{
          res.status(201).json({ success: true, order });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Internal server error" });
      }
    }
  
    async getOrders(req, res) {
      try {
        const { page, limit, searchTerm, status } = req.query;
        const orders = await this.orderService.getOrders(
          parseInt(page) || 1,
          parseInt(limit) || 10,
          searchTerm || "",
          status || ""
        );
        res.json(orders);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

  
    async updateOrderStatus(req, res) {
      try {
        const { order_id } = req.params;
        const { status } = req.body;
        if (!order_id || !status)
          return res.status(400).json({ error: "Order ID and status required" });
  
        const order = await this.orderService.updateOrderStatus(order_id, status);
        if (!order) return res.status(404).json({ error: "Order not found" });
  
        res.json({ success: true, order });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }

    async paymentSuccess(req, res) {
      try {
        const { order_id } = req.params;
        
  
        const order = await this.orderService.updatePaymentStatus(order_id, "paid");
        if (!order) return res.status(404).json({ error: "Order not found" });
  
        res.redirect(`http://localhost:5173/order/payment/success/${order_id}`);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
  }
  
  module.exports = OrderController;
  