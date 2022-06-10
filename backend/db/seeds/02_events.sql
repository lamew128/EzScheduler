INSERT INTO events (name,description,start_time, end_time,latitude,longtitude,user_id)
VALUES(
  'Group Study',
  'Let us grind together and nail lhl finals!!',
   1654897206,
   1654907206,
   28.599171,
   -81.201653,
   1
);

INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,2,'yes');
INSERT INTO event_invitees (event_id,user_id,response) VALUES (1,3,'no');

