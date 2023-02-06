const jwt = require("jsonwebtoken");

const Authenticaion = (req, res, next) => {
  if (!req.headers.authorization) {
    res.send("please login");
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.secretkey, function (err, decoded) {
      if (err) {
        res.send("invalid credencial");
      } else {
        next();
      }
    });
  }
};

module.exports = Authenticaion;

