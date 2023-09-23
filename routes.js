const express = require("express");
const contactModel = require("./models");
const app = express();
const cors = require("cors");

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // credentials: true,
};

app.use(cors(corsOptions));

app.post("/add_contact", async (request, response) => {
  const contact = new contactModel(request.body);
  console.log("es aris shemomavali kontaqti ", request.body);
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
    response.status(200).send(contacts);
    response.end();
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
