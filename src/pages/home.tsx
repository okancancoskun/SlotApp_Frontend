import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getGames } from "../store/game.store";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Input,
  List,
  Modal,
  Row,
  Space,
} from "antd";
import { PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { games } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getGames({ search }));
  }, [search, dispatch]);

  const handleClose: () => void = () => {
    setOpen(false);
  };

  const handlePlay = (slug: string) => {
    if (!user) return setOpen(true);
    navigate(`/game/${slug}`);
  };
  return (
    <>
      <Row gutter={[16, 24]} style={{ marginTop: "85px" }}>
        <Col span={24}>
          <Card>
            <Flex vertical gap={12}>
              <Space.Compact size="large">
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Space.Compact>
            </Flex>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={games}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      size="large"
                      onClick={() => handlePlay(item.slug)}
                    >
                      Play
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.thumb?.url} />}
                    title={item.title}
                    description={`Provider: ${item?.providerName}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        open={open}
        title="You should be logged in for playing"
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={() => navigate("/login")}>
            Login
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>,
        ]}
      ></Modal>
    </>
  );
};
