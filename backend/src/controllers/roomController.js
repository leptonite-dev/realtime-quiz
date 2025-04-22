import { Room } from "../models/RoomModel.js";

export const createRoom = async (room) => {
  try {
    return await Room.create(room);
  } catch (error) {
    throw error;
  }
};

export const getRoomByUserId = async (userId) => {
  try {
    return await Room.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (room) => {
  try {
    return await Room.update(room, {
      where: {
        id: room.id,
      },
      fields: ["duration"],
    });
  } catch (error) {
    throw error;
  }
};

export const destroyRoom = async (id) => {
  try {
    const room = await Room.findOne({
      where: {
        id,
      },
    });

    return await room.destroy();
  } catch (error) {
    throw error;
  }
};
