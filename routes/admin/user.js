require("../../db/conn");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../../db/User");
const { adminProtected } = require("../../middleware/authMiddleware");

router.get("/getUser/:id", adminProtected, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json({ user, err: null, message: "User Fetched Successfully" });
  } catch (err) {
    res.json({ user: null, err: err, message: "Something Went Wrong" });
  }
});

router.get("/getUsers", adminProtected, async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users, err: null, message: "Users Fetched Successfully" });
  } catch (err) {
    res.json({ users: null, err: err, message: "Something Went Wrong" });
  }
});

router.post("/addUser", adminProtected, async (req, res) => {
  // const salt = bcrypt.genSaltSync();
  // const password = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    accessLevel: req.body.accessLevel,
    active: req.body.active,
    password: req.body.password,
  });

  const savedUser = await newUser.save();

  res.json({ savedUser });
});
router.put("/updateUser/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    // const salt = bcrypt.genSaltSync();
    // const password = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        accessLevel: req.body.accessLevel,
        active: req.body.active,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Updated user Successfully", updatedUser });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      updatedUser: null,
    });
  }
});

router.delete("/deleteUser/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted Successfully", deletedUser });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      deletedUser: null,
    });
  }
});

module.exports = router;
