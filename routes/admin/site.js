require("../../db/conn");
const router = require("express").Router();
const Site = require("../../db/Site");
const { adminProtected } = require("../../middleware/authMiddleware");

router.get("/getSite/:id", adminProtected, async (req, res) => {
  try {
    const id = req.params.id;
    const site = await Site.findOne({ _id: id })
      .populate("guards")
      .populate("client");
    console.log(site);
    res.json({
      data: site,
      err: null,
      message: "Site Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({ data: null, err: err.message, message: "Something Went Wrong" });
  }
});
router.get("/getSites", async (req, res) => {
  try {
    const site = await Site.find().populate("client").populate("guards");
    res.json({
      data: site,
      err: null,
      message: "Sites Fetched Successfully",
    });
  } catch (err) {
    res.json({ data: null, err: err.message, message: "Something Went Wrong" });
  }
});

router.post("/addSite", async (req, res) => {
  // const salt = bcrypt.genSaltSync();
  // const password = await bcrypt.hash(req.body.loginPassword, salt);
  // req.body.loginPassword = password;
  const newSite = new Site(req.body);
  console.log(req.body);
  const savedSite = await newSite.save();

  res.json({
    message: "Site Created Successfully",
    data: savedSite,
    err: null,
  });
});
router.put("/updateSite/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    // const salt = bcrypt.genSaltSync();
    // const password = await bcrypt.hash(req.body.password, salt);
    // req.body.password = password;
    const updateSite = await Site.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      data: updateSite,
      message: "Updated Site Successfully",
      err: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      data: null,
    });
  }
});

router.delete("/deleteSite/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSite = await Site.findByIdAndDelete(id);
    res.status(200).json({
      message: "Site Deleted Successfully",
      data: deletedSite,
      err: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      deletedClient: null,
    });
  }
});

module.exports = router;
