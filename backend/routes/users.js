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
  return router;
};