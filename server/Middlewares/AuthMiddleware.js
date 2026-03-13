// const User = require("../Models/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res) => {
//   const token = req.cookies.token
//   console.log(token)
//   if (!token) {
//     return res.json({ status: false })
//   }
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//      return res.json({ status: false })
//     } else {
//       console.log(data.id)
//       const user = await User.findById(data.id)
//       if (user) return res.json({ status: true, user: user.username })
//       else return res.json({ status: false })
//     }

//   })
// }




const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {

  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  try {

    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(data.id);

    if (!user) {
      return res.json({ status: false });
    }

    return res.json({
      status: true,
      user: user.username
    });

  } catch (error) {

    return res.json({ status: false });

  }
};