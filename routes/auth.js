require("../db/conn");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../db/User");
const jwt = require("jsonwebtoken");

//! Generating token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        // console.log(user)
        const token = createToken(user._id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({
          message: "Logged In successfully",
          token: token,
          user: user,
          err: null,
        });
      } else {
        res.status(400).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(400).json({ message: "Incorrect Username" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/verifyAdmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await User.findOne({ _id: id });
    if (admin) {
      if (admin.accessLevel === 1) {
        res.status(200).json({ message: "Admin Verified", err: null });
      } else {
        res.status(400).json({ message: "Not Admin" });
      }
    } else {
      res.status(400).json({ message: "Admin Not Found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Admin Not Found", err: err.message });
  }
});

module.exports = router;
