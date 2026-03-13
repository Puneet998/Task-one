const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const User=require("./Models/UserModel");

const URI = process.env.MONGO_URL;
const PORT = process.env.PORT;

// Database connect
main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(URI);
}

app.use(
  cors({
    origin: ["http://localhost:5174"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());


app.get("/delete", async(req,res)=>{
  await User.deleteMany({});
  res.send("delete User all")
})
// Routes
app.use("/", authRoute);

// Server start (sab middleware ke baad)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
