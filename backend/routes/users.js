var express = require('express');
var router = express.Router();
import {getAllUsers} from "../db/db.js"

/* GET users listing. */
router.get('/test', function(req, res, next) {
  getAllUsers()
    .then ((data) => {
      console.log("dataaaaaaa" + res.json(data))
    });
  }
);

module.exports = router;
