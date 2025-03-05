const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(401)
        .json({ success: false, data: { message: "Access denied." } });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, data: { message: "Access denied." } });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, data: { message: error.message } });
  }
});

const companyInfo = "Little story about the company";
router.get("/info", (req, res) => {
  res.json(companyInfo);
});

router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Выход выполнен" });
});
module.exports = router;
