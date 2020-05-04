require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 8000;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.DATABASE, options)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(function () {
    console.log("ERROR CONNECTING TO DB");
  });

app.listen(port, () => console.log(`App is running at ${port}`));
