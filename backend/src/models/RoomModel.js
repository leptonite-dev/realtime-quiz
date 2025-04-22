import { DataTypes, where } from "sequelize";
import { db } from "../db/db.js";
import { Question } from "./QuestionModel.js";

export const Room = db.define(
  "room",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 3600,
    },
  },
  {
    hooks: {
      afterDestroy: async (room) => {
        await Question.destroy({
          where: {
            roomCode: room.code,
          },
        });
      },
    },
  }
);
