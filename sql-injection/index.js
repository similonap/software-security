const express = require('express');
const db = require('sqlite');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use( express.static( 'public' ) );

app.get('/', function(req, res) {
    res.render('pages/index', {error: undefined});
});

app.get('/login', async (req, res, next) => {
  try {
    let username = req.query.username;
    let password = req.query.password;
    let query = 'SELECT * FROM User where username = \'' + username + '\' AND password = \'' + password + '\'';
    // let query = 'SELECT * FROM User where username = ? AND password = ?';
    const user = await db.get(query); 
    if (user) {
        res.render('pages/logged_in');
    } else {
        res.render('pages/index', {error: 'Incorrect login/password!'});
    }
  } catch (err) {
    next(err);
  }
});

(async() => {
    db.open('./database.sqlite');
    app.listen(port);
})();
