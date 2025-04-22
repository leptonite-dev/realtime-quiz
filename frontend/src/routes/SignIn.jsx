import clsx from "clsx";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { authenticate } from "../helpers/authHelper";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/signin") {
      navigate("/signin/teacher");
    }
  });

  return (
    <div className="pt-4">
      <div className="flex justify-evenly  text-white w-64 mx-auto">
        <Link
          to="teacher"
          className={clsx(
            "hover:bg-red-700 w-full p-4 text-center rounded-s-full",
            location.pathname == "/signin/teacher" ? "bg-red-700" : "bg-red-400"
          )}
        >
          Teacher
        </Link>
        <Link
          to="student"
          className={clsx(
            "hover:bg-red-700 w-full p-4 text-center rounded-e-full",
            location.pathname == "/signin/student" ? "bg-red-700" : "bg-red-400"
          )}
        >
          Student
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
      <div className="text-center">Or</div>
      <Link
        to="/signup/teacher"
        className="bg-slate-300 rounded-xl px-5 py-3 mx-auto block w-max mt-4"
      >
        Sign Up
      </Link>
    </div>
  );
};

export const Teacher = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:1234/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const resObj = await response.json();
        const { authToken } = resObj;
        Cookies.set("authToken", authToken);
        navigate("/dashboard/teacher");
      } else if (response.status === 401) {
        alert((await response.json()).message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-80">
        <input
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="bg-slate-300 rounded-xl px-5 py-3">Sign in</button>
      </form>
    </div>
  );
};

export const Student = () => {
  return (
    <div className="p-4 flex justify-center items-center">
      <form className="flex flex-col gap-4 max-w-80">
        <input
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="text"
          placeholder="Room ID"
        />
        <button className="bg-slate-300 rounded-xl px-5 py-3">Sign in</button>
      </form>
    </div>
  );
};

export const teacherLoader = async () => {
  if (await authenticate()) {
    return redirect("/dashboard/teacher");
  } else {
    return null;
  }
};

export default { Layout, Teacher, Student, teacherLoader };
