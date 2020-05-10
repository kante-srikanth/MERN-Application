import React from "react";
import Base from "../core/Base";
import "../styles.css";
const Home = () => {
  console.log("APP IS", process.env.REACT_APP_BACKEND);
  return <Base title="HELLO FRONT END">THIS IS MAIN PAGE CONTENT</Base>;
};

export default Home;
