import PropTypes from "prop-types";

const EditDurationForm = ({ handleClose }) => {
  return (
    <form className="bg-white rounded-xl p-4 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <input
          placeholder="Hours"
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="number"
        />{" "}
        :{" "}
        <input
          placeholder="Minutes"
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="number"
        />
      </div>

      <button type="submit" className="bg-green-500 text-white py-3 rounded-xl">
        Save
      </button>
      <button
        onClick={handleClose}
        type="button"
        className="bg-red-500 text-white py-3 rounded-xl"
      >
        Cancel
      </button>
    </form>
  );
};

EditDurationForm.propTypes = {
  handleClose: PropTypes.func,
};

export default EditDurationForm;
