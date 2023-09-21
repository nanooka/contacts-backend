const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/contacts", {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
