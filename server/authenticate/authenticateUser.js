import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: 'Access denied, token missing',
      success: false,
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid token',
      success: false,
    });
  }
}
