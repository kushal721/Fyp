const mongoose = require("mongoose");

const DB = "mongodb://127.0.0.1:27017/FYP_db";
// "mongodb+srv://kushal:kushalbhatta@cluster0.9opvbul.mongodb.net/c_p_n?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });
