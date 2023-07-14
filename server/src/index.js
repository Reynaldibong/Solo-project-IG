const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const db = require("./models");
const routes = require("./routes");

// db.sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Kaminari no kokyu"));

app.use("/users", routes.userRoutes);
app.use("/posts", routes.postRoutes);
app.use("/comment", routes.commentRoutes);
app.use("/likes", routes.likeRoutes);

app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use("/post", express.static(`${__dirname}/public/post`));

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
