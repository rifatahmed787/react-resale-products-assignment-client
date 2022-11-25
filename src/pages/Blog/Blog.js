import { useQuery } from "@tanstack/react-query";
import React from "react";
import TitleHook from "../../Hooks/TitleHook";
import Loading from "../shared/Loading";
import BlogDetails from "./BlogDetails";

const Blog = () => {
  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/questions");
      const data = await res.json();
      return data;
    },
  });

  TitleHook("Blog");

  if (isLoading) {
    <Loading></Loading>;
  }
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-1 ">
      {questions.map((question) => (
        <BlogDetails key={question._id} question={question}></BlogDetails>
      ))}
    </div>
  );
};

export default Blog;
