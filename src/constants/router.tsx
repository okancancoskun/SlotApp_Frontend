import {
  BrowserRouter,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "../components";
import { Game, Home, Login, NotFound, Register } from "../pages";
import { AuthGuard, PublicGuard } from "../guards";

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    path: "/",
  },
  {
    element: (
      <Layout>
        <PublicGuard>
          <Login />
        </PublicGuard>
      </Layout>
    ),
    path: "/login",
  },
  {
    element: (
      <Layout>
        <AuthGuard>
          <Game />
        </AuthGuard>
      </Layout>
    ),
    path: "/game/:slug",
  },
  {
    element: (
      <Layout>
        <PublicGuard>
          <Register />
        </PublicGuard>
      </Layout>
    ),
    path: "/register",
  },
  {
    element: (
      <Layout>
        <NotFound></NotFound>
      </Layout>
    ),
    path: "*",
  },
]);
