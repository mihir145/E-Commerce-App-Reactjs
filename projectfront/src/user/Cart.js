import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../admin/product/ProductCard";
import Base from "../core/Base";
import { loadCart } from "../core/helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  return (
    <Base title="Cart" description="">
      <div className="row">
        <div
          className="col-md-6 align-items-center justify-content-center"
          style={
            {
              // border: "1px solid #28a745 ",
            }
          }
        >
          <h4>Items in Cart</h4>
          <div className="row" style={{ justifyContent: "space-between" }}>
            {products.map((item) => (
              <ProductCard item={item} />
            ))}
          </div>
        </div>
        <div
          className="col-md-6 text-center"
          // style={{ border: "1px solid #28a745 " }}
        >
          <h4>Checkout</h4>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
