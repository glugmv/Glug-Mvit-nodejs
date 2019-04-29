var express        	 =require("express"),
app       			 =express(),
bodyParser 			 =require("body-parser"),
User 				 =require("./models/user"),
firebase  			 = require("firebase");

// var serviceAccount = require("./glugmvit68-firebase-adminsdk-nl3o0-01de15f20e.json");
var config = {
  apiKey: "AIzaSyA5ZAhTKqKAu4g0bNjxUn5Xmz2yPj_Pulc",
  authDomain: "glugmvit68.firebaseapp.com",
  databaseURL: "https://glugmvit68.firebaseio.com",
  projectId: "glugmvit68",
  storageBucket: "glugmvit68.appspot.com",
  messagingSenderId: "438399420917"
};

firebase.initializeApp(config);
var db = firebase.database();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
// app.use(flash());
app.use(function(req,res,next){
	res.locals.user=firebase.auth().currentUser;
	next();
});
// ROUTES
// HOME
app.get("/",function(req,res){
	res.render("home");
});
app.get("/author",function(req,res){
	res.render("author");
});

// AUTH ROUTES
// REGISTER FORM
app.get("/register",function(req,res){
  res.render("register");
});
app.post("/register",function(req,res){
  firebase.auth().createUserWithEmailAndPassword(req.body.email.toString(),req.body.password)
   .then(function(userRecord) {
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err.code);
    console.log(err.message);
  })
})
app.get("/login",function(req,res){
  res.render("login");
});
app.post("/login",function(req,res){
  firebase.auth().signInWithEmailAndPassword(req.body.email.toString(), req.body.password)
  .then(function(userRecord){
    res.redirect("/");
  })
 .catch(function(err) {
  console.log(err);
   // Handle errors
 });
})
app.get("/logout",function(req,res){
	firebase.auth().signOut()
	.then(function(){
		res.redirect("/");
	})
 	.catch(function (err) {
 		res.redirect("/");
   // Handle errors
 });
})

app.listen(3000,function(){
	console.log("SERVER STARTED!!!");
});