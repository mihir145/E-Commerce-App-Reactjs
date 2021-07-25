import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../../backend";
import { addItemToCart } from "../../core/helper/cartHelper";

// const ProductCard = ({ item }) => {
//   return (
//     <div className="col-md-4" key={item._id}>
//       <div className="card1 mt-3">
//         <div className="align-items-center product-1 p-2 text-center">
//           <img
//             src={`${API}/product/photo/${item._id}`}
//             style={{ width: 100, height: 100 }}
//             alt={item.name}
//           />
//           <h3 className="text-dark">{item.name}</h3>
//           <div className="mt-3 info1 text-dark">
//             <span className="text-1 d-block">{item.description}</span>
//           </div>
//           <div className="cost1 mt-3 text-dark">
//             <span>{item.price}$</span>
//           </div>
//         </div>
//         <button
//           className="text-uppercase product-add-to-cart p-3 text-center mt-3 cursor btn-success"
//           onClick={() => {}}
//         >
//           Add To Cart
//         </button>
//       </div>
//     </div>
//   );
// };

const ProductCard = ({ item }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(item.count);

  const addToCart = () => {
    addItemToCart(item, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div class="product-card" style={{ marginBottom: "20px" }}>
      {/* <div class="badge">Hot</div> */}
      <div
        class="product-tumb"
        style={{
          //   backgroundImage: "src('" + `${API}/product/photo/${item._id}` + "')",
          backgroundImage: "url(" + `${API}/product/photo/${item._id}` + ")",
        }}
      ></div>
      <div class="product-details">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <div class="product-bottom-details">
          <div class="product-price text-success">{item.price}$</div>
          <div class="product-links">
            <i class="fa fa-shopping-cart" onClick={addToCart}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
