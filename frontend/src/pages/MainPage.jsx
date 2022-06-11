import React from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import axios from "axios";
import EventItem from '../components/EventItem/EventItem'

const MainPage = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get("/users/test").then((data) => {
  //     setUsers(data.data);
  //   });
  // }, []);

  return (
    <>
      <Button>Create new event!</Button>
      <UpcomingEvents />
      <h3>My Events</h3>
      <EventItem choice={'accepted'}/>
      <EventItem choice={'maybe'}/>
      <EventItem choice={'rejected'}/>
    </>
  );
};

export default MainPage;
