const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Check if token exists and starts with "Bearer"
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Extract the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = await User.findById(decoded.id).select("-password"); // Attach user to the request
      next(); // Proceed to the next middleware
    } else {
      return res.status(401).json({ message: "Not authorized, token missing or invalid" });
    }
  } catch (error) {
    console.error("Error in protect middleware:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = {protect};
