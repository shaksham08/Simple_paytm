const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded?.userId;

    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  authMiddleware,
};
