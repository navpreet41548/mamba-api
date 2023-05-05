require("../../db/conn");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Client = require("../../db/Client");
const { adminProtected } = require("../../middleware/authMiddleware");

router.get("/getClient/:id", adminProtected, async (req, res) => {
  try {
    const id = req.params.id;
    const client = await Client.findById(id);
    res.json({ client, err: null, message: "Client Fetched Successfully" });
  } catch (err) {
    res.json({ client: null, err: err, message: "Something Went Wrong" });
  }
});
router.get("/getClients", async (req, res) => {
  try {
    const client = await Client.find({});
    res.json({
      data: client,
      err: null,
      message: "Clients Fetched Successfully",
    });
  } catch (err) {
    res.json({ data: null, err: err, message: "Something Went Wrong" });
  }
});

router.post("/addClient", async (req, res) => {
  const salt = bcrypt.genSaltSync();
  console.log(req.body);
  const password = await bcrypt.hash(req.body.loginPassword, salt);
  req.body.loginPassword = password;
  const newClient = new Client(req.body);
  const savedClient = await newClient.save();

  res.json({
    message: "Client Created Successfully",
    data: savedClient,
    err: null,
  });
});
router.put("/updateClient/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const salt = bcrypt.genSaltSync();
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Updated Client Successfully", updatedClient });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      updatedClient: null,
    });
  }
});

router.delete("/deleteClient/:id", adminProtected, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Client Deleted Successfully", deletedClient });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong",
      err: err.message,
      deletedClient: null,
    });
  }
});

module.exports = router;
