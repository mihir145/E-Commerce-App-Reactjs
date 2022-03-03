import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "../helper/adminapicall";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    formData: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();
  const { productId } = useParams();

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
          console.log(data);
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    preload();
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct({ ...product, ...data, formData: new FormData() });
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    product.formData.set(name, value);
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { formData } = product;

    updateProduct(user._id, productId, token, formData)
      .then((data) => {
        if (data.error) {
          setSuccess(false);
          setError(data.error);
        } else {
          setSuccess(true);
          setProduct({ ...product, formData: new FormData(), photo: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3" to="/admin/manage/product/">
          Back
        </Link>
      </div>
    );
  };

  const successMessage = () => {
    return (
      success && (
        <div className="alert alert-success">
          Product Updated Successfully!!
        </div>
      )
    );
  };

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Product</p>
          <input
            type="text"
            className="form-control my-3"
            required
            onChange={handleChange("name")}
            placeholder="For ex. Nike Shoes"
            value={product.name}
          />
          <textarea
            type="text"
            className="form-control my-3"
            placeholder="Description"
            onChange={handleChange("description")}
            value={product.description}
            required
          ></textarea>
          <input
            type="text"
            className="form-control my-3"
            required
            onChange={handleChange("price")}
            placeholder="Price"
            value={product.price}
          />
          <select className="form-control" onChange={handleChange("category")}>
            <option>Select</option>
            {categories &&
              categories.map((cat, index) => (
                <option
                  key={index}
                  value={cat._id}
                  selected={cat._id === product.category}
                >
                  {cat.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            className="form-control my-3"
            required
            onChange={handleChange("stock")}
            placeholder="Quantity"
            value={product.stock}
          />
          <input
            type="file"
            className="form-control my-3"
            accept="image"
            onChange={handleChange("photo")}
            required
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
            <h3>Loading...</h3>
          ) : (
            <div>
              {goBack()}
              {errorMessage()}
              {successMessage()}
              {categoryForm()}
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
