import React, { useState, useEffect } from "react";
import "../../pages/details/details.css";
import "../../components/header/header.css";
import img from "../../assets/images/b5.jpg";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../../api/api";
import ReactMarkdown from "react-markdown";
import Codesyntax from "../codesyntax/Codesyntax"
const Mdviever = ({content}) => {
  return (
    <ReactMarkdown
      children={content}
      components={{
        code({ node, inline, children, className, ...props }) {
          return <Codesyntax children={children} {...props} />;
        },
      }}
    />
  );
};

export default Mdviever;
