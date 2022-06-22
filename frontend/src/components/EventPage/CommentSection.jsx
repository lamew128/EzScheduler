import axios from "axios";
import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import classes from "./CommentSection.module.css";

const CommentSection = (props) => {
  const [comment, setComment] = useState("");

  const commentChange = (e) => {
    //e.preventDefault();
    setComment(e.target.value);
  };

  const deleteComment = (commentId) => {
    console.log("Comment id: ", commentId);
    axios.delete(`/event/comment/${commentId}`).then((res) => {
      console.log(res.data);
      props.setChange(true);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Please fill out the field!");
      return;
    }
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

  const openUrl = (url) => {
    window.location = url;
  };

  const renderComments = props.comments
    .map((item, index) => (
      <article key={index} className={classes.comments_container}>
        <span className={`${classes.username}`}>{item.name}: </span>
        <br />
        <span className={`${classes.comment}`}>{item.comment_text}</span>

        {item.preview && (
          <div
            className={classes.previewContainer}
            onClick={() => openUrl(item.preview.url)}
          >
            <div className={classes.previewImageContainer}>
              <img
                className={classes.previewImage}
                src={item.preview.images[0]}
                alt={"Img"}
              ></img>
            </div>
            <div className={classes.previewSite}>{item.preview.siteName}</div>
            <div className={classes.previewTitle}>{item.preview.title}</div>
            <div className={classes.previewDescription}>
              {item.preview.description}
            </div>
          </div>
        )}

        <br />
        <div className="row">
          <TimeAgo
            className={`${classes.time} col`}
            datetime={item.time * 1000}
          />
          {item.user_id === props.cookies.user.id && (
            <button
              className={`${classes.btn} ${classes.delete_comment}`}
              onClick={() => deleteComment(item.comment_id)}
            >
              delete
            </button>
          )}
        </div>
      </article>
    ))
    .reverse();

  return (
    <>
      <form className="text-center m-2 p-0">
        <label>Enter comment:</label>
        <input
          className={classes.form}
          type="text"
          value={comment}
          onChange={commentChange}
        />
        <button className={classes.btn} onClick={submitHandler}>
          ADD
        </button>
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
