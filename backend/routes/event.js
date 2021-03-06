const { getLinkPreview, getPreviewFromContent } = require("link-preview-js");


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { sendEmail } = require('../email');
router.use(bodyParser.urlencoded({ extended: false }));
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  //event should contain { title, description, startTime, endTime, address, lat, long, creator }
  router.post('/new', (req, res) => {
    console.log("running post request");
    const event = req.body;
    console.log(event);
    db.createEvent(event)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    db.showEventDetails(eventId)
      .then((data) => {
        console.log("event data is" + data);
        res.json(data);
      })
  })

  //edit an event
  //event should contain { title, description, startTime, endTime, address, lat, long, creator, id } id = event id
  router.put('/', (req, res) => {
    const event = req.body;
    db.editEvent(event)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //get all invitees given an event id
  router.get('/invitees/:id', (req, res) => {
    const eventId = req.params.id;
    db.getInvitees(eventId)
      .then((data) => {
        res.json(data);
      })
  });

  //create an invite
  //invite should contain { response, userId, eventId }
  //response sould be null if not inviting myself
  router.post('/invite', (req, res) => {
    const invite = req.body;
    db.invite(invite)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //update a response
  //invite should contain { response, userId, eventId }
  router.put('/response', (req, res) => {
    const invite = req.body;
    db.responseInvite(invite)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //delete an invite
  //invite should contain { userId, eventId }
  router.delete('/invite', (req, res) => {
    const invite = req.body;
    console.log('AAAAAA',req.body)
    db.deleteInvite(invite)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //create a comment
  //comment should contain { eventId, userId, time, text }
  router.post('/comment', (req, res) => {
    const comment = req.body;
    db.addComment(comment)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //check url existence
  const urlify = (t) => {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    return t.match(regex);
  }

  //get all comments given an event id
  router.get('/comments/:id', (req, res) => {
    const eventId = req.params.id;
    db.getComments(eventId)
      .then((data) => {
        Promise.all([...data].map((pre) => {
          if(urlify(pre.comment_text)) 
          {
            return getLinkPreview(pre.comment_text)
            .then((a) => {
              return a;
            })
            .catch((e) => {
              return null;
            });
          }
        }))
        .then((resp) => {
          for (let i = 0; i < resp.length; i++) {
            console.log("asdadas",resp[i]);
            if(resp[i]) {
              data[i].preview = resp[i];
            }
          }
          console.log(data);
          return res.json(data);
        })
        .catch((e) => console.log(e))
      })
  });
  
  //delete a comment
  router.delete('/comment/:id', (req, res) => {
    const commentId = req.params.id;
    db.deleteComment(commentId)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  //delete an event
  router.delete('/:id', (req, res) => {
    const eventId = req.params.id;
    db.deleteEvent(eventId)
      .then((data) => {
        return res.json({ status: 200, data: data });
      })
  });

  router.post('/email', (req,res) => {
    console.log("posted");
    console.log(req.body);
    const toEmails = req.body.emailArray;
    console.log({toEmails});
    for(let email of toEmails) {
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      
      sendEmail(email, req.body.title, req.body.description);
    }
  })

  return router;
};