import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  getUserByEmail,
  getActiveUserByEmail,
  addNewUser,
  updateUserLoginDate,
  getUserAccessList,
} from "../../models/User/index.js";
import isValidEmail from "../../utils/validation.js";
import { encrypt, decrypt } from "../../utils/encryption.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    // Check if the user exists (this should be replaced with your user retrieval logic)
    const user = await getActiveUserByEmail(email);

    if (!user) {
      return res.status(401).json("Invalid email or password !");
    }

    // Verify the password
    const plainPassword = decrypt(password);

    const passwordMatch = await bcrypt.compare(plainPassword, user.password);
 
    if (!passwordMatch) {
      return res.status(401).json("Invalid email or password");
    }

    await updateUserLoginDate(email);

    // Generate a JWT token with user information
    const accessToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
        lastLogin: user.lastLogin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10h", // Token expiration time (adjust as needed)
      }
    );

    let accessList = await getUserAccessList(email);
    res.status(200).json({ accessToken, ...accessList });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json("Internal server error");
  }
};
export const verify = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Invalid Token." });
    }
    const { exp } = jwt.decode(accessToken); // Extract the expiration time from the token payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the Unix epoch

    if (exp < currentTime) {
      return res.status(401).json({ message: "Token has expired." });
    }

    const jwtToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await getActiveUserByEmail(jwtToken.email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    let accessList = await getUserAccessList(user.email);

    // setTimeout(() => {
    // }, 1000);
    res.status(200).json({ accessToken, ...accessList });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    // Validate input
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // // Check if the email format is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Hash the password before saving it to the database

    const plainPassword = decrypt(password);

    const hashedPassword = await bcrypt.hash(plainPassword, 12);
 
    // Save the user to the database
    await addNewUser(email, hashedPassword, first_name, last_name);

    res.status(201).json("Registration Successful");
  } catch (error) {
    console.error("Registration failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const state = async (req, res) => {
  const ee = encrypt("Working fine");

  res.json({
    message: "Working fine",
    enc: ee,
    dec: decrypt("NIEHCgBGSaGMLLFO61OJRQ=="),
  });
};
