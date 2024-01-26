import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/auth.store";

const { Header } = Layout;

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultActiveFirst={false}
        selectable={false}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
        >
          Home
        </Menu.Item>
        {!user ? (
          <>
            <Menu.Item
              key="2"
              icon={<LoginOutlined />}
              onClick={() => navigate("/login")}
            >
              Login
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UserOutlined />}
              onClick={() => navigate("/register")}
            >
              Register
            </Menu.Item>
          </>
        ) : (
          <Menu.Item icon={<LogoutOutlined />} onClick={() => handleLogout()}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
