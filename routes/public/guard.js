require("../../db/conn");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Guard = require("../../db/Guard");

router.post("/addGuard", async (req, res) => {
  const salt = bcrypt.genSaltSync();
  const password = await bcrypt.hash(req.body.guardPassword, salt);
  req.body.guardPassword = password;
  const newGuard = new Guard(req.body);
  const savedGuard = await newGuard.save();

  res.json({ savedGuard, message: "New Guard Request Added Successfully" });
});

module.exports = router;
