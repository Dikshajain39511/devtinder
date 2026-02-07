const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // create a new instance of User model with data from request body
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error Saving the User" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credential!");
    }
    const isPasswordHash = await bcrypt.compare(password, user.password);
    if (!isPasswordHash) {
      throw new Error("Invalid credential!");
    } else {
      res.send("User Logged in successfully");
    }
  } catch (err) {
    res.status(400).send("Error logging in the user" + err.message);
  }
});

// get user by emailid
app.get("/users", async (req, res) => {
  const usersEmail = req.body.email;
  try {
    // const users=await User.findOne({email:usersEmail})
    // res.send(users)
    const users = await User.find({ email: usersEmail });
    if (users.length === 0) {
      res.status(404).send("Users not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error Fetching Users" + err.message);
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(400).send("Error fetching User" + err.message);
  }
});

// Get all users for feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching Users" + err.message);
  }
});

app.delete("/users", async (req, res) => {
  const userId = req.body.id;
  try {
    const users = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting User" + err.message);
  }
});

app.patch("/users", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed ");
    }
    const Users = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("  User updated successfully");
  } catch (err) {
    res.status(400).send("Error updating User" + err.message);
  }
});
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening to port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
