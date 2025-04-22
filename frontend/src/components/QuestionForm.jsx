import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoAdd, IoCheckmark, IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const QuestionForm = ({ onClose, onSuccess }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState([
    {
      isCorrect: false,
      value: "",
    },
  ]);
  const { roomCode } = useParams();

  const handleAddOption = () => {
    const newOptions = [
      ...options,
      {
        isCorrect: false,
        value: "",
      },
    ];
    setOptions(newOptions);
  };

  const handleChangeOption = (evt, idx) => {
    const newOptions = [...options];
    newOptions[idx].value = evt.target.value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (idx) => {
    const newOptions = [...options];
    newOptions.splice(idx, 1);
    setOptions(newOptions);
  };

  const handleSetCorrectOption = (idx) => {
    // const newOptions = [...options];
    // newOptions[idx].isCorrect = !options[idx].isCorrect;
    // setOptions(newOptions);

    setAnswer(idx);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        roomCode,
        question,
        answer: options[answer].value,
        options: Object.values(options).map((item) => item.value),
      };

      const res = await fetch("http://localhost:1234/question", {
        method: "POST",
        headers: {
          authorization: Cookies.get("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resObj = await res.json();

      if (res.status === 201) {
        onSuccess(resObj.question);
        onClose();
      } else {
        throw new Error(resObj.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-4 flex flex-col gap-4 w-full max-w-xl"
    >
      <input
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        type="text"
        placeholder="Question"
        className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3"
      />

      {options.map((option, idx) => (
        <div className="flex gap-3 grow" key={idx}>
          <button
            onClick={() => handleSetCorrectOption(idx)}
            className="border-4 border-slate-300 rounded-lg p-3"
            type="button"
          >
            <IoCheckmark
              className={clsx("w-6 h-6", idx !== answer && "invisible")}
            />
          </button>
          <input
            value={option.value}
            type="text"
            placeholder="Option"
            className="bg-slate-300 ring-0 outline-none rounded-xl px-2 py-3 grow"
            onChange={(evt) => handleChangeOption(evt, idx)}
          />
          <button
            onClick={() => handleRemoveOption(idx)}
            className="border-4 border-slate-300 bg-slate-300 rounded-lg p-3"
            type="button"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
      ))}

      <button
        onClick={handleAddOption}
        className="bg-slate-300 w-11 h-11 flex justify-center items-center rounded-lg self-center"
        type="button"
      >
        <IoAdd className="w-6 h-6" />
      </button>

      <button type="submit" className="bg-green-500 text-white py-3 rounded-xl">
        Save
      </button>
      <button
        onClick={() => onClose(false)}
        type="button"
        className="bg-red-500 text-white py-3 rounded-xl"
      >
        Cancel
      </button>
    </form>
  );
};

QuestionForm.propTypes = {
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default QuestionForm;
