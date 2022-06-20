import axios from "axios";

const acceptInvite = (setInvite, props) => {
  setInvite("yes");
  axios
    .put("/event/response", {
      response: "yes",
      userId: props.cookies.user.id,
      eventId: props.eventId,
    })
    .then((data) => {
      console.log(data);
    });
};

const maybeInvite = (setInvite, props) => {
  setInvite("maybe");
  axios
    .put("/event/response", {
      response: "maybe",
      userId: props.cookies.user.id,
      eventId: props.eventId,
    })
    .then((data) => {
      console.log(data);
    });
};

const rejectInvite = (setInvite, props) => {
  setInvite("no");
  axios
    .put("/event/response", {
      response: "no",
      userId: props.cookies.user.id,
      eventId: props.eventId,
    })
    .then((data) => {
      console.log(data);
    });
};

export { acceptInvite, maybeInvite, rejectInvite }