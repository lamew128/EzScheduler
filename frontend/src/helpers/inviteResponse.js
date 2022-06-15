import axios from "axios";

export function acceptInvite (setInvite, props){
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

export function maybeInvite(setInvite, props) {
  setInvite("maybe");
  // Axios request to send response MAYBE
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

export function rejectInvite (setInvite, props){
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

// export { acceptInvite, maybeInvite, rejectInvite }