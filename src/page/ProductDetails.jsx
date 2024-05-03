import React from "react";
import { useLocation } from "react-router-dom";
import { Button, Rate, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart, removeFromCart } from "../store/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const [messageApi, contextHolder] = message.useMessage();

  const isLogin = useSelector((state) => state.login.isLogin);

  const cartItems = useSelector((state) => state.cart.items);
  const currentId = data.id;
  const alreadyAddedInCart = cartItems.some((item) => item?.id === currentId);
  function cartHandler() {
    if (!isLogin) {
      messageApi.open({
        type: "warning",
        content: "Please Login to add to cart",
      });
      console.log("alert");
    } else if (alreadyAddedInCart) {
      dispatch(removeFromCart(data));
      messageApi.open({
        type: "warning",
        content: "Removed from cart ",
      });
    } else {
      dispatch(addToCart(data));
      messageApi.open({
        type: "success",
        content: "Add to cart Successfully",
      });
    }
  }

  console.log(data);
  return (
    <>
      {contextHolder}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div>
          <img width={300} src={data?.image} alt="img" />
        </div>
        <div style={{ margin: "5rem", maxWidth: "500px", minWidth: "300px" }}>
          <p style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>
            {data?.title}
          </p>
          <p style={{ color: "grey" }}>{data?.category}</p>
          <p
            style={{
              fontSize: "1.5rem",
              marginBottom: ".5rem",
              marginTop: ".5rem",
            }}
          >
            $ {data?.price}
          </p>
          <Rate allowHalf defaultValue={data?.rating?.rate} />

          <p
            style={{
              marginTop: ".5rem",
            }}
          >
            {data?.description}
          </p>
          <Button
            onClick={cartHandler}
            style={{
              marginTop: "2rem",
            }}
            type="primary"
          >
            {alreadyAddedInCart ? (
              <>
                <ShoppingCartOutlined key="cart" />
                <span> Remove from cart </span>
              </>
            ) : (
              <>
                <ShoppingCartOutlined key="cart" />
                <span> Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
