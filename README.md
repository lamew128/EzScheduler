# "EZ Scheduler" - Final Project (Lighthouse Labs Web Development Bootcamp)
### Main Contributors: [Eugene Lam](https://github.com/lamew128), [Di Wu](https://github.com/beijingdi), [Heron Feijao](https://github.com/heronfeijao)

## Overview

For this final project, we created an app called Ez Scheduler that allows users to organize events with friends. Users can create events with time and location(shows on map). User who created an event can invite other users to join the event. Users being invited can see the event information and response to the event. If the event is within 5 days, simple weather information is avaiable for users to confirm the situation of the event.

## Final Product

!["Screenshot of Home Page"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/1.PNG)
!["Screenshot of creating new event"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/2.PNG)
!["Screenshot of viewing event"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/3.PNG)
!["Screenshot of notificaiton"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/4.PNG)
!["Screenshot of response section"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/5.PNG)
!["Screenshot of invitees' view"](https://github.com/lamew128/EzScheduler/blob/main/screenshots/6.PNG)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command in both "frontend" and "backend" folder.
3. Create a database in the "backend" folder by psql. Then use the `\i db/schema.sql` command to setup the tables.
4. Create .env file in the "backend folder" with the following information.
  - DB_HOST=localhost
  - DB_USER=
  - DB_PASS=
  - DB_NAME=
  - DB_PORT=5432
  - SENDGRID_API_KEY=( from https://docs.airplane.dev/resources/sendgrid?gclid=Cj0KCQjwntCVBhDdARIsAMEwAClo-MSj6SNPTk1Gw-rCjSnaqTYtYqlSU_zQhQCAsoPon_JQZms9FRIaAryGEALw_wcB)

5. Create .env file in the "frontend folder" with the following information.
  - REACT_APP_API_KEY=(from https://developers.google.com/maps/documentation/javascript/get-api-key)
  - REACT_APP_API_KEY_WEATHER=(from https://openweathermap.org/api)

6. Start the web server using the `npm start` command while in the "backend" folder.  
7. Start the client using the `npm start` command while in the "frontend" folder.  
8. Go to <http://localhost:3000/> in your browser.

## Tech Stack

- Front-end
  - React
  - React Router
  - Axios
- Styling
  - CSS
  - Bootstrap
- Back-end
  - Express
  - PostgreSQL
- APIs
  - OpenWeatherMap API
  - Google Maps API
  - Send Grid

## dependencies

### front-end
- react-google-maps/api
- sendgrid/mail
- testing-library/jest-dom
- testing-library/react
- testing-library/user-event
- axios
- bootstrap-icons
- react
- react-cookie
- react-dom
- react-router-dom
- react-scripts
- react-time-picker
- timeago-react
- web-vitals

### back-end
- sendgrid/mail
- cookie-parser
- debug
- dotenv
- express
- link-preview-js
- morgan
- pg
- sendgrid

*Last updated June 23, 2022*