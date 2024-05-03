import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartPrice = useSelector((state) => state.cart.totalPrice);
  const itemCount = useSelector((state) => state.cart.value);
  console.log(cartItems, "this is card item");
  console.log(Boolean(cartItems));
  console.log(isLogin);

  return isLogin ? (
    cartItems.length != 0 ? (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {cartItems?.map((item) => (
            <ItemCard key={item?.id} data={item} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            marginTop: "3rem",
          }}
        >
          <div>
            <div style={{ color: "grey" }}>Total Amount : </div>
            <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
              $ {totalCartPrice}
            </span>
          </div>
          <div style={{ margin: "1rem" }}>
            <Button type="primary">Proceed to Buy ({itemCount} items)</Button>
          </div>
        </div>
      </div>
    ) : (
      <div>card is empty</div>
    )
  ) : (
    <div
      style={{ textAlign: "center", marginTop: "auto", marginBottom: "auto" }}
    >
      <p style={{ fontSize: "1.5rem", margin: "2rem" }}>
        please login to view your Card
      </p>
      <Button type="primary" onClick={() => navigate("/login")}>
        Login
      </Button>
    </div>
  );
};

export default ShoppingCart;
