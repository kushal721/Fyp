const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "ramshyamharisitagitaasdfghabdlien";

const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["client", "professional", "admin"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//hash password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //called userSchema.pre method
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }

  next();
});

//token generate
//when generateAuthtoken function called in router.js token will generate from this
userSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save(); //generate token will save
    return token; //generate token return
  } catch (error) {
    res.status(422).json(error);
  }
};

//creating model
const User = new mongoose.model("users", userSchema);

module.exports = User;
