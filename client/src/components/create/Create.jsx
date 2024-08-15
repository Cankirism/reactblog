import React, { useEffect, useState } from "react";
import "./create.css";
import { useFormik, UseFormik } from "formik";
import FileBase64 from "react-file-base64";
import { createContent, fetchCategories, postImage } from "../../api/api";

import Createmd from "./Createmd";
import FetchCategory from "../category/FetchCategory";
export const Create = () => {
  const [file, setFile] = useState("");
  const [value, setValue] = React.useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const getImage = async (img) => {
    setFile(img);
  };

  const uploadImages = async (image) => {
    const imageresult = await postImage(image);
    console.log("resim sonucu:", imageresult.data);
    return imageresult.data;
  };

  const postBlogItems = async (items) => {
    await createContent(items);
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
        };
        const img = {
          image: file.base64,
        };

        const uploadResult = await uploadImages(img);
        const copiedBlogItems = { ...blogItems };
        copiedBlogItems.headerImageUrl = uploadResult;
        copiedBlogItems.categoryId = categoryId;
        copiedBlogItems.category = category;
        const postBlogResult = await postBlogItems(copiedBlogItems);
        if (postBlogResult) {
          alert("blog yüklendi");
        }
      } catch (err) {
        console.log("post ederkeb hata", err);
      }
    },
  });
  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
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
