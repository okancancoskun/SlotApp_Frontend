import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useAppSelector } from "../store";
import { useLocation, useNavigate } from "react-router-dom";

export const PublicGuard = ({ children }: PropsWithChildren) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return <>{children}</>;
};
