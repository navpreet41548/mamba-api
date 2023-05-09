const mongoose = require("mongoose");

const guardSchema = mongoose.Schema({
  guardFirstName: String,
  guardLastName: String,
  guardEmail: String,
  guardPhoneNumber: String,
  loginPassword: String,
  currentSite: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  licenses: [
    {
      licenseName: String,
      licenseNumber: String,
      issueDate: String,
      expDate: String,
    },
  ],
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
