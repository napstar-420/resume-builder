import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home from './routes/home';
import PersonalInfo, {loader as personalInfoLoader, action as personalInfoAction} from './routes/personalInfo';
import EditRoot from './routes/editRoot';
import WorkHistory, {loader as workLoader} from "./routes/work_history/workHistory";
import WorkRoot from "./routes/work_history/workRoot.jsx";
import WorkForm, {action as workAction} from "./routes/work_history/workForm";
import Education, {loader as eduLoader} from "./routes/education/education";
import EducationForm, {action as eduAction} from './routes/education/educationForm';
import EducationRoot from './routes/education/educationRoot';
import Skills, {loader as skillLoader} from "./routes/skills/skill";
import SkillForm, {action as skillAction} from "./routes/skills/skillForm";
import SkillRoot from "./routes/skills/skillRoot";
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
          <Route path="personal_info" element={<PersonalInfo />} loader={personalInfoLoader} action={personalInfoAction}/>
          <Route path="work_history/" element={<WorkHistory />} loader={workLoader}>
            <Route index element={<WorkRoot />}/>
            <Route path="/edit/work_history/:index" element={<WorkForm />} loader={workLoader} action={workAction}/>
          </Route>
          <Route path="education" element={<Education />} loader={eduLoader}>
            <Route index element={<EducationRoot />}/>
            <Route path=":index" element={<EducationForm />} loader={eduLoader} action={eduAction}/>
          </Route>
          <Route path="skills" element={<Skills />} loader={skillLoader}>
            <Route index element={<SkillRoot />}/>
            <Route path=":index" element={<SkillForm />} loader={skillLoader} action={skillAction}/>
          </Route>
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
