import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home from './routes/home';
import PersonalInfo, {loader as personalInfoLoader, action as personalInfoAction} from './routes/personalInfo';
import Edit, {loader as editLoader} from "./routes/edit";
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
import Summary, {loader as summaryLoader, action as summaryAction} from "./routes/summary";
import Extras, {loader as extraLoader} from "./routes/extras/extras";
import ExtraForm, {action as extraAction} from "./routes/extras/extraForm";
import ExtraRoot from "./routes/extras/extraRoot";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Root from "./routes/root";
import Templates, {loader as templateLoader} from './routes/templates/templates.jsx';
import TemplatesRoot from './routes/templates/templatesRoot.jsx';
import Classic, {ClassicPrint} from "./routes/templates/classic";

export function formatDate(str) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = str.slice(-2);
  const year = str.slice(0, 4);
  return `${months[monthIndex - 1]} ${year}`;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<p>404 Page not found</p>}>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
        <Route path="edit/" element={<Edit />} loader={editLoader}>
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
          <Route path="summary" element={<Summary />} loader={summaryLoader} action={summaryAction}/>
          <Route path="extras" element={<Extras />} loader={extraLoader}>
            <Route index element={<ExtraRoot />}/>
            <Route path=":index" element={<ExtraForm />} loader={extraLoader} action={extraAction}/>
          </Route>
        </Route>
        <Route path="templates" element={<Templates />} loader={templateLoader}>
          <Route index element={<TemplatesRoot />}/>
          <Route path="classic" element={<Classic />}/>
          <Route path="download">
            <Route path="classic" element={<ClassicPrint />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
