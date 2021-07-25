import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
  const { user } = isAuthenticated();
  const LeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/quiz/">Create Quiz</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/quiz/">Manage Quiz</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/quiz/add-questions/">Add Questions</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/questions/">Manage Questions</Link>
          </li>
        </ul>
      </div>
    );
  };

  const RightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email: </span>{" "}
            {user.email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {user.name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Role:</span> User
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome To User Dashboard"
      description="Manage your Profile here.."
      className="container p-4 mb-5"
    >
      <div className="row bg-success" style={{ padding: 10 }}>
        <div className="col-md-3">{LeftSide()}</div>
        <div className="col-md-9">{RightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
