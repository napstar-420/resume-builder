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
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<p>404 Page not found</p>}>
        <Route index element={<Home />}/>
        <Route path="edit/" element={<Edit />}>
          <Route index element={<EditRoot />}/>
          <Route path="personal_info" element={<PersonalInfo />}/>
          <Route path="work_history" element={<WorkHistory />}/>
        </Route>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
