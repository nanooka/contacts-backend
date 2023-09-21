const express = require("express");
// import express from "express";
const contactModel = require("./models");
const app = express();

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
