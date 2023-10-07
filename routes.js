const express = require("express");
const contactModel = require("./models");
const app = express();
const cors = require("cors");
//
const multer = require("multer");
const path = require("path");
//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);

    // cb(null, file.originalname);
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: 1024 * 1024 * 2,
});
module.exports = upload;

const corsOptions = {
  // origin: "http://localhost:3000",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // credentials: true,
};

app.use(cors(corsOptions));

app.post("/add_contact", upload.single("image"), (request, response) => {
  // const contact = new contactModel(request.body);
  // console.log("es aris shemomavali kontaqti ", request.body);
  // console.log(request.file);
  //
  // const contact = new contactModel({
  //   ...request.body,
  //   image: request.file.buffer,
  // });
  //
  const contact = new contactModel({
    name: request.body.name,
    phone_number: request.body.phone_number,
    email: request.body.email,
    image: request.file.path,
  });
  console.log(contact);
  // if (request.file) {
  //   contact.image = request.file.path;
  // }
  //
  try {
    contact.save();
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
