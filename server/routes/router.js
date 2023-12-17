const express = require("express");
const router = new express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { trusted } = require("mongoose");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const authenticate = require("../middleware/authenticate");

// Function to generate a reset token
function generateResetToken() {
  // Generate a random 32-byte token using the crypto library
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

// // for user registration

// router.post("/register", async (req, res) => {
//   //when user request for register from frontend

//   const { uname, email, password, cpassword } = req.body; //we get that data on req.body

//   //data validation
//   if (!uname || !email || !password || !cpassword) {
//     res.status(422).json({ error: "fill all the details" });
//   }

//   try {
//     const preuser = await User.findOne({ email: email }); //checking existing email

//     if (preuser) {
//       res.status(422).json({ error: "This Email Already Exist" });
//     } else if (password !== cpassword) {
//       res
//         .status(422)
//         .json({ error: "Password and confirm password did not match" });
//     } else {
//       const finalUser = new User({
//         uname,
//         email,
//         password,
//         cpassword,
//       });
//       // here password hasing
//       const storeData = await finalUser.save();
//       res.status(201).json({ status: 201, storeData });

//       //   console.log(storeData);
//     }
//   } catch (error) {
//     res.status(422).json(error);
//     console.log("catch block error");
//   }
// });

// for user registration
router.post("/register", async (req, res) => {
  // when the user requests to register from the frontend
  const { uname, email, password, cpassword, role } = req.body; // we get that data on req.body

  // data validation
  if (!uname || !email || !password || !cpassword || !role) {
    res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const preuser = await User.findOne({ email: email }); // checking existing email

    if (preuser) {
      res.status(422).json({ error: "This Email Already Exists" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password and confirm password did not match" });
    } else {
      const finalUser = new User({
        uname,
        email,
        password,
        cpassword,
        role, // include the role in the user object
      });

      // here password hashing
      const storeData = await finalUser.save();
      res.status(201).json({ status: 201, storeData });

      // console.log(storeData);
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("Catch block error");
  }
});


//user login api

router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body; //we get that data on req.body

  //data validation
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    // if data is validate it will return value on userValid
    const userValid = await User.findOne({ email: email });

    //comparing data on userValid and password enter by user
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        //token generate
        const token = await userValid.generateAuthtoken();
        //  console.log("token:",token);

        //cookie generate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
        // console.log("done");
      }
    }
  } catch (error) {}
});

//user valid
//when we call validuser api it will go to authenticate function in authenticate.js
//
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const ValidUserOne = await User.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne }); //sending response to frontend
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

//user logout

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });
    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();
    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

module.exports = router;
