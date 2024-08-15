import "./recentComments.css"
const Comment = (props)=>{
    return(
        <div className="comment">
          <p className="comment-header">{props.author}</p>
          <p className="comment-body">- {props.body}</p>
          <div className="comment-footer">
            {/* <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a> */}
          </div>
        </div>
      );
}
export default Comment;