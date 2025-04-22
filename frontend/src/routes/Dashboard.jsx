import { Link, Outlet, useLoaderData } from "react-router-dom";
import { IoCopyOutline, IoTrashOutline, IoAdd } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import RoomForm from "../components/RoomForm";
import Modal from "../components/Modal";
import RoomFormStudent from "../components/RoomFormStudent";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { authenticate } from "../helpers/authHelper";
import { ProtectedRouteContext } from "../contex";

export const Layout = () => {
  const user = useLoaderData();

  return (
    <div className="p-4">
      <Outlet user={user} />
    </div>
  );
};

export const Teacher = () => {
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [isDeletingRoom, setIsDeletingRoom] = useState({
    idx: -1,
    value: false,
  });
  const { user } = useContext(ProtectedRouteContext);
  const [rooms, setRooms] = useState([]);

  const handleDeleteRoom = async () => {
    const res = await fetch(
      `http://localhost:1234/room/${rooms[isDeletingRoom.idx].id}`,
      {
        method: "DELETE",
        headers: {
          authorization: Cookies.get("authToken"),
        },
      }
    );

    if (res.status === 204) {
      const newRooms = [...rooms];
      newRooms.splice(isDeletingRoom.idx, 1);

      setRooms(newRooms);
      setIsDeletingRoom({ idx: 0, value: false });
    } else {
      const resObj = res.json();
      console.error(resObj.message);
    }
  };

  const handleAddingRoomSuccess = (room) => {
    const newRooms = [...rooms];
    newRooms.splice(0, 0, room);

    setRooms(newRooms);
  };

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch("http://localhost:1234/rooms", {
        method: "GET",
        headers: {
          authorization: Cookies.get("authToken"),
        },
      });

      const { rooms } = await res.json();

      if (res.status === 200) setRooms(rooms);
    };

    getRooms();
  }, []);

  return (
    <div>
      <div className="border-b-2 border-slate-300 mb-6 pb-4 flex justify-end gap-2">
        <h2 className="font-bold">{user.name}</h2>
        <span>|</span>
        <button className="">Sign out</button>
      </div>

      <div className="flex flex-col gap-4">
        {rooms.map((room, idx) => (
          <div
            className="flex items-center bg-slate-300 rounded-xl p-4"
            key={room.id}
          >
            <Link to={`room/${room.code}`} className="grow">
              <h2 className="font-bold">{room.name}</h2>
              <h2>{room.code}</h2>
            </Link>
            <div className="flex gap-2">
              <button type="button">
                <IoCopyOutline className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsDeletingRoom({ idx, value: true })}
                type="button"
              >
                <IoTrashOutline className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddingRoom}>
        <RoomForm
          handleClose={setIsAddingRoom}
          onSuccess={handleAddingRoomSuccess}
        />
      </Modal>

      <Modal isOpen={isDeletingRoom.value}>
        <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
          <div className="text-center font-bold text-2xl">Are you sure?</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDeleteRoom}
              className="bg-green-400 px-6 py-4 rounded-xl"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => setIsDeletingRoom({ idx: -1, value: false })}
              className="bg-red-400 px-6 py-4 rounded-xl"
              type="button"
            >
              No
            </button>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => setIsAddingRoom(true)}
        className="fixed bottom-4 right-4 bg-slate-300 rounded-xl p-3"
      >
        <IoAdd className="w-6 h-6" />
      </button>
    </div>
  );
};

export const Student = () => {
  const [rooms, setRooms] = useState([]);
  const [isAddingRoom, setIsAddingRoom] = useState(false);

  const getRooms = async () => {
    try {
      const res = await fetch("http://localhost:1234/rooms", {
        method: "GET",
        headers: {
          authorization: Cookies.get("authToken"),
        },
      });

      const resObj = await res.json();

      if (res.status === 200) {
        setRooms(resObj.rooms);
      } else {
        throw new Error(resObj.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {rooms.map((room) => (
          <Link
            to={`room/${room.roomId}`}
            className="flex flex-col bg-slate-300 rounded-xl p-4"
            key={room.id}
          >
            <h2>{room.roomName}</h2>
            <h2>{room.roomId}</h2>
          </Link>
        ))}
      </div>

      <Modal isOpen={isAddingRoom}>
        <RoomFormStudent handleClose={setIsAddingRoom} />
      </Modal>

      <button
        onClick={() => setIsAddingRoom(true)}
        className="fixed bottom-4 right-4 bg-slate-300 rounded-xl p-3"
      >
        <IoAdd className="w-6 h-6" />
      </button>
    </div>
  );
};

const loader = async () => {
  const authenticated = await authenticate();
  if (authenticated) {
    return { user: authenticated.user };
  } else {
    return redirect("/signin/teacher");
  }
};

export default { Layout, Teacher, Student, loader };
