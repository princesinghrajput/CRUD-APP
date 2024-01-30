const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = mongoose.Schema(
  {
    name: { type: "String"},
    email: { type: "String", unique: true},
    password: { type: "String" },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    // isAdmin: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  { timestamps: true }
);

authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

authSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
