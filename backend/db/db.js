let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const { count, Console } = require("console");
const { create } = require("domain");
const { Pool } = require("pg");
const { resourceLimits } = require("worker_threads");
const pool = new Pool(dbParams);

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password)
       VALUES($1, $2, $3)
       RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(
      `SELECT * FROM users
       WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllUsers = () => {
  return pool
    .query(
      `SELECT * FROM users;`)
    .then((data) => {
      const users = data.rows;
      return users;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllEvents = () => {
  return pool
    .query(
      `SELECT * FROM events;`)
    .then((data) => {
      const events = data.rows;
      return events;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get the events that created by the given user
//output: [event_id, title, description, start_time, end_time, lat, long]
const myCreatedEvents = (user) => {
  return pool
    .query(
      `
    SELECT events.id as event_id, events.name as title, events.description, events.start_time, events.end_time, events.latitude as lat, events.longtitude as long FROM events
    WHERE user_id = $1;
    `, [user])
    .then((data) => {
      const events = data.rows;
      return events;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//all event belongs to user or got invited
//output: [event_id, creator, title, description, start_time, end_time, lat, long]
const getUpcomingEvents = (user) => {
  return pool
    .query(
      `
    SELECT distinct events.id as event_id, events.user_id as creator, events.name as title, events.description, events.start_time, events.end_time, events.latitude as lat, events.longtitude as long
    From EVENTS
    Join event_invitees ON events.id = event_invitees.event_id
    WHERE event_invitees.user_id = $1;
    `, [user])
    .then((data) => {
      const events = data.rows;
      return events;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//create an event
const createEvent = (event) => {
  let eventParams = [event.title, event.description, event.startTime, event.endTime, event.lat, event.long, event.creator];
  return pool
    .query(
      `
    INSERT INTO events (name, description, start_time, end_time, latitude, longtitude, user_id)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, eventParams)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//create an event
const invite = (invite) => {
  let inviteParams = [invite.eventId, invite.userId, invite.response];
  return pool
    .query(
      `
    INSERT INTO event_invitees (event_id, user_id, response) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `, inviteParams)
    .then((data) => {

    })
    .catch((err) => {
      console.log(err.message);
    });
};

//edit event
//need event id
const editEvent = (event) => {
  let eventParams = [event.title, event.description, event.startTime, event.endTime, event.lat, event.long, event.creator, event.id];
  return pool
    .query(
      `
    UPDATE events
    SET name = $1, description = $2, start_time = $3, end_time = $4, latitude = $5, longtitude = $6, user_id = $7
    WHERE id = $8
    RETURNING *;
    `, eventParams)
    .then((data) => {

    })
    .catch((err) => {
      console.log(err.message);
    });
};

//delete an event with given id
const deleteEvent = (eventId) => {
  return pool
    .query(
      `
    DELETE FROM events
    WHERE id = $1
    RETURNING *;  
    `, eventId)
    .then((data) => {

    })
    .catch((err) => {
      console.log(err.message);
    });
};

//edit inv (change response)
const responseInvite = (invite) => {
  let inviteParams = [invite.id, invite.response];
  return pool
    .query(
      `
    UPDATE events_invitees
    SET response = $2
    WHERE id = $1
    RETURNING *;
    `, inviteParams)
    .then((data) => {

    })
    .catch((err) => {
      console.log(err.message);
    });
};

//delete inv
const deleteInvite = (id) => {
  return pool
    .query(
      `
    DELETE FROM events_invitees
    WHERE id = $1
    RETURNING *;
    `, id)
    .then((data) => {

    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  addUser,
  getUserWithEmail,
  getAllUsers,
  getAllEvents,
  myCreatedEvents,
  getUpcomingEvents,
  createEvent,
  invite,
  editEvent,
  deleteEvent,
  responseInvite,
  deleteInvite
};
