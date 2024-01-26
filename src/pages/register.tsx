import { FC, useState } from "react";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { LoadingOutlined } from "@ant-design/icons";

type FieldType = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  surname: string;
};

export const Register: FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post("/auth/register", values);
      navigate("/login");
      message.open({
        type: "success",
        content: "Successfully Registered",
      });
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message || "Error happened while register",
      });
    }
    setLoading(false);
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
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your name" }]}
              >
                <Input placeholder="Please input your name" />
              </Form.Item>
              <Form.Item<FieldType>
                name="surname"
                label="Surname"
                rules={[
                  {
                    required: true,
                    message: "Please input your surname",
                  },
                ]}
              >
                <Input placeholder="Please input your surname" />
              </Form.Item>
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
                  { required: true },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Confirm Password"
                name="repeatPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={loading}
                  icon={loading ? <LoadingOutlined /> : null}
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
