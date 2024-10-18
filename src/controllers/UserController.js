import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function createUser(req, res) {
  const user = req.body;

  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, 10);

  user.password = passwordHash;

  const newUser = new User(user);
  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json({
        message: "User created successfully",
        user: savedUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "User creation failed",
        error: err.message,
      });
    });
}

export function loginUser(req, res) {
  const login = req.body;

  User.findOne({ email: login.email }).then((user) => {
    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
    } else {
      const isPasswordValid = bcrypt.compareSync(login.password, user.password);

      if (!isPasswordValid) {
        res.status(403).json({
          message: "Incorrect password",
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        res.json({
          message: "User found",
          user: user,
          token: token,
        });
      }
    }
  });
}
