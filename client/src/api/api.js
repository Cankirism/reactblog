import axios from "axios";

//const baseUrl = "http://localhost:6003/api";
const baseUrl="https://reactblog-backend.vercel.app/api"
const api = axios.create({
    baseURL:baseUrl
});

// fetch all blog 
export const getBlogs = async()=>{
    return api.get("/blog");
}
//post blog 
export const createContent = async(blogContent,token)=>{
 
        console.log("api kısmı token is ",token)
     return  api.post("/blog",blogContent,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).catch((err)=>
         err.response
        )
       
    }

// fetch blog by id 

export const fetchBlog=async(id)=>{
    return api.get(`/blog/${id}`);
}

// uplaod image 
export const postImage =async(image)=>{
    return api.post("/imageUpload",image)
}
export const postComment =async(comment)=>{
    return api.post("/comment",comment);

}
export const fetchComments =async(blogId)=>{
    return api.get(`/comment/${blogId}`);

}
export const fetchCategories = async()=>{
    return api.get("/category");
}
export const postCategory = async(category)=>{
    return api.post("/category",category);
}
export const fetchCategoryById=async(id)=>{
    return api.get(`/category/${id}`);
}
export const likePost =async(id)=>{
    return api.get(`/like/${id}`);
}
export const fetchLikeCount =async(id)=>{
    return api.get(`/likesCount/${id}`);
}
export const login =async(loginBody)=>{
    return api.post("/login",loginBody)
}