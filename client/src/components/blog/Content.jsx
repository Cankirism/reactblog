import React, { useEffect, useState } from "react";
import "./blog.css";
import { fetchCategoryById, getBlogs } from "../../api/api";
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineLike,
} from "react-icons/ai";
import { Link } from "react-router-dom";
const Content = () => {

    const [blog,setBlog]=useState([]);
    const [category,setCategory]=useState("");
    useEffect(()=>{
        const fetchBlog = async()=>{
            const result = await getBlogs();
           
            setBlog(result.data);
           // fetchCategory(result.data.categoryId);
        }
      //   const fetchCategory = async(id)=>{
      //     debugger;

      //     const result = await fetchCategoryById(id)
      //  console.log("kategori id is",blog.categoryId)
      //     if(result){
      //       setCategory(result.data.name);
      //     }
      //   }
        fetchBlog();
       

    },[]
)
  return (
    <>
      <section className="blog">
        <div className="container grid3">
          {blog.map((item) => (
            <div className="box boxItems" key={item._id}>
              <div className="img">
                <img src={item.headerImageUrl} alt="" />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{item.category}</a>
                </div>
                <Link to={`/details/${item._id}`} className="link">
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.content.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{" "}
                  <label htmlFor="">{item.createdAt.split("T")[0]}</label>
                  {/* <AiOutlineComment className="icon" />{" "}
                  <label htmlFor="">27</label> */}
                  <AiOutlineLike className="icon" />
                  <label>{item.like}</label>
                  <AiOutlineShareAlt className="icon" />{" "}
                  <label htmlFor="">Paylaş</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default Content;
