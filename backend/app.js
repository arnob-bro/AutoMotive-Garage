const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const createAuthRouter = require("./src/routes/authRoutes");
const createContactRouter = require("./src/routes/contactRoutes");

const AuthController = require("./src/controllers/authController");
const ContactController = require("./src/controllers/contactController");

const UserService = require("./src/services/userService");
const ContactService = require("./src/services/contactService");

const db = require("./src/config/supabaseClient");

// Controllers
// const { getUsersByLetter, addUser } = require("./controllers/controller");

const app = express();

// Middlewares
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


const authController = new AuthController(userService);
const contactController = new ContactController(contactService);


const authRouter = createAuthRouter(authController);
const contactRouter = createContactRouter(contactController);

// API routes
app.use("/auth", authRouter);
app.use("/contact", contactRouter);

module.exports = app;
