const jwt = require("jsonwebtoken");

const generateRefreshToken = (id, role) => {
  return jwt.sign({ id,role }, process.env.JWT_R_SECRET, {
    expiresIn: "1d",
  });
};

const generateAccessToken = (id, role) => {
  console.log("accessToken is generated with id " + id);
  return jwt.sign({ id,role }, process.env.JWT_A_SECRET, {
    expiresIn: "10m",
  });
};

module.exports = { generateRefreshToken, generateAccessToken };
