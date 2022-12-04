import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home from './routes/home';
import PersonalInfo from './routes/personalInfo';
import Edit from './routes/edit';
import EditRoot from './routes/editRoot';
import WorkHistory from "./routes/work_history";
import Education from "./routes/education";
import Skills from "./routes/skills";
import Summary from "./routes/summary";
import Extras from "./routes/extras";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<p>404 Page not found</p>}>
        <Route index element={<Home />}/>
        <Route path="edit/" element={<Edit />}>
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
