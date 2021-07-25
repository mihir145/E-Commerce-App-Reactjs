import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { deleteCategory, getCategories } from "../helper/adminapicall";

const { token, user } = isAuthenticated();

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  }, []);
  const cateTable = () => {
    var count = 0;
    return categories.length == 0 ? (
      <h4>
        No Products Found! Click <Link to="/admin/create/product/">Here</Link>{" "}
        to add product.
      </h4>
    ) : (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data) => {
            count++;
            return (
              <tr key={data._id}>
                <th scope="row">{count}</th>
                <td>{data.name}</td>
                <td>
                  <Link
                    to={`/admin/edit/category/${data._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  {"   "}
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCategory(user._id, data._id, token)
                        .then((data) => {
                          alert(data.error);
                        })
                        .catch((err) => console.log(err));
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
      title="Manage Categories"
      className="container bg-purple p-5 mb-4"
      description="Manage Your All Categories Here..."
    >
      <div className="row bg-white rounded p-4">
        <div className="mt-5">
          <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
            Admin Home
          </Link>
        </div>
        <div className="col-md-8 offset-md-2 mb-4">{cateTable()}</div>
      </div>
    </Base>
  );
};

export default ManageCategories;
