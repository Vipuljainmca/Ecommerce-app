import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, message, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  async function loginUser(username, password) {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const token = await res.json();
      console.log(token?.token);
      dispatch(setToken(token?.token));
      messageApi.open({
        type: "success",
        content: "Login successfully",
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      console.log(err);
      messageApi.open({
        type: "error",
        content: "username/password is incorrect",
      });
    }
  }
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log(values?.username);
    console.log(values?.password);
    loginUser(values?.username, values?.password);
  };
  const token = useSelector((state) => state.login.token);
  const isLogin = useSelector((state) => state.login.isLogin);
  console.log(token);
  console.log(isLogin);

  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          // remember: true,
          username: "johnd",
          password: "m38rmF$",
        }}
        onFinish={onFinish}
      >
        <div
          style={{ width: "300px", marginLeft: "auto", marginRight: "auto" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

       
      </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
export default Login;
