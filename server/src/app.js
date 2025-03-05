require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routers/auth.router");
const userRoutes = require("./routers/user.router");
const authorRoutes = require("./routers/author.router");
const quoteRoutes = require("./routers/quote.router");

const { PORT } = process.env;

const corsConfig = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(authorRoutes);
app.use(quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
