const express = require("express");
const { Author } = require("../../db/models");

const router = express.Router();

router.get("/author", async (req, res) => {
  try {
    const authors = await Author.findAll();
    if (!authors.length) {
      return res.status(404).json({ error: "Нет авторов в базе" });
    }

    const randomIndex = Math.floor(Math.random() * authors.length);
    const randomAuthor = authors[randomIndex];

    res.json({
      id: randomAuthor.id, 
      name: randomAuthor.name,
    });
  } catch (error) {
    console.error("Ошибка при получении случайного автора:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
