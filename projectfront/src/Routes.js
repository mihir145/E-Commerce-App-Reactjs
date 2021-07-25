import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import notfound from "./notfound";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AdminRoutes from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import Cart from "./user/Cart";
import {
  AddCategory,
  ManageCategories,
  UpdateCategory,
} from "./admin/category";
import { AddProduct, ManageProducts, UpdateProduct } from "./admin/product";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <PrivateRoutes path="/user/dashboard" component={UserDashBoard} />
        <AdminRoutes path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoutes path="/admin/create/category" component={AddCategory} />
        <AdminRoutes
          path="/admin/manage/categories"
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/edit/category/:categoryId"
          component={UpdateCategory}
        />
        <AdminRoutes path="/admin/manage/product/" component={ManageProducts} />
        <AdminRoutes path="/admin/create/product/" component={AddProduct} />
        <AdminRoutes
          path="/admin/edit/product/:productId"
          component={UpdateProduct}
        />

        <Route component={notfound} />
      </Switch>
    </Router>
  );
};

export default Routes;
