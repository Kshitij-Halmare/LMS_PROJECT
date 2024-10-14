import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
    console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Access denied, token missing",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Check if JWT_SECRET is correct
    req.user = decoded; // Attach the decoded token information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
}
