const jwt = require("jsonwebtoken");
const User = require("../db/User");

const adminProtected = async (req, res, next) => {
  const token = req.headers.token;
  console.log(token);
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      const id = decodedToken.id;
      const admin = await User.findById(id);
      if (admin && admin.accessLevel === 0) {
        next();
      } else {
        res.status(400).json({
          message: "Admin Resources, Access Denied",
          err: "Not Admin",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Admin Resources, Access Denied",
        err: "Invalid Token",
      });
    }
  } else {
    res.status(400).json({
      message: "Admin Resources, Access Denied",
      err: "Token Not Found",
    });
  }
};

module.exports = { adminProtected };
