import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentSection = (props) => {

  const [comment, setComment] = useState("");

  const renderComments = props.comments.map((item) => (
    <h5>{item.name}: {item.comment_text} at {item.time}</h5>
  ));

  const commentChange = (e) => {
    setComment(e.target.value);
    console.log(Date.now()/1000);
  };

  const submitHandler = async (e) => {
    const formData = {
      eventId: props.eventId, 
      userId: props.cookies.user.id, 
      time: Math.round(Date.now()/1000), 
      text: comment
    };
    console.log(formData);
    axios.post('/event/comment', formData)
    .then((res) => {
      console.log(res.data);
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