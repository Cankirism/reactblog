const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const mongoose = require("mongoose");
const { UploadImage } = require("../utils/UploadImage");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const apiLimitter = rateLimit({
  windowMs: 1000 * 60,
  max: 1,
  message: "Beğendiniz",
});
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
  category: String,
  isActive: Boolean,
  like: Number,
  summary:String,
  hashtags:String
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
    const tokenInfo = req.headers['authorization'].split(" ")[1];
    console.log(req.headers);
    console.log("token is",tokenInfo)
    if(tokenInfo===null ||tokenInfo===undefined){
      console.log("token geçersiz");
      throw new Error("Yetkisiz İşlem")
    }
   await verifyToken(tokenInfo)
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
  
    res.status(400).send({
      status:"error",
      message:err.message
    });
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
app.get("/api/like/:id", apiLimitter, async (req, res) => {
  try {
    const blogId = req.params.id;
    const doc = await blog.findOne({ _id: blogId });
    const likesCount = doc.like + 1;
    console.log(likesCount);
    const update = await blog.updateOne(
      { _id: blogId },
      { $set: { like: likesCount } }
    );
    console.log("update is", update);

    if (update) {
      res.status(200).send({ count: likesCount });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/api/likesCount/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const doc = await blog.findOne({ _id: id });
    console.log(doc);
    if (doc) {
      console.log("aaa");
      res.status(200).send({
        like: doc.like,
      });
    }
  } catch (err) {
    res.status.send(err);
  }
});

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
  imgUrl: String,
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

app.get("/api/category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const catgry = await category.findOne({ _id: categoryId });

    if (catgry) {
      res.status(200).send(catgry);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

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

//#region login and token operations
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: Boolean,

});

const User = mongoose.model("users", userSchema);

// app.post("/api/signup", async (req, res) => {
//   try {

//     const email = req.body.email;
//     const password = req.body.password;
//     const result = await createUser(email, password);

//     if (result) {
//       res.status(200).send({
//         status: "success",
//         message: "user created successfully",
//       });
//     } else {
//       throw new Error();
//     }
//   } catch (err) {
//     if (err.code === 11000) {
//       res.status(400).send({
//         status: "error",
//         message: "user email already exist",
//       });
//     }
//     res.status(400).send({
//       status: "error",
//       message: err.message,
//     });
//   }
// });

// const createUser = async (email, password) => {
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(10);

//   const pass = await bcrypt.hash(password, salt);
//   const newUser = new User({
//     email: email,
//     password: pass,
//     isActive: true,
//   });
//   const result = await newUser.save();
//   if (result) {
//     return result;
//   }
//   throw err;
// };


app.post("/api/login", async (req, res) => {
  try {
    
    const { email, password } = req.body;
    const result = await verifyUser(email, password);
    if (result.status === "success") {
      res.status(200).send({
        status: "success",
        token: result.accessToken,
      });
    } else throw new Error(result.message);
  } catch (err) {
    res.status(400).send({
      status: "login error",
      message: err.message,
    });
  }
});


const sercret_key="AuerjkAAKKDKMD__?SKFJNFDS"
const verifyUser = async (username, password) => {
  console.log("meil is", username);
  const searchedUser = await User.findOne({ email: username });
  if (!searchedUser) {
    return {
      status: "error",
      message: "User not found",
    };
  }
  if (await bcrypt.compare(password, searchedUser.password)) {
    token = await jwt.sign(
     
      {
        id: searchedUser._id,
        username: searchedUser.email,
        type: "user",
       // expiration:Math.floor(Date.now()/1000)+(60*60)
      },
      sercret_key,
      {
        expiresIn:'1h'
      }
      
    );
    return {
      status: "success",
      accessToken: token,
    };
  }
  return {
    status: "error",
    message: "invalid username or password",
  };
};

const verifyToken =async (token)=>{
  jwt.verify(token,sercret_key,(error,decodedData)=>{
    if(error){
      throw new Error(error);
    }
    else {
      return decodedData;
    }
  })


}

//#endregion
//get
app.get("/", async (req, res) => {
  res.status(200).send("OK");
});

//api listen
app.listen("6003", () => console.log("server started at 6003"));
