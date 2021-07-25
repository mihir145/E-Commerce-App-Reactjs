import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { createProduct, getCategories } from "../helper/adminapicall";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    stock: "",
    price: "",
    error: "",
    loading: false,
    category: "",
    categories: [],
    createdProduct: "",
    getaRedirect: "",
    formData: "",
  });

  const {
    name,
    price,
    stock,
    description,
    loading,
    createdProduct,
    getaRedirect,
    error,
    categories,
    success,
    formData,
  } = values;

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
          console.log(data);
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: "",
          createProduct: data.name,
        });
      }
    });
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
        <h4>Product Successfully Added!!</h4>
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

  const productForm = () => {
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
            value={name}
          />
          <textarea
            type="text"
            className="form-control my-3"
            placeholder="Description"
            onChange={handleChange("description")}
            value={description}
            required
          ></textarea>
          <input
            type="text"
            className="form-control my-3"
            required
            onChange={handleChange("price")}
            placeholder="Price"
            value={price}
          />
          <select className="form-control" onChange={handleChange("category")}>
            <option>Select</option>
            {categories &&
              categories.map((cat, index) => (
                <option key={index} value={cat._id}>
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
            value={stock}
          />
          <input
            type="file"
            className="form-control my-3"
            accept="image"
            onChange={handleChange("photo")}
            required
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
      title="Create a product here"
      description="Add a new product for new products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {success && successMessage()}
          {error && errorMessage()}
          {productForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
