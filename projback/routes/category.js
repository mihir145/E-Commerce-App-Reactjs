const express=require("express");
const router= express.Router();


const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory}=require("../controllers/category");
const {isAdmin,isAuthenticated,isSignedin}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here
router.post("/category/create/:userId",isSignedin,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId",getCategory);

router.get("/categories",getAllCategory);

router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,updateCategory);

router.delete("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,deleteCategory);

module.exports=router;