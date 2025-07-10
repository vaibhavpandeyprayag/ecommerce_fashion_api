const express = require("express");
const cors = require("cors");
const pool = require("./src/db");
const app = express();
const router = require("./src/routers");
app.use(express.json());

app.use(cors(["*"]));
app.use("/api", router);

app.listen("5000", "localhost", () => {
  console.log("Server is running on port 5000");
});
