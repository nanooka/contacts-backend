const express = require("express");
const contactModel = require("./models");
const app = express();
const cors = require("cors");

app.use(cors());

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
    response.status(200).send(contacts);
    response.end();
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
