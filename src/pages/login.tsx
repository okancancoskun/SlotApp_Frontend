import { FC, useState } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  email?: string;
  password?: string;
};

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: any) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/");
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error || "Error happened while login",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ width: "100%", maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={loading === "pending"}
                  icon={loading === "pending" ? <LoadingOutlined /> : null}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
