const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    // default: 0,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
});

// const ContactSchema = new mongoose.Schema({
//   name: String,
//   phone_number: String,
//   email: String,
//   image: Buffer, // This field should store binary data for the image
// });

const Contact = mongoose.model("records", ContactSchema);

module.exports = Contact;
