// import mongoose from "mongoose";
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
  },
  // img_url: {
  //   type: Buffer,
  //   contentType: String,
  // },
});

const Contact = mongoose.model("records", ContactSchema);

module.exports = Contact;
