const express = require("express");
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const mongoose = require("mongoose");
const { UploadImage } = require("../utils/UploadImage");

require("dotenv").config();
const apiLimitter = rateLimit({
  windowMs:1000*300,
  max:1,
  message:"Beğendiniz"
})
const app = express();


// const options = [
//     cors({
//         origin:'*'
//     })
// ];

// app.use(options);
app.use(cors());
app.use(express.json({ limit: "300mb" }));

const mongoDBConfig = process.env.MONGODB_URL;
try {
  mongoose.connect(mongoDBConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  handleError(err);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

//#region blog
//blog schema

const blogSchema = mongoose.Schema({
  title: String,
  headerImageUrl: String,
  content: String,
  createdAt: Date,
  categoryId: String,
  category:String,
  isActive: Boolean,
  like:Number
});
const blog = mongoose.model("blog", blogSchema);

//blog get operations
app.get("/api/blog", async (req, res) => {
  try {
    const blogs = await blog.find().sort({ $natural: -1 });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(400).send("hata ", err);
  }
});

//blog post operations

app.post("/api/blog", async (req, res) => {
  try {
    const blogBody = req.body;
    console.log("blog body is ", blogBody);
    const newBlog = new blog(blogBody);
    let result = await newBlog.save();
    console.log(result);
    result = result.toObject();
    if (result) {
      res.status(200).send(result);
    } else {
      throw err;
    }
  } catch (err) {
    console.log("hata oluştuu");
    res.status(200).send(err)
   
  }
});

// blog by id

app.get("/api/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const content = await blog.findOne({ _id: id });
    if (content) {
      res.status(200).send(content);
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).send("hata", err);
  }
});
app.get("/api/like/:id",apiLimitter,async(req,res)=>{
    try{
        const blogId = req.params.id;
        const doc = await blog.findOne({_id:blogId});
        const likesCount = doc.like+1;
        console.log(likesCount);
        const update = await blog.updateOne({_id:blogId},{$set:{"like":likesCount}});
       console.log("update is",update);

        if(update){
         
            res.status(200).send({count:likesCount});
        } 
    }
    catch(err){
        res.status(400).send(err);
    }
})

app.get("/api/likesCount/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    console.log(id);
    const doc = await blog.findOne({_id:id});
    console.log(doc);
    if(doc){
      console.log("aaa");
      res.status(200).send({
        like:doc.like
      });
    }
  }
  catch(err){
    res.status.send(err);
  }

})

//#endregion
//#region imageUpload
app.post("/api/imageUpload", async (req, res) => {
  try {
    let imageUrl = "";

    const image = req.body.image;

    const imageName = new Date().getTime().toString();
    // await Promise.all(
    //    async  ()=>{
    //     console.log("promise içinde ");
    //         const result = await UploadImage(image,imageName);
    //         imageUrl=result;

    //     }

    // )

    const result = await UploadImage(image, imageName);
    imageUrl = result;
    console.log(imageUrl);
    res.status(200).send(imageUrl);
  } catch (err) {
    res.status(400).send("Hata olustu", err);
  }
});

//#endregion
//#region  Comment
const commentSchema = mongoose.Schema({
  author: String,
  body: String,
  date: Date,
  isActive: Boolean,
  blogId: String,

});

const comment = mongoose.model("comment", commentSchema);
app.post("/api/comment", async (req, res) => {
  try {
    console.log("req is", req.body);
    const comm = req.body;
    if (comment) {
      const newComment = new comment(comm);
      let result = await newComment.save();
      result = result.toObject();
      console.log("result is ", result);
      if (result) {
        res.status(200).send(result);
      } else {
        throw new Error("Hata oluştuu. Kayıt eklenemedi");
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id is", id);
    const comments = await comment.find({ blogId: id });
    console.log("comments are", comments);
    if (comments) {
      res.status(200).send(comments);
    } else {
      res.status(200).send(null);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});


//#endregion

//#region  category
const categorySchema = mongoose.Schema({
  name: String,
  isActive: Boolean,
  imgUrl:String
});
const category = mongoose.model("category", categorySchema);
app.post("/api/category", async (req, res) => {
  try {
    const categotyItem = req.body;

    const newCategory = new category(categotyItem);
    let result = await newCategory.save();
    result = result.toObject();

    if (result) {
      res.status(200).send(result);
    } else {
      throw new Error("Kayıt edilemedi");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/category", async (req, res) => {
  try {
    const categories = await category.find();
  
    res.status(200).send(categories);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/category/:id",async(req,res)=>{
    try{
        const categoryId = req.params.id;
        const catgry = await category.findOne({_id:categoryId});

        if(catgry){
            res.status(200).send(catgry)
        }

    }
    catch(err){
        res.status(400).send(err);
    }
})

//#endregion

//#region update area
// app.get("/api/update",async(req,res)=>{
//   try{
//     const result = await blog.updateMany({$set:{like:5}});
//     if(result){
//       res.status(200).send(ok);
//     }
//   }
//   catch(err){
//     res.status(400).send(err);
//   }
// })
//#endregion
//get
app.get("/", async (req, res) => {
  res.status(200).send("OK");
});

//api listen
app.listen("6003", () => console.log("server started at 6003"));
