-- start: Fri Jun 17 2022 18:30:00 
-- end: Fri Jun 17 2022 23:59:00 


INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'Start Panicing About the Finals',
  'Time to conquer the fear together. Squad up!!',
   1655505030, 
   1655524770,
   'University of Toronto',
   43.6570,
   -79.3903,
   1
);
INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,3,null);


-- start: Tuesday, June 14, 2022 10:00:00 AM
-- end: Tuesday, June 14, 2022 12:00:00 AM

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'I am bored',
  'Let'/'s do something',
   1655200800,
   1655215200,
   'CF Toronto Eaton Centre',
   43.6544,
   -79.3807,
   3
);
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,1,'no');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,2,'maybe');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,3,'yes');


-- start: Saturday, June 25, 2022 03:00:00 AM
-- end: Saturday, June 25, 2022 11:59:00 PM
INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'Vancouver Trip',
  'Finaly it'/'s time for east to meet west!!!Party at Moon'/'s place. Don'/'t get yourself banned' ,
   1656126000,
   1656201540,
   'Stanley Park',
   49.3043,
   -123.1443,
   2
);

INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,2,null);
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,3,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,4,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,5,'yes');

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'Pair Programming',
  'Help me please, I have so many bugs. Urgent!!!!',
   1656126000,
   1656201540,
   'North York Central Library',
   43.7682,
   -79.4148,
   3
);
INSERT INTO event_invitees (event_id,user_id,response) VALUES (4,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (4,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (4,3,'yes');

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'Dotaaaa',
  'Whos is your daddy?',
   1655812800,
   1655834400,
   'Toronto Metropolitan University',
   43.6577,
   -79.3788,
   2
);
INSERT INTO event_invitees (event_id,user_id,response) VALUES (5,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (5,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (5,3,'yes');


-- start time: Thursday, June 23, 2022 12:00:00 AM
-- end time: Thursday, June 23, 2022 3:00:00 AM
INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'Clubbing?',
  'I am stressed about the demo tomorrow. Let'\'s have some fun tonight!',
   1655942400,
   1655953200,
   'Rebel, 11 Polson St, Toronto',
   43.6410,
   -79.3548,
   2
);



-- INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
-- VALUES(
--   'e3',
--   'e33',
--    1654897206,
--    1654907206,
--    'a3',
--    28.599171,
--    -81.201653,
--    3
-- );

-- INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
-- VALUES(
--   'e4',
--   'e44',
--    1654897206,
--    1654907206,
--    'a4',
--    28.599171,
--    -81.201653,
--    1
-- );

-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,1,'yes');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,2,'yes');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,3,'yes');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (4,1,'yes');


-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,2,'yes');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,3,'no');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,1,'no');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,3,'no');
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,1, NULL);
-- INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,2,'no');