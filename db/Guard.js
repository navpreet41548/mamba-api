const mongoose = require("mongoose");

const guardSchema = mongoose.Schema({
  guardName: String,
  guardEmail: String,
  guardContact: String,
  guardPassword: String,
  currentSite: String,
  licenses: [{ licenseName: String, expDate: String }],
  location: String,
  active: Boolean,
  request: {
    type: String,
    enum: ["accepted", "pending", "rejected"],
    default: "pending",
  },
});

const Guard = mongoose.model("Guard", guardSchema);

module.exports = Guard;
