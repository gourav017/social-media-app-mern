const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/router");
const postRouter = require("./src/routes/post");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/",userRoute);
app.use("/",postRouter);

app.listen(process.env.PORT, async () => {
    try {
      await mongoose.connect(
        process.env.MONGODB_URL
      );
      console.log("sucessfully connected to DB");
    } catch (err) {
      console.log("failed to connected DB");
    }
  });
  