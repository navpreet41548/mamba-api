require("../../db/conn");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Guard = require("../../db/Guard");
const { adminProtected } = require("../../middleware/authMiddleware");

router.get("/getGuard/:id", adminProtected, async (req, res) => {
  try {
    const id = req.params.id;
    const guard = await Guard.findById(id);
    res.json({ guard, err: null, message: "Guard Fetched Successfully" });
  } catch (err) {
    res.json({
      guard: null,
      err: err.message,
      message: "Something Went Wrong",
    });
  }
});
router.get("/getGuards", adminProtected, async (req, res) => {
  try {
    const guard = await Guard.find({});
    res.json({ guard, err: null, message: "Guards Fetched Successfully" });
  } catch (err) {
    res.json({ guard: null, err: err, message: "Something Went Wrong" });
  }
});

router.put("/updateGuard/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const salt = bcrypt.genSaltSync();
    const password = await bcrypt.hash(req.body.guardPassword, salt);
    req.body.guardPassword = password;
    const updatedGuard = await Guard.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Updated Guard Successfully", updatedGuard });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      updatedGuard: null,
    });
  }
});

router.delete("/deleteGuard/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedGuard = await Guard.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Guard Deleted Successfully", deletedGuard });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      deletedGuard: null,
    });
  }
});
router.put("/updateGuardRequest/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedGuard = await Guard.findByIdAndUpdate(
      id,
      { request: req.body.request },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Updated Guard Successfully", updatedGuard });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      updatedGuard: null,
    });
  }
});

module.exports = router;
