import "./recentComments.css";
import CommentNodes from "./CommentNodes";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { fetchComments } from "../../api/api";
import { HttpStatusCode } from "axios";
const RecentComments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const result = await fetchComments(blogId);
    if (result.status == HttpStatusCode.Ok) {
      setComments(result.data);
    }
  };

  return (
    <div className="comment-box">
      <h5>Yorum yap</h5>
      <CommentForm blogId={blogId} />

      <h5>Yorumlar</h5>
      <h4 className="comment-count">{comments.length} Yorum</h4>
      <div className="comment-list">
        {comments.map((com) => (
          <CommentNodes comment={com} />
        ))}
      </div>
    </div>
  );
};
export default RecentComments;
