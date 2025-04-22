import { Question } from "../models/QuestionModel.js";

export const createQuestion = async (question) => {
  try {
    return await Question.create(question);
  } catch (error) {
    throw error;
  }
};

export const getQuestionsByRoomCode = async (roomCode) => {
  try {
    return await Question.findAll({
      where: {
        roomCode,
      },
    });
  } catch (error) {
    throw error;
  }
};
