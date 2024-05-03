import React from "react";
import {
  EditOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ItemCard = ({ data }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLogin = useSelector((state) => state.login.isLogin);
  const shortDes = data?.description.slice(0, 125);
  console.log(data);

  const currentId = data?.id;
  const alreadyAddedInCart = cartItems.some((item) => item?.id === currentId);
  console.log(alreadyAddedInCart);

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

  function viewDetails() {
    // navigate('/app/report', { state: rowData });
    navigate("/productdetails", { state: data });
  }

  return (
    <>
      {contextHolder}
      <Card
        style={{
          // width: 260,
          maxWidth: 300,
          minWidth: 250,
          margin: 5,
          marginBottom: 15,
          padding: 5,
          boxShadow: "0.1px 0.1px 3.5px .1px grey",
          cursor: null,
        }}
        cover={
          <div style={{ textAlign: "center" }}>
            <img height={200} width={200} alt="example" src={data?.image} />
          </div>
        }
        actions={[
          <button
            onClick={cartHandler}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            {alreadyAddedInCart ? (
              <>
                <ShoppingCartOutlined key="cart" style={{ color: "red" }} />
                <span style={{ color: "red" }}> Remove from cart </span>
              </>
            ) : (
              <>
                <ShoppingCartOutlined key="cart" style={{ color: "green" }} />
                <span style={{ color: "green" }}> Add to Cart</span>
              </>
            )}
          </button>,
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              // cursor: "pointer",
              color: "inherit",
            }}
            onClick={viewDetails}
          >
            <FullscreenOutlined key="details" /> <span> View more</span>
          </button>,
          // <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: "grey" }}>$ {data?.price}</p>
          <p style={{ color: "#1677ff" }}>{data?.category}</p>
        </div>
        <Meta
          // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={data?.title}
          description={`${shortDes}...`}
        />
      </Card>
    </>
  );
};
export default ItemCard;
