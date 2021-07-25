var express=require("express");
var router=express.Router();
const { signout, signup, signin, isSignedin }=require("../controllers/auth");
const {check, validationResult}=require("express-validator");

router.post("/signup",[
    check("name","Name must be at least 3 character.").isLength({min:3}),
    check("email","Email is required.").isEmail(),
    check("password","Password must be at least 3 character.").isLength({min:3})
],signup);

router.post("/signin",[
    check("email","Email is required.").isEmail(),
    check("password","Password must be at least 3 character.").isLength({min:3})
],signin);

// router.get("/testroute",isSignedin,(req,res)=>{
//     res.json(req.auth);
// });

router.param("id",(req,res,next,id)=>{
    
    next();
});

router.get("/signout",signout);

module.exports=router;