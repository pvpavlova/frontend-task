const express = require("express");
const { Quote } = require("../../db/models");

const router = express.Router();

router.get("/quote", async (req, res) => {
  const { authorId } = req.query;

  if (!authorId) {
    return res.status(400).json({ error: "Не указан authorId" });
  }

  try {
    const quotes = await Quote.findAll({ where: { authorId } });

    console.log("Found quotes:", quotes); 

    if (!quotes.length) {
      return res.status(404).json({ error: "У этого автора нет цитат" });
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    res.json({
      quote: randomQuote.dataValues.quote,
    });
  } catch (error) {
    console.error("Ошибка при получении цитаты:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
module.exports = router;
