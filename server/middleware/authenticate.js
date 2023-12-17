// const jwt = require("jsonwebtoken");
// const User = require("../models/userSchema");
// const keysecret = "ramshyamharisitagitaasdfghabdlien";

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization; //validate token passed under headers.authorization(token) from profile.js
//     // console.log(token);
//     const verifytoken = jwt.verify(token, keysecret); //verify token which returns the id set inside the payload
//     // console.log(verifytoken);
//     const rootUser = await User.findOne({ _id: verifytoken._id }); //with the help of that id we get user
//     // console.log(rootUser);

//     //if user not get throw error
//     if (!rootUser) {
//       throw new Error("user not found");
//     }
//     //else set those value on req.
//     req.token = token;
//     req.rootUser = rootUser;
//     req.userId = rootUser._id;

//     next();

//     //if user not verified
//   } catch (error) {
//     res
//       .status(401)
//       .json({ status: 401, message: "Unauthorized no token provided" });
//   }
// };

// module.exports = authenticate;


const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const keysecret = "ramshyamharisitagitaasdfghabdlien";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("No token provided");
    }

    const verifytoken = jwt.verify(token, keysecret);
    const rootUser = await User.findOne({ _id: verifytoken._id });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: error.message });
  }
};

module.exports = authenticate;

