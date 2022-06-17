import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentSection = (props) => {

  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");


  const commentChange = (e) => {
    //e.preventDefault();
    setComment(e.target.value);
  };

  const replyChange = (e) => {
    //e.preventDefault();
    setReply(e.target.value);
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

  const replyHandler = (commentId) => {
    const formData = {
      userId: props.cookies.user.id,
      commentId: commentId, 
      time: Math.round(Date.now()/1000), 
      text: reply
    };
    axios.post('/event/reply', formData)
    .then((res) => {
      setReply("");
      props.setChange(true);
    })
  }

  const renderComments = props.comments.map((item) => (
    <>
      <h5>{item.name}: {item.comment_text} at {item.time}</h5>
      {item.reply.length > 0 && <h6>replies:</h6>}
      <>{item.reply.map((re) => (<h6>{re.name}: {re.reply_text} at {re.time}</h6>))}</>
      <label>Enter reply:</label>
      <input type="text" value={reply} onChange={replyChange} />
      <button onClick={() => replyHandler(item.comment_id)}>
            REPLY
      </button>
    </>
  ));

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