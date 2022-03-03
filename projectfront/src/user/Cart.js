import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Base from "../core/Base";
import { loadCart } from "../core/helper/cartHelper";
import ProductCard from "../core/helper/ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, []);

  return (
    <Base title="Cart" description="">
      <div className="row">
        <div className="col-md-6 align-items-center justify-content-center ">
          <h4 className="text-center pb-4">Items in Cart</h4>
          <div className="row" style={{ justifyContent: "space-between" }}>
            {products.length == 0 ? (
              <>
                <h3>No Items in cart!</h3>
              </>
            ) : (
              products.map((item) => (
                <ProductCard
                  item={item}
                  key={item._id}
                  removeFromCart={true}
                  addtoCart={false}
                />
              ))
            )}
          </div>
        </div>
        <div className="col-md-6 text-center">
          <h4>Checkout</h4>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
