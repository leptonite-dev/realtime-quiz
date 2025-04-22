import { Router } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../controllers/userController.js";
import {
  createRoom,
  destroyRoom,
  getRoomByUserId,
} from "../controllers/roomController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/room", authorize(["teacher"]), async (req, res) => {
  try {
    const { name, hour, minute } = req.body;

    const room = await createRoom({
      userId: req.user.id,
      name,
      duration: hour * 3600 + minute * 60,
      code: Buffer.from(`${req.user.id}:${Date.now()}`).toString("base64"),
    });

    return res.status(201).json({ message: "Room created", room });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
});

router.get("/room/:id", authorize(["teacher"]), async (req, res) => {
  const { id } = req.params;

  try {
    const room = getRoom(id);

    if (room) {
      return res.status(200).json({ message: "Ok", room });
    } else {
      return res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: error.message });
  }
});

router.delete("/room/:id", authorize(["teacher"]), async (req, res) => {
  try {
    const { id } = req.params;

    await destroyRoom(id);

    return res.status(204).json({ message: "Room deleted" });
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: error.message });
  }
});

router.get("/rooms", authorize(["teacher", "student"]), async (req, res) => {
  try {
    const rooms = await getRoomByUserId(req.user.id);

    return res.status(200).json({ message: "Ok", rooms });
  } catch (error) {
    res.status(501).json({ message: error.message });
    console.error(error);
  }
});

export default router;
