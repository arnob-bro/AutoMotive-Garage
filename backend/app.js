const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const createAuthRouter = require("./src/routes/authRoutes");

const AuthController = require("./src/controllers/authController");

const UserService = require("./src/services/userService");

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


const authController = new AuthController(userService);


const authRouter = createAuthRouter(authController);

// API routes
app.use("/auth", authRouter);

module.exports = app;
