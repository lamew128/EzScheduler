INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'e1',
  'e11',
   1654897206,
   1654907206,
   'a1',
   28.599171,
   -81.201653,
   1
);

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'e2',
  'e22',
   1654897206,
   1654907206,
   'a2',
   28.599171,
   -81.201653,
   2
);

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'e3',
  'e33',
   1654897206,
   1654907206,
   'a3',
   28.599171,
   -81.201653,
   3
);

INSERT INTO events (name, description, start_time, end_time, address, latitude, longtitude,user_id)
VALUES(
  'e4',
  'e44',
   1654897206,
   1654907206,
   'a4',
   28.599171,
   -81.201653,
   1
);

INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,3,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (4,1,'yes');


INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,3,'no');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (2,3,'no');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,1,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (3,2,'no');