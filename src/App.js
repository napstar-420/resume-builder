import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Home from './routes/home';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<p>404 Page not found</p>}>
        <Route index element={<Home />}/>
      </Route>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
