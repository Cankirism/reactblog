import { useEffect,useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { fetchLikeCount, likePost } from "../../api/api";
import "./likes.css"
const Likes = ({ id, handleLikes,likes }) => {
  const [like, setLike] = useState(0);
  useEffect(()=>{
    fetchLike(likes);
    console.log("useeffect çalıştı",like)
  },[])
  const handleLike = async () => {
    const res = await likePost(id);
    fetchLike(res.data.count);
    console.log("likesCOunt is",res.data.count)
  };

  const fetchLike = async(count)=>{
    // const result = await fetchLikeCount(id);
    // if(result){
    //   setLike(result.data.like);
    // }
    setLike(count);

  }
  return (
    <p>
      <AiOutlineLike
        className="icon"
        fontSize="16px"
       
      />
      {""}
      <label>{` ${like} kişi beğendi`}</label>
      <button className="likes-btn"  
      onClick={async () => await handleLike(like)}>Beğen</button>
    </p>
  );
};
export default Likes;
