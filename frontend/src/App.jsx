import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import SignIn from "./routes/SignIn";
import Dashboard from "./routes/Dashboard";
import Room from "./routes/Room";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./routes/SignUp";
import Protected from "./routes/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}></Route>
      <Route path="/signin" element={<SignIn.Layout />}>
        <Route
          loader={SignIn.teacherLoader}
          path="teacher"
          index
          element={<SignIn.Teacher />}
        />
        <Route path="student" element={<SignIn.Student />} />
      </Route>
      <Route path="/signup" element={<SignUp.Layout />}>
        <Route path="teacher" index element={<SignUp.Teacher />} />
        <Route path="student" element={<SignUp.Student />} />
      </Route>

      <Route path="/" element={<Protected.Layout />} loader={Protected.loader}>
        <Route path="dashboard" element={<Dashboard.Layout />}>
          <Route path="teacher" index element={<Dashboard.Teacher />} />
          <Route path="student" element={<Dashboard.Student />} />
        </Route>
        <Route
          path="dashboard/teacher/room/:roomCode"
          element={<Room />}
        ></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
