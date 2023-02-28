import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    //user existence
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    //password validation

    const passwordValidation = await bcrypt.compare(password, user.password);

    if (!passwordValidation) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //generating Jwt token
    const token = Jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 12); //  we set the saltRounds value. The higher the saltRounds value, the more time the hashing algorithm takes. You want to select a number that is high enough to prevent attacks.

    const result = await userModel.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = Jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
