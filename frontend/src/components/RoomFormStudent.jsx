import PropTypes from "prop-types";
import { useState } from "react";

const RoomFormStudent = ({ handleSubmit, handleClose }) => {
  const [roomName, setRoomName] = useState("");

  return (
    <form
      className="bg-white rounded-xl p-4 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <input
        value={roomName}
        onInput={(e) => setRoomName(e.target.value)}
        type="text"
        placeholder="Room ID"
        className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3"
      />

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white py-3 rounded-xl"
        >
          Add
        </button>
        <button
          onClick={() => handleClose(false)}
          type="button"
          className="bg-red-500 text-white py-3 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

RoomFormStudent.propTypes = {
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
};

export default RoomFormStudent;
