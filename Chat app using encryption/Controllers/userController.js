import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = "topsecret";

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = await User.create({ username: username, password: password });
    const token = jwt.sign(
      { userId: User._id, username: User.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token: token, msg: "User created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username: username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token: token }, "User logged in successfully");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const logout = async (req, res) => {
    res.json({ msg: "User logged out successfully" });
}

export default { registerUser, login, logout };
