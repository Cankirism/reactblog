import React, { useEffect, useState } from "react";
import "./create.css";
import { useFormik, UseFormik } from "formik";
import FileBase64 from "react-file-base64";
import { createContent, fetchCategories, postImage } from "../../api/api";

import Createmd from "./Createmd";
import FetchCategory from "../category/FetchCategory";
import toast,{ Toaster} from "react-hot-toast";
import { HttpStatusCode } from "axios";
export const Create = () => {
  const [file, setFile] = useState("");
  const [value, setValue] = React.useState("");
  const [content, setContent] = useState("");
  const [summary,setSummary]=useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [hashtags,setHashtags]=useState("");
  const getImage = async (img) => {
    setFile(img);
  };

  const uploadImages = async (image) => {
    const imageresult = await postImage(image);
    console.log("resim sonucu:", imageresult.data);
    return imageresult.data;
  };

  const postBlogItems = async (items,token) => {
    return await createContent(items,token);
  };

  const handleCategory = (id, name) => {
    setCategoryId(id);
    setCategory(name);
    console.log("category id is", id, name);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      headerImageUrl: "",
      content: "",
      createdAt: Date.now(),
      categoryId: "",
      category: "",
      isActive: true,
      hashtags:""
    },
    onSubmit: async (values) => {
      try {
        const blogItems = {
          title: values.header,
          headerImageUrl: "",
          content: content,
          createdAt: Date.now(),
          category: "",
          categoryId: 1,
          isActive: true,
          like:0,
          summary:summary,
          hashtags:hashtags
        };
        const img = {
          image: file.base64,
        };

        const uploadResult = await uploadImages(img);
        const copiedBlogItems = { ...blogItems };
        copiedBlogItems.headerImageUrl = uploadResult;
        copiedBlogItems.categoryId = categoryId;
        copiedBlogItems.category = category;
        const token = localStorage.getItem("token")
        if(!token){
          throw new Error("Yetkisiz işlem");
        }
        else {
          const result = await postBlogItems(copiedBlogItems,token);
         
         
          if(result.status==HttpStatusCode.Ok){
            toast.success("İçerik eklendi");
          }
          else {
          
            throw new Error(result.data.message)
          }
        
        }

        
      } catch (err) {
        toast.error(err.message)
        

      }
    },
  });
  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          <Toaster />
          <form id="blogCreationForm" onSubmit={formik.handleSubmit}>
            <div className="img ">
              <h5 className="strong"> Resim Yükleme</h5>
              <FileBase64 multiple={false} onDone={getImage.bind(this)} />
            </div>
            <img src={file.base64} />
            <br />

            <input
              type="text"
              placeholder="başlık"
              id="header"
              onChange={formik.handleChange}
              value={formik.values.header}
            />

            <textarea
              rows="30"
              placeholder="blog içeriğini yazınız"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
              <textarea
              rows="30"
              placeholder="Summary"
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
            <textarea
              rows="30"
              placeholder="Hastags"
              onChange={(e) => setHashtags(e.target.value)}
            ></textarea>
            

            <Createmd content={content} />
            <FetchCategory
              handleCategory={(id, name) => handleCategory(id, name)}
            />
            <button
              className="button"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Kaydet
            </button>
          </form>
        </div>
        <div className="container"></div>
      </section>
    </>
  );
};
