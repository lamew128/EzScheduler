import axios from "axios";
import React, { useState } from "react";
import TimeAgo from "timeago-react";
import classes from "./CommentSection.module.css";

const CommentSection = (props) => {
  const [comment, setComment] = useState("");

  const commentChange = (e) => {
    //e.preventDefault();
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      eventId: props.eventId,
      userId: props.cookies.user.id,
      time: Math.round(Date.now() / 1000),
      text: comment,
    };
    axios.post("/event/comment", formData).then((res) => {
      console.log(res.data);
      setComment("");
      props.setChange(true);
    });
  };

  const renderComments = props.comments.map((item) => (
    <>
      <article className={classes.comments_container}>
        <div className={classes.top}>
          <p className={classes.username}>{item.name}:</p>
          <TimeAgo className={classes.time} datetime={item.time * 1000} />
        </div>
        <span className={classes.comment}>{item.comment_text}</span>
      </article>
    </>
  )).reverse();

  return (
    <>
      <form className="text-center m-2 p-0">
        <label>Enter comment:</label>
        <input className={classes.form} type="text" value={comment} onChange={commentChange} />
        <button onClick={submitHandler}>ADD</button>
      </form>
      <>{renderComments}</>
    </>
  );
};

export default CommentSection;

{
  /* <article class = "tweet">
<header>
  <span class="profile-name">
    <img class="tweetpfp" src = ${tweet.user.avatars}>
    <span>${tweet.user.name}</span>
  </span>
  <span class="handler">${tweet.user.handle}</span>
</header>
<div>
  ${escapee(tweet.content.text)}
</div>
<footer>
  <span>${timeago.format(tweet.created_at, Date())}</span>
  <span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-heart"></i>
    <i class="fa-solid fa-retweet"></i>
  </span>
</footer>
</article>`; */
}
