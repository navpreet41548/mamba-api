const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientFirstName: {
    type: String,
  },
  clientLastName: {
    type: String,
  },
  clientEmail: {
    type: String,
  },
  primaryBusinessName: {
    type: String,
    // required: [true, "Business Name can't be Empty!"],
  },
  primaryPhoneNumber: {
    type: String,
  },
  primaryBuildingName: {
    type: String,
  },
  primaryStreetAddress: {
    type: String,
  },
  primaryCity: {
    type: String,
  },
  primaryProvince: {
    type: String,
  },
  primaryZipCode: {
    type: String,
  },
  primaryCountry: {
    type: String,
  },

  billingFirstName: {
    type: String,
  },
  billingLastName: {
    type: String,
  },
  billingEmail: {
    type: String,
  },
  billingBusinessName: {
    type: String,
    // required: [true, "Business Name can't be Empty!"],
  },

  billingPhoneNumber: {
    type: String,
  },
  billingBuildingName: {
    type: String,
  },
  billingStreetAddress: {
    type: String,
  },
  billingCity: {
    type: String,
  },
  billingProvince: {
    type: String,
  },
  billingZipCode: {
    type: String,
  },
  billingCountry: {
    type: String,
  },
  contactFirstName: {
    type: String,
  },
  contactLastName: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  contactPhoneNumber: {
    type: String,
  },

  portalAccess: {
    type: Boolean,
    default: true,
  },
  loginEmail: String,
  loginPassword: String,
  sites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Site" }],
  accessLevel: {
    type: Number,
    default: -1,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
