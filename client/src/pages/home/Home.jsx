import React from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"
import Content from "../../components/blog/Content"
export const Home = () => {
  return (
    <>
      {/*  <Slider />*/}
      <Category />
      {/* <Card /> */}
      <Content />
    </>
  )
}
