const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();

app.use(express.json());
//
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://0.0.0.0:27017/contacts", {
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

let port = 3005;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
