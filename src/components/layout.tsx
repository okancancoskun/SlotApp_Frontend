import { PropsWithChildren } from "react";
import Navbar from "./navbar";

export const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
};
