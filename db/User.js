const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be Empty!"],
  },
  email: {
    type: String,
    required: [true, "Email can't be Empty!"],
  },
  accessLevel: {
    type: Number,
    default: 1,
  },
  login: [{ loginActivity: String }],
  active: Boolean,
  password: {
    type: String,
  },
});

// userSchema.pre("save", async function (next) {
//   const salt = bcrypt.genSaltSync();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
