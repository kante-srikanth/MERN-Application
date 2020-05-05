//import statements
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const app = express();

//port declaration
const port = process.env.PORT || 8000;

//middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/api", authRoute);

//DB config
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

//DB Connection
mongoose
  .connect(process.env.DATABASE, options)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(function () {
    console.log("ERROR CONNECTING TO DB");
  });

//Server initialization
app.listen(port, () => console.log(`App is running at ${port}`));
