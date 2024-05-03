import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Badge, message } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./store/loginSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ShoppingCart from "./page/ShoppingCart";

import "./App.css";
import ProductDetails from "./page/ProductDetails";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const [selectedKey, setSelectedKey] = useState("All Categories");
  const [selectedCategories, setSelectedCategories] =
    useState("All Categories");

  const cartValue = useSelector((state) => state.cart.value);

  console.log(isLogin, "this is app.jsx");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const clickHandler = (key) => {
    setSelectedKey(key);
    navigate("/");
    setSelectedCategories(key);
  };

  const categories = [
    "All Categories",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const items1 = categories.map((key) => ({
    key,
    label: `${key}`,
    onClick: () => clickHandler(key),
  }));

  const logoutHandler = () => {
    dispatch(removeToken());
    messageApi.open({
      type: "success",
      content: "Logout successfully",
    });
  };
  let item2;
  if (isLogin) {
    item2 = [
      { label: "logout", onClick: () => logoutHandler() },
      {
        label: (
          <Badge count={cartValue}>
            <ShoppingCartOutlined
              style={{ fontSize: "1.3rem" }}
              className="cart-icon"
            />
          </Badge>
        ),
        onClick: () => {
          navigate("/cart");
          setSelectedKey("cart");
        },
      },
    ];
  } else {
    item2 = [
      {
        label: "login",
        onClick: () => {
          navigate("/login");
          setSelectedKey("login");
        },
      },
      {
        label: (
          <Badge count={cartValue}>
            <ShoppingCartOutlined
              style={{ fontSize: "1.3rem" }}
              className="cart-icon"
            />
          </Badge>
        ),
        onClick: () => navigate("/cart"),
      },
    ];
  }
  return (
    <>
      {contextHolder}
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout>
          {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
          <Header
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={["All Categories"]}
              selectedKeys={[selectedKey]}
              items={items1}
              style={{
                flex: 1,
                minWidth: 0,
              }}
            />
            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={['2']}
              selectedKeys={[selectedKey]}
              items={item2}
              style={{
                flex: 1,
                minWidth: 0,
                justifyContent: "end",
              }}
            ></Menu>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      selectedCategories={selectedCategories}
                      setLoading={setLoading}
                      loading={loading}
                    />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/productdetails" element={<ProductDetails />} />
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Shopping Site ©{new Date().getFullYear()} Created by Vipul jain
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
