const express = require("express");
// import express from "express";
const contactModel = require("./models");
const app = express();

// npm in cors
const cors = require("cors");
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
//

// mongoose.connect("mongodb://localhost:27017/contacts", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });

app.post("/add_contact", async (request, response) => {
  const contact = new contactModel(request.body);
  try {
    await contact.save();
    response.send(contact);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/contacts", async (request, response) => {
  const contacts = await contactModel.find({});
  try {
    response.send(contacts);
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
