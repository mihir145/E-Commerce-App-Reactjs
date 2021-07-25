import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { getOneCategory, updateCategory } from "../helper/adminapicall";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();
  const { categoryId } = useParams();

  useEffect(() => {
    getOneCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setName(data.name);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateCategory(user._id, categoryId, token, { name })
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setError(data.error);
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link
          className="btn btn-sm btn-info mb-3"
          to="/admin/manage/categories"
        >
          Back
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="alert alert-success">Category Updated Successfully!!</div>
    );
  };

  const errorMessage = () => {
    return <div className="alert alert-danger">{error}</div>;
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
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      description="Update a category here"
      title="Update category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <>
              {goBack()}
              {success && successMessage()}
              {error && errorMessage()}
              {categoryForm()}
            </>
          )}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
