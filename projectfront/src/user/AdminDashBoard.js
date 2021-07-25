import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const { user } = isAuthenticated();
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category">Create Category</Link>
          </li>{" "}
          <li className="list-group-item">
            <Link to="/admin/manage/categories/">Manage Categories</Link>
          </li>
          <li className="list-group-item success">
            <Link to="/admin/create/product/">Create Product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/product/">Manage Products</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email: </span>{" "}
            {user.email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {user.name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Role:</span> Admin
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome To Admin Area"
      description="Manage All of your products here.."
      className="container p-4 mb-5"
    >
      <div className="row bg-success" style={{ padding: 10 }}>
        <div className="col-md-3">{adminLeftSide()}</div>
        <div className="col-md-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
