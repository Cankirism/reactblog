import React from "react";
import { Card } from "../../components/blog/Card";
import { Category } from "../../components/category/Category";
import Content from "../../components/blog/Content";
import ReactGA from "react-ga4";
export const Home = () => {
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "home",
  });
  return (
    <>
      <Category />
      <Content />
    </>
  );
};
