const express = require("express");
var cors = require("cors");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const connectDB = require("./config/dbConnection");
connectDB();

const blog = require("./routers/blog");
app.use("/blog", blog);

const user = require("./routers/user");
app.use("/user", user);

const auth = require("./routers/auth");
app.use("/api/auth", auth);

// const { sendEmailTesting } = require("./controllers/authController");
// app.post("/email_testing", sendEmailTesting);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
