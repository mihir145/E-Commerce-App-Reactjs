import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { getAllProducts } from "../../core/helper/coreapicalls";
import { deleteProduct } from "../helper/adminapicall";

const { token, user } = isAuthenticated();

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  }, []);
  const productTable = () => {
    var count = 0;
    return products.length == 0 ? (
      <h4>
        No Products Found! Click <Link to="/admin/create/product/">Here</Link>{" "}
        to add product.
      </h4>
    ) : (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => {
            count++;
            return (
              <tr key={data._id}>
                <th scope="row">{count}</th>
                <td>{data.name}</td>
                <td>
                  <Link
                    to={`/admin/edit/product/${data._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteProduct(user._id, data._id, token).then((res) => {
                        if (data.error) alert(data.error);
                        else alert(data.name + " Deleted Successfully!!");
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td
              style={{
                display: loading ? "" : "none",
                margin: "100",
                marginBottom: "20",
                textAlign: "center",
              }}
              colSpan="4"
            >
              <h4>Loading...</h4>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <Base
      title="Manage Products"
      className="container bg-purple p-5 mb-4"
      description="Manage Your All Products Here..."
    >
      <div className="row bg-white rounded p-4">
        <div className="mt-5">
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Admin Home
          </Link>
        </div>
        <div className="col-md-8 offset-md-2 mb-4">{productTable()}</div>
      </div>
    </Base>
  );
};

export default ManageProducts;
