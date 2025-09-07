const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../config/generateToken");



class AuthController {
    constructor(userService) {
      this.userService = userService;
  
      // Bind methods so 'this' works in routes
      this.createUser = this.createUser.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.refresh = this.refresh.bind(this);
      this.getProfile = this.getProfile.bind(this);
      this.updateProfile = this.updateProfile.bind(this);
    }
  
    async createUser(req, res) {
      try {
        const {name,email, password} = req.body;
        const user_id = uuidv4();
        
        // check if all fields are provided
        if (!name || !email || !password) {
          return res.status(400).json({error: "All fields are required"});
        }
        
        // check if email is a valid email
        if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.+-]{0,63}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email)) {
          return res.status(400).json({ error: "Invalid email" });
        }
        
        // check if name is a valid name
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
          return res.status(400).json({ error: "Invalid name" });
        }
        
        // check if password is at least 6 characters
        if (password.length < 6) {
          return res.status(400).json({error: "Password must be at least 6 characters"});
        }
        // check if password is a valid password
        if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
          return res.status(400).json({error: "Invalid password"});
        }
        
        
        
        // check if user already exists
        const userExists = await this.userService.getUserByEmail(email);
        if (userExists) {
          return res.status(400).json({error: "User already exists"});
        } 
        
        

        
        const userCreation = await this.userService.createUser(user_id, name,email, password);
        res.status(201).json({success: true, message: "User created successfully", userCreation});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async login(req, res) {
      try {

          const { email, password } = req.body;
          // check if email is a valid email
        if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.+-]{0,63}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email)) {
          return res.status(400).json({ error: "Invalid email" });
        }
          // check if password is at least 6 characters
          if (password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 characters"});
          }
          // check if password is a valid password
          if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
            return res.status(400).json({error: "Invalid password"});
          }
          // check if email and password are provided
          if (!email || !password) {
            return res.status(400).json({error: "Email and password are required"});
          }
          // check if user exists
          const user = await this.userService.getUserByEmail(email);
          if (!user) {
            return res.status(400).json({error: "User not found"});
          }
          // check if password is correct
          const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
          if (!isPasswordCorrect) {
            return res.status(400).json({error: "Invalid password"});
          }
          // generate token
          const accessToken = generateAccessToken(user.user_id,"customer");
          const refreshToken = generateRefreshToken(user.user_id,"customer");
          console.log(accessToken);
          console.log(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // set true in production (HTTPS)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          res.status(200).json({
            success: true, 
            message: "Login successful", 
            accessToken, 
            user: {
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              role:user.role
            }});
          
        
      } catch (err) {
        console.error("Error logging in:", err);
        res.status(400).json({ error: err.message, message: err.message });
      }
    }
    

    async logout(req, res) {
      try {
        res.clearCookie("refreshToken");
        res.status(200).json({success: true, message: "Logged out successfully"});
      } catch (err) {
        console.error("Error logging out:", err);
        res.status(500).json({ error: err.message });
      }
    }
  
    async refresh(req, res) {
      try {
        const token = req.cookies.refreshToken;
        if (!token) {
          return res.status(401).json({error: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_R_SECRET);
        const user_id = decoded.id;
        const user = await this.userService.getUserById(user_id);
        if (!user) {
          return res.status(401).json({error: "Unauthorized"});
        }
        const accessToken = generateAccessToken(user.user_id);
        res.status(200).json({success: true, message: "Token refreshed", accessToken});
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Refresh token expired" });
        }
        console.error("Error refreshing:", err);
        res.status(500).json({ error: "Invalid refresh token" });
      }
    }

    async getProfile(req, res) {
      try {
        const user_id = req.user.user_id;
        const user = await this.userService.getCustomerProfileById(user_id);
        res.status(200).json({success: true, message: "Welcome!", user});
      } catch (err) {
        console.error("Error getting profile:", err);
        res.status(500).json({ error: "Invalid request for fetching profile"});
      }
    }

    async updateProfile(req, res) {
      try {
        const user_id = req.user.user_id;
        const role = req.user.role;
        const {email,phone,birthday,anniversary,address}= req.body;
        const user = await this.userService.updateProfile(user_id,role,email,phone,birthday,anniversary,address);
        res.status(200).json({success: true, message: "Profile has been updated", user});
      } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Invalid request for updating profile"});
      }
    }
    
      
}
  
  module.exports = AuthController;
  