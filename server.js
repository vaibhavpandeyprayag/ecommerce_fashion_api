const express = require("express");
const cors = require("cors");
const pool = require("./src/db");
const app = express();
const router = require("./src/routers");
app.use(express.json());

app.use(cors(["*"]));
app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Congratulations! Server is running");
});
