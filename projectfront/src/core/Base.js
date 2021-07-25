import React from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4 ",
  children,
}) => (
  <div>
    <Menu></Menu>
    <div className="bg-dark">
      <div className="container-fluid">
        <div className="bg-dark text-white text-center">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={className} style={{ marginTop: 30 }}>
          {children}
        </div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-center text-white py-3">
          <button className="btn btn-warning">Contact Us</button>
        </div>
        <div className="container text-white text-muted">
          ©{new Date().getFullYear()} Copyright:{" "}
          <Link to="/" className="lead">
            MERN Stack Development
          </Link>
        </div>
      </footer>
    </div>
  </div>
);

export default Base;
