const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const createAuthRouter = require("./src/routes/authRoutes");
const createContactRouter = require("./src/routes/contactRoutes");
const createServiceRouter = require("./src/routes/serviceRoutes");
const createPartRouter = require("./src/routes/partRoutes");
const createBookingRouter = require("./src/routes/bookingRoutes");
const createOrderRouter = require("./src/routes/orderRoutes");

const AuthController = require("./src/controllers/authController");
const ContactController = require("./src/controllers/contactController");
const ServiceController = require("./src/controllers/serviceController");
const PartController = require("./src/controllers/partController");
const BookingController = require("./src/controllers/bookingController");
const OrderController = require("./src/controllers/orderController");

const UserService = require("./src/services/userService");
const ContactService = require("./src/services/contactService");
const ServiceService = require("./src/services/serviceService");
const PartService = require("./src/services/partService");
const BookingService = require("./src/services/bookingService");
const OrderService = require("./src/services/orderService");

const db = require("./src/config/supabaseClient");


const app = express();


// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

//Dependency injection
const userService = new UserService(db);
const contactService = new ContactService(db);
const serviceService = new ServiceService(db);
const partService = new PartService(db);
const bookingService = new BookingService(db);
const orderService = new OrderService(db);


const authController = new AuthController(userService);
const contactController = new ContactController(contactService);
const serviceController = new ServiceController(serviceService);
const partController = new PartController(partService);
const bookingController = new BookingController(bookingService);
const orderController = new OrderController(orderService);


const authRouter = createAuthRouter(authController);
const contactRouter = createContactRouter(contactController);
const serviceRouter = createServiceRouter(serviceController);
const partRouter = createPartRouter(partController);
const bookingRouter = createBookingRouter(bookingController);
const orderRouter = createOrderRouter(orderController);

// API routes
app.use("/auth", authRouter);
app.use("/contact", contactRouter);
app.use("/service", serviceRouter);
app.use("/part", partRouter);
app.use("/booking", bookingRouter);
app.use("/order", orderRouter);


module.exports = app;
