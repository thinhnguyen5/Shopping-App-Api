const express = require('express');
const app = express();
const port = 3000;
const productComponent = require('./components/products');
const userComponent = require('./components/users');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello, I am Thinh Nguyen from Din19SP and my group mate is Du Pham'));

passport.use(new BasicStrategy(
  function(username, password, done) {
    const user = users.getUserByName(username);
    if(user == undefined) {
      console.log("HTTP Basic username not found");
      return done(null, false, {message: "HTTP Basic username not found"});
    }
    if(bcrypt.compareSync(password, user.password) == false) {
      console.log("HTTP Basic password not matching username");
      return done(null, false, {message: "HTTP Basic password not found"});
    }
    return done(null, user);
  }
))

app.get('/protected',
  passport.authenticate('basic', {session: false}),
  (req, res) => {res.json({yourProtectedResource: "profit"});
});


//Routes
app.use('/products', productComponent );
app.use('/users', userComponent);

let serverInstance = null;
  
  var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});