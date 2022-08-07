const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;


const app = express();

app.use(express.urlencoded({extended: true}));

app.use(cookieParser('mysecret'));

app.use(session( {
secret: 'mysecret',
resave: true,
saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done ){

  if(username === "daurymendoza017" && password === "100224857")
     return done(null, {id: 1, name: "Daury"});

done(null, false);
}));

// 1 => Serialización 
passport.serializeUser(function(user, done){
   done(null, user.id);
});

// Deserialización
passport.deserializeUser(function (id,done){
    done(null, { id: 1, name: "Daury"}); 
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express(JSON));


app.get("/", (req, res, next)=> {

    if(req.isAuthenticated()) return next();
      res.redirect("/login");


},(req,res) => {

//si se ha iniciado sesion ir a la lista de contactos

//si no se ha iniciado session, se enviara al /login

res.redirect("/listcontact");



});

app.get("/login", (req,res) => {
 //muestro el login 
   res.render("login");
});


app.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}));
   
app.get("/listcontact", (req,res) => {
  //muestro la lista de contactos 
    res.render("listcontact");
 });

 app.get("/mensaje", (req,res) => {
  //muestro la lista de contactos 
    res.render("mensaje");
 });



 
   app.listen(8080, ()=> console.log ("Servidor iniciado"));