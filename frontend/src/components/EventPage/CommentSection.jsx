import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentSection = (props) => {

  const [comment, setComment] = useState("");

  const renderComments = props.comments.map((item) => (
    <h5>{item.name}: {item.comment_text} at {item.time}</h5>
  ));

  const commentChange = (e) => {
    //e.preventDefault();
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      eventId: props.eventId, 
      userId: props.cookies.user.id, 
      time: Math.round(Date.now()/1000), 
      text: comment
    };
    axios.post('/event/comment', formData)
    .then((res) => {
      console.log(res.data);
      setComment("");
      props.setChange(true);
    })
  }

  return (
    <>
      <div>comments</div>
      <>{renderComments}</>
      <form>
        <label>Enter comment:</label>
        <input type="text" value={comment} onChange={commentChange} />
        <button onClick={submitHandler}>
            ADD
        </button>
      </form>
    </>
  )
}

export default CommentSection;