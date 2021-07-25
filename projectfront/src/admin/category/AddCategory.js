import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { createCategory } from "../helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setError(data.error);
        } else {
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">
        <h4>Category Successfully Added!!</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="alert alert-danger">
        <h4>{error}</h4>
      </div>
    );
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            value={name}
            onChange={handleChange}
            placeholder="For Ex. Nike"
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            create
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {success && successMessage()}
          {error && errorMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
