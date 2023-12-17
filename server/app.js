const express = require("express"); // importing the express
const app = express(); // created an app
const router = require("./routes/router");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/userSchema");
const nodemailer = require("nodemailer");

require("./db/conn");
const port = 8009; // run the app on port 8009

// app.get("/", (req, res)=> {
//     res.status(201).json("server created")
// });

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(router);

app.listen(8009, () => {
  console.log(`server start at port no:${port} `);
});

const keysecret = "ramshyamharisitagitaasdfghabdlien";

app.post("/reset-password", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, keysecret, { expiresIn: "1d" });

    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhattakushal1@gmail.com",
        pass: "rpwwohrrpbjcopqg",
      },
    });

    var mailOptions = {
      from: "bhattakushal1@gmail.com",
      to: "myfriend@yahoo.com",
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset-password/${user_id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});
