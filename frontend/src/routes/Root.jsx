import { Link } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Sign In</h1>

      <div className="flex flex-col gap-2 mt-6">
        <Link
          className="bg-slate-300 rounded-xl px-5 py-3"
          to="/signin/teacher"
        >
          Teacher
        </Link>
        <Link
          className="bg-slate-300 rounded-xl px-5 py-3"
          to="/signin/student"
        >
          Student
        </Link>
      </div>
    </div>
  );
}

export default Root;
