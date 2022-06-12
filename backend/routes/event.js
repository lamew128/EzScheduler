const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  /* GET event listing. */
  router.get('/', (req, res) => {
    db.getAllEvents()
      .then((data) => {
        res.json(data);
      });
  });

  //all event created by user with given id
  router.get('/created/:user', (req, res) => {
    const userId = req.params.user;
    db.myCreatedEvents(userId)
      .then((data) => {
        res.json(data);
      })
  });

  //all event related to the user with given id
  router.get('/all/:user', (req, res) => {
    const userId = req.params.user;
    db.getUpcomingEvents(userId)
      .then((data) => {
        res.json(data);
      })
  });

  //create a new event
  //event should contain { title, description, startTime, endTime, lat, long, creator }
  router.post('/new', (req, res) => {
    const { event } = req.body.event;
    db.createEvent(event)
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      })
  });

  //edit an event
  //event should contain { title, description, startTime, endTime, lat, long, creator, id } id = event id
  router.put('/', (req, res) => {
    const { event } = req.body.event;
    db.editEvent(event)
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      })
  });

  //delete an event
  router.delete('/:id', (req, res) => {
    const eventId = req.params.id;
    db.deleteEvent(eventId)
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      })
  });

  //get all invitees given an event id
  router.get('/invitees/:id', (req, res) => {
    const eventId = req.params.id;
    db.getInvitees(eventId)
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      })
  });

  //update a response
  //invite should contain { id, response }
  router.put('/response', (req, res) => {
    const { invite } = req.body.invite;
    db.responseInvite(invite)
      .then((data) => {
        console.log("dataaaaaaa" + data);
        res.json(data);
      })
  });

  return router;
};