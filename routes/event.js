const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET event listing. */
  router.get('/test', (req, res) => {
    db.getEvents()
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
      .then((email) => {
        if (!email) {
          return;//no email
        }
        if (password === email.password) {
          return email;//wrong passwod
        }
        return null;
      });
  };
  exports.login = login;

  

  return router;
};