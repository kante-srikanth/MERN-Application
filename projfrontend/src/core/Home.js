import React from "react";
import Base from "../core/Base";
import "../styles.css";
import { API } from "../backend";
const Home = () => {
  console.log("APP IS", API);
  return <Base title="HELLO FRONT END">THIS IS MAIN PAGE CONTENT</Base>;
};

export default Home;
