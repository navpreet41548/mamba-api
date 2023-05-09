const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  siteName: String,
  siteAddress: String,
  siteZipCode: String,
  siteInstruction: String,
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  guards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guard" }],
  active: Boolean,
});

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
