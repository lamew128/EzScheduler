const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET event listing. */
  router.get('/', (req, res) => {
    db.getEvents()
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      });
    }
  );

  //router.get

  

  return router;
};