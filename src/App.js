import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home from './routes/home';
import PersonalInfo from './routes/personalInfo';
import EditRoot from './routes/editRoot';
import WorkHistory from "./routes/work_history";
import Education from "./routes/education";
import Skills from "./routes/skills";
import Summary from "./routes/summary";
import Extras from "./routes/extras";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Root from "./routes/root";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<p>404 Page not found</p>}>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="edit/">
          <Route index element={<EditRoot />}/>
          <Route path="personal_info" element={<PersonalInfo />}/>
          <Route path="work_history" element={<WorkHistory />}/>
          <Route path="education" element={<Education />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="summary" element={<Summary />}/>
          <Route path="extras" element={<Extras />}/>
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
