import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserById,
  getUserByEmail,
} from "../controllers/userController.js";
import bcrypt from "bcrypt";

const router = Router();

router.get("/auth", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, "whoknows", async (error, decoded) => {
      if (error) throw error;

      const user = await getUserById(decoded.id, ["email", "name"]);

      return res.status(200).json({ message: "Authorized", user });
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    try {
      const authenticated = await bcrypt.compare(password, user.password);

      if (authenticated) {
        const authToken = jwt.sign(
          { id: user.id, role: user.role },
          "whoknows"
        );
        return res
          .status(200)
          .json({ message: "User signed in successfully", authToken });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await createUser({
      ...req.body,
      role: "teacher",
      password: hashedPassword,
    });
    console.log(newUser);
    const token = jwt.sign({ id: newUser.id }, "whoknows");

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, username: newUser.username },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

export default router;
