import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slots } from "../constants/slots";
import { useAppDispatch, useAppSelector } from "../store";
import { getGame } from "../store/game.store";
import { Button, Col, Flex, Row, Spin, Typography, message } from "antd";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "../helpers/axios";
import { updateUser } from "../store/auth.store";

interface IResult {
  reward: number;
  currentBalance: number;
  result: string[];
}

export const Game: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [result, setResult] = useState<IResult>();
  const { gameData } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGame(slug as string));
  }, [slug, dispatch]);

  const spin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/game/spin-machine");
      setResult(data);
      dispatch(updateUser({ coins: data.currentBalance }));
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          "Error happened while trying to spin",
      });
    }
    setLoading(false);
  };

  const printResult = () => {
    if (result && result.reward) {
      return (
        <Col span={24}>
          <Flex align="center" justify="center">
            <Typography.Title type="success" level={2} style={{ margin: 0 }}>
              You won +{result.reward}
            </Typography.Title>
          </Flex>
        </Col>
      );
    } else if (result && !result.reward) {
      return (
        <Col span={24}>
          <Flex align="center" justify="center">
            <Typography.Title type="danger" level={2} style={{ margin: 0 }}>
              You lost
            </Typography.Title>
          </Flex>
        </Col>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {contextHolder}
      {gameData?.game && gameData.initialSpin.length > 0 ? (
        <Row gutter={[16, 24]} style={{ marginTop: "85px" }}>
          <Col span={24}>
            <Flex align="center" justify="end">
              <Typography.Title level={4} style={{ margin: 0 }}>
                Your Balance: {user?.coins}
              </Typography.Title>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex align="center" justify="center">
              <Typography.Title level={1} style={{ margin: 0 }}>
                {gameData.game.title}
              </Typography.Title>
            </Flex>
          </Col>
          <Col span={24}>
            {loading ? (
              <Flex align="center" justify="center">
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
                />
              </Flex>
            ) : (
              <>
                {result && result.result ? (
                  <Flex align="center" justify="center">
                    {result.result.map((item) => (
                      <span style={{ fontSize: "30px" }}>{Slots[item]}</span>
                    ))}
                  </Flex>
                ) : (
                  <Flex align="center" justify="center">
                    {gameData.initialSpin.map((item, index) => (
                      <span key={index} style={{ fontSize: "30px" }}>
                        {Slots[item]}
                      </span>
                    ))}
                  </Flex>
                )}
              </>
            )}
          </Col>
          <Col span={24}>
            <Flex align="center" justify="center">
              <Button
                type="primary"
                icon={<CaretRightOutlined />}
                size="large"
                onClick={spin}
                disabled={loading}
              >
                Spin (1 coin)
              </Button>
            </Flex>
          </Col>
          {printResult()}
        </Row>
      ) : (
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            Game Not Found
          </Typography.Title>
        </Row>
      )}
    </>
  );
};
