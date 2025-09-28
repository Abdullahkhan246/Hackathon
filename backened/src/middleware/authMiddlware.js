// const jwt = require('jsonwebtoken');
// const verifyToken = (req,res, next)=>{
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ status: "failed", message: 'No token provided' });
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ status: "failed", message: 'Unauthorized access', error });
//     }

// }

// module.exports = verifyToken;


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure user object has the correct structure with id property
    req.user = {
      id: decoded.id || decoded._id,
      ...decoded
    };
    
    console.log('User authenticated:', req.user);
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ message: 'Token is not valid' });
  }
};
