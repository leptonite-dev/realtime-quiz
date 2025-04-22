import { Router } from "express";
import { authorize } from "../middleware/authMiddleware.js";
import {
  createQuestion,
  getQuestionsByRoomCode,
} from "../controllers/questionController.js";

const router = Router();

router.post("/question", authorize(["teacher"]), async (req, res) => {
  try {
    const question = await createQuestion(req.body);

    return res.status(201).json({ message: "Question created", question });
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
});

router.get("/questions/:roomCode", authorize(["teacher"]), async (req, res) => {
  try {
    const questions = await getQuestionsByRoomCode(req.params.roomCode);

    return res.status(200).json({ message: "Ok", questions });
  } catch (error) {
    console.error(error);
    return res.status(501).json({ message: error.message });
  }
});

export default router;
