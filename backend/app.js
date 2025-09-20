const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const createAuthRouter = require("./src/routes/authRoutes");
const createContactRouter = require("./src/routes/contactRoutes");
const createServiceRouter = require("./src/routes/serviceRoutes");

const AuthController = require("./src/controllers/authController");
const ContactController = require("./src/controllers/contactController");
const ServiceController = require("./src/controllers/serviceController");

const UserService = require("./src/services/userService");
const ContactService = require("./src/services/contactService");
const ServiceService = require("./src/services/serviceService");

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


const authController = new AuthController(userService);
const contactController = new ContactController(contactService);
const serviceController = new ServiceController(serviceService);


const authRouter = createAuthRouter(authController);
const contactRouter = createContactRouter(contactController);
const serviceRouter = createServiceRouter(serviceController);

// API routes
app.use("/auth", authRouter);
app.use("/contact", contactRouter);
app.use("/service", serviceRouter);

module.exports = app;
