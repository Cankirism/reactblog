import "./recentComments.css";
import  Comment from "./Comment"
import { useEffect, useState } from "react";
const CommentNodes = (props) => {
  return (
    <Comment
    author={props.comment.author}
    body={props.comment.body}
    key={props.comment.key}
    />
  )
};
export default CommentNodes;
