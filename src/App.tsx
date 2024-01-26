import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./constants/router";
import { Fragment } from "react";
import { Layout } from "./components";

function App() {
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
    </Fragment>
  );
}

export default App;
