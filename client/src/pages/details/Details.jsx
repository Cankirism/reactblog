import React, { useState,useEffect } from "react"
import "./details.css"
import "../../components/header/header.css"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams } from "react-router-dom";
import { fetchBlog, likePost } from "../../api/api";
import Mdviever from "../../components/mdViewer/Mdviewer"
import RecentComments from "../../components/comments/RecentComments"
import { AiFillLike } from "react-icons/ai"
import Likes from "../../components/blog/Likes"
import Share from "./share/Share"
const Details = () => {
  const [blog, setBlog] = useState(null);
  const [likes,setLikes]=useState(0);
  const { id } = useParams();
  
  useEffect(() => {
    console.log("details page")
    const fetchBlogById = async () => {
       
      const content = await fetchBlog(id);
      if (content) {
        setBlog(content.data);
       setLikes(content.data.like)
       
      }
    };

    
    fetchBlogById()
  }, []);

 

  return (
    <>
      {blog ? (
        <section className="singlePage">
          <div className="container">
            <div >
              <img 
              className="header-img"
               src={blog.headerImageUrl} 
               alt=""
             
              
             />
            </div>
            <div className="right">
              <div className="buttons">
                <button className="button">
                  <BsPencilSquare />
                </button>
                <button className="button">
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{blog.title}</h1>
              <p>
                <Mdviever content = {blog.content} />
              </p>
              <p>Yazar: <b>Faruk GÜNGÖR</b>  {blog.createdAt.split("T")[0]} tarihinde oluşturuldu</p>
              <p>
           <Likes id={blog._id} likes={blog.like} />
              </p>
              <Share item={blog} />

              
             
            </div>
          </div>
        </section>
      ) : null}
       {/* <CreateComment /> */}
       <RecentComments blogId={id} />
       
      
    </>
   
  );
};

export default Details;
