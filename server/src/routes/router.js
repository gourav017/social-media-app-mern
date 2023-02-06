const express = require("express");
const userRoute = express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Authenticaion = require("../middleware/Authentication");
var smtpTransport = require("nodemailer-smtp-transport");

// email config

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })
);
// for user registration

userRoute.post("/Signup", async (req, res) => {
  const { first_name, email, password } = req.body;

  bcrypt.hash(password, 6, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("something went wrong! please try agian");
    } else {
      let user = await userdb.create({ first_name, email, password: hash });
      res.send({ msg: "Signup sucessfull", user });
    }
  });
});

// user Login

userRoute.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  let user = await userdb.findOne({ email });
  let hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    // result == false
    if (result) {
      var token = jwt.sign(
        { email: email, userId: user._id },
        process.env.SECRET_KEY
      );
      res.send({ msg: "login sucessfull", token: token, userId: user._id });
    } else {
      res.send("invalid credencial");
    }
  });
});

// user valid
userRoute.get("/validuser", Authenticaion, async (req, res) => {
  try {
    let userId = req.params.userId;
    const ValidUserOne = await userdb.findOne({ _id: userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// send email Link For reset Password
userRoute.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await userdb.findOne({ email: email });
    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, process.env.SECRET_KEY, {
      expiresIn: "120s",
    });

    const setusertoken = await userdb.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For password Reset",
        text: `http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent sucessfully" });
        }
      });
      console.log("lllll");
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

// verify user for forgot password time
userRoute.get("/forgotpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await userdb.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, keysecret);

    console.log(verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// change password

userRoute.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await userdb.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 6);

      const setnewuserpass = await userdb.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});


module.exports = userRoute;
