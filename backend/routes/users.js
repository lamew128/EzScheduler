const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET users listing. */
  router.get('/test', (req, res) => {
    db.getAllUsers()
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      });
    }
  );

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password
   */
   const login = function(email, password) {
    return db.getUserWithEmail(email)
      .then((user) => {
        if (!user) {
          console.log("email not found");
          return;//no email
        }
        if (password === user.password) {
          return user;
        }
        //wrong pw
        return null;
      });
  };

  //login
  router.post("/login", (req, res) => {
    console.log("123");
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
      .then(user => {
        if (!user) {
          console.log("no user!");
          return null;
        }
        console.log("login success!");
        return res.json({status: 200, id: user.id})
      })
      .catch(e => {
        return e;
      });
  });

  return router;
};