import PropTypes from "prop-types";
import Cookies from "js-cookie";

const RoomForm = ({ handleClose, onSuccess }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    data.hour = parseInt(data.hour);
    data.minute = parseInt(data.minute);

    try {
      const res = await fetch("http://localhost:1234/room", {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resObj = await res.json();

      if (res.status === 201) {
        onSuccess(resObj.room);
        console.log(resObj.room);
        handleClose(false);
      } else {
        throw new Error(resObj.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="bg-white rounded-xl p-4 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Room Name"
        name="name"
        className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3"
        required
      />

      <div className="flex gap-4 ">
        <input
          className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3"
          type="number"
          name="hour"
          min={0}
          placeholder="Hour"
          required
        />
        <input
          className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3 w-full"
          type="number"
          name="minute"
          min={0}
          placeholder="Minute"
          required
        />
      </div>

      <button type="submit" className="bg-green-500 text-white py-3 rounded-xl">
        Save
      </button>
      <button
        onClick={() => handleClose(false)}
        type="button"
        className="bg-red-500 text-white py-3 rounded-xl"
      >
        Cancel
      </button>
    </form>
  );
};

RoomForm.propTypes = {
  onSuccess: PropTypes.func,
  handleClose: PropTypes.func,
};

export default RoomForm;
