import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import LoadingCircle from "../components/LoadingCircle";

const ApiUrl = "https://fakestoreapi.com/products";

const Home = ({ selectedCategories, setLoading, loading }) => {
  const [data, setData] = useState([]);
  //const { product, fetchProduct } = useProduct();
  console.log(selectedCategories);

  const fetchApiUrl =
    selectedCategories === "All Categories"
      ? ApiUrl
      : `${ApiUrl}/category/${selectedCategories}`;

  console.log(fetchApiUrl);

  async function getAllProduct() {
    const fetchApiUrl =
      selectedCategories === "All Categories"
        ? ApiUrl
        : `${ApiUrl}/category/${selectedCategories}`;

    setLoading(true);
    const data = await fetch(fetchApiUrl);

    const data2 = await data.json();
    setData(data2);
    setLoading(false);
    console.log("data", data2);
  }
  useEffect(() => {
    getAllProduct();
  }, [selectedCategories]);

  console.log(data);

  return loading ? (
    <LoadingCircle />
  ) : (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {data?.map((data) => (
        <ItemCard data={data} key={data.id} />
      ))}
    </div>
  );
};

export default Home;
