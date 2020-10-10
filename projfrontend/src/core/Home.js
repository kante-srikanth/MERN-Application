import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (!data) {
        setError("Error in loading products");
      } else {
        console.log("data", data);
        setProducts(data.products);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Tshirt Store" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
