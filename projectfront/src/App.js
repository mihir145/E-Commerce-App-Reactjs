import React, { useEffect, useState } from "react";
import Base from "./core/Base";
import { getAllProducts } from "./core/helper/coreapicalls";
import ProductCard from "./core/helper/ProductCard";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Base title="All Products" description="Buy Your Favourite Product!!">
      <div className="container-fluid mb-5 mt-5">
        <div className="row" style={{ justifyContent: "space-between" }}>
          {products.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </Base>
  );
}

export default App;
