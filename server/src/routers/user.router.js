const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token)
    return res
      .status(403)
      .json({ success: false, data: { message: "Access denied." } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch {
    return res
      .status(403)
      .json({ success: false, data: { message: "Invalid token." } });
  }
};

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["fullName", "email"],
    });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: { message: error.message } });
  }
});

module.exports = router;
