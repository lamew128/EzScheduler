const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET users listing. */
  router.get('/', (req, res) => {
    db.getAllUsers()
      .then((data) => {
        res.json(data);
      });
  }
  );
  
  router.get('/info/:id', (req, res) => {
    db.getInfoById(req.params.id)
      .then((data) => {
        return res.json({status: 200, data: data});
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
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
      .then(user => {
        if (!user) {
          return res.json({ status: 401, message: "Invalid login information."});
        }
        return res.json({ status: 200, id: user.id, name: user.name });
      })
      .catch(e => {
        return e;
      });
  });

  //Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;
    db.getUserWithEmail(user.email)
      .then((email) => {
        if (email) {
          return res.json({ status: 401, message: "Email already existed!" });
        }
        db.addUser(user)
          .then(user => {
            if (!user) {
              res.send({ error: "error" });
              return;
            }
            return res.json({ status: 200, id: user.id, name: user.name });
          })
          .catch(e => {
            return e;
          });
      });
  });

  return router;
};