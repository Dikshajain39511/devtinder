const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./models/user");
const cors=require("cors")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)
// // get user by emailid
// app.get("/users", async (req, res) => {
//   const usersEmail = req.body.email;
//   try {
//     // const users=await User.findOne({email:usersEmail})
//     // res.send(users)
//     const users = await User.find({ email: usersEmail });
//     if (users.length === 0) {
//       res.status(404).send("Users not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Error Fetching Users" + err.message);
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findById(userId);
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Error fetching User" + err.message);
//   }
// });

// // Get all users for feed
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Error fetching Users" + err.message);
//   }
// });

// app.delete("/users", async (req, res) => {
//   const userId = req.body.id;
//   try {
//     const users = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Error deleting User" + err.message);
//   }
// });

// app.patch("/users", async (req, res) => {
//   const userId = req.body.id;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "userId",
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k),
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed ");
//     }
//     const Users = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("  User updated successfully");
//   } catch (err) {
//     res.status(400).send("Error updating User" + err.message);
//   }
// });
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening to port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
