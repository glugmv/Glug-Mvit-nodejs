var express=require("express"),
router	   =express.Router();
var passport=require("passport");
var User=require("../models/user"),
firebase  			 = require("firebase");

// HOME
router.get("/",function(req,res){
	res.render("home");
});

// AUTH ROUTES
// REGISTER FORM
router.get("/register",function(req,res){
  res.render("register");
});
router.post("/register",function(req,res){
  firebase.auth().createUserWithEmailAndPassword(req.body.email,req.body.password)
   .then(function(userRecord) {
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch(function(err){
    console.log(error.code);
    console.log(error.message);
  })
})
router.get("/login",function(req,res){
  res.render("login");
})
router.post("/login",function(req,res){
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
  .then(function(userRecord){
    console.log(firebase.auth().currentUser);
    res.redirect("/");
  })
 .catch(function(err) {
  console.log(err);
   // Handle errors
 });
})
// // REGISTER FORM
// router.get("/register",function(req,res){
// 	res.render("register");
// });
// // REGISTER USER
// router.post("/register",function(req,res){
// 	User.register(new User({username:req.body.username,
// 		email:req.body.email,
// 		mobile:req.body.mobile
// 		}),req.body.password,function(err,user){
// 		if(err){
// 			req.flash("error",err.message);
// 			console.log(err);
// 			return res.redirect("/register");
// 		}
// 		else{
// 			passport.authenticate("local")(req,res,function(){
// 				res.redirect("/");
// 			})
// 		}
// 	})
// });

// // LOGOUT ROUTE
// router.get("/logout",function(req,res){
// 	req.logout();
// 	req.flash("success","Logged you out!!")
// 	res.redirect("/");
// });

module.exports=router;