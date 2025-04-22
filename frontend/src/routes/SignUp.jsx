import clsx from "clsx";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Layout = () => {
  return (
    <div className="pt-4">
      <h1 className="text-center font-bold text-3xl">Sign Up</h1>

      <Outlet />
    </div>
  );
};

const Teacher = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      const response = await fetch("http://localhost:1234/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/signin/teacher");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center mt-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-80">
        <input
          className="bg-slate-300 rounded-xl px-5 py-3"
          type="text"
          name="name"
          placeholder="Name"
        />
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
        <button className="bg-slate-300 rounded-xl px-5 py-3">Sign up</button>
      </form>
    </div>
  );
};

const Student = () => {
  return (
    <div className="mt-6">
      <h1 className="text-center text-3xl">
        Student cannot sign up. Ask your teacher for Room Code.
      </h1>
    </div>
  );
};

export default { Layout, Teacher, Student };
