import "./recentComments.css"
import "./comment.css"
import { postComment } from "../../api/api"
import { useFormik } from "formik"
import { MdFormatLineSpacing } from "react-icons/md"
import toast,{Toaster} from "react-hot-toast"
const CommentForm = ({blogId})=>{
const sendComment = async(comment)=>{
    const result = await postComment
}
const formik = useFormik({
    initialValues:{
        author:"",
        body:"",
        date:Date.now(),
        isActive:true,
        blogId:blogId
    },
    onSubmit:async (values)=>{
        const postResult = await postComment(values);
        if(postResult){
           toast.success("Yorumunuz eklendi");
        }
        else {
           toast.error("Yorumunuz eklenemedi");
        }


    }
})
    
    return (
        <form className="comment-form" id="postCommentForm" onSubmit={formik.handleSubmit}>
            <Toaster />
        <div className="comment-form-fields ">
          <input 
          placeholder="Adınızı giriniz ..." 
          id="author"
          onChange={formik.handleChange} 
          value={formik.values.author}
          /><br />
          <textarea 
          placeholder="Yorumunuzu giriniz ..." 
          rows="4"
          id="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          ></textarea>
        </div>
        <div className="comment-div comment-form-actions ">
          <button 
          className="comment-btn" 
          type="submit"
          onClick={formik.handleSubmit}
          >Gönder</button>
        </div>
      </form>
    )
} 
export default CommentForm;