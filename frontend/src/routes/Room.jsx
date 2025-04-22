import { useEffect, useState } from "react";
import {
  IoAdd,
  IoTrashOutline,
  IoPlayOutline,
  IoPerson,
  IoStopOutline,
} from "react-icons/io5";
import Modal from "../components/Modal";
import QuestionForm from "../components/QuestionForm";
import EditDurationForm from "../components/EditDurationForm";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Room = () => {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isEditDuration, setIsEditDuration] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [room, setRoom] = useState({});
  const { roomCode } = useParams();

  const getQuestions = async () => {
    try {
      const res = await fetch(`http://localhost:1234/questions/${roomCode}`, {
        method: "GET",
        headers: {
          authorization: Cookies.get("authToken"),
        },
      });

      const resObj = await res.json();

      if (res.status === 200) {
        setQuestions(resObj.questions);
      } else {
        throw new Error(resObj.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoom = async () => {
    try {
      const res = await fetch(`http://localhost:1234/room/${roomCode}`);
      const resObj = await res.json();

      if (res.status === 200) {
        setRoom(resObj.room);
      } else {
        throw new Error(resObj.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddQuestionSuccess = (question) => {
    const newQuestions = [...questions];
    newQuestions.splice(0, 0, question);

    setQuestions(newQuestions);
  };

  useEffect(() => {
    getRoom();
    getQuestions();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <button className="bg-green-300 px-5 py-3 rounded-lg" type="button">
            <IoPlayOutline className="w-6 h-6 text-white" />
          </button>
          <button
            disabled
            className="bg-green-300 px-5 py-3 rounded-lg disabled:bg-slate-300"
            type="button"
          >
            <IoStopOutline className="w-6 h-6 text-white" />
          </button>
        </div>
        <div
          onClick={() => setIsEditDuration(true)}
          className="font-bold font-mono text-3xl cursor-pointer"
        >
          00 : 00 : 00
        </div>
        <div>
          <div className="flex gap-2 bg-slate-300 rounded-lg px-3 py-2">
            <IoPerson className="w-6 h-6 text-white" />
            <span className="font-bold text-lg">7</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-col mt-8">
        {questions.map((question) => (
          <div
            className="bg-slate-300 rounded-xl p-4 flex items-center"
            key={question.id}
          >
            <div className="grow">{question.question}</div>
            <button
              className="hover:bg-gray-200 rounded-md p-2 transition-colors duration-300"
              type="button"
            >
              <IoTrashOutline className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isEditDuration}>
        <EditDurationForm handleClose={() => setIsEditDuration(false)} />
      </Modal>

      <Modal isOpen={isAddingQuestion}>
        <QuestionForm
          onSuccess={handleAddQuestionSuccess}
          onClose={() => setIsAddingQuestion(false)}
        />
      </Modal>

      <button
        onClick={() => setIsAddingQuestion(true)}
        className="fixed bottom-4 right-4 bg-slate-300 rounded-xl p-3"
      >
        <IoAdd className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Room;
