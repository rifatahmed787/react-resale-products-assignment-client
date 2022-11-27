import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import TitleHook from "../../Hooks/TitleHook";
import Loading from "../shared/Loading";
import BlogDetails from "./BlogDetails";
import BlogModal from "./BlogModal";

const Blog = () => {
  const [blogModal, setBlogModal] = useState(null);
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
    return <Loading></Loading>;
  }
  return (
    <section>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 ">
        {questions.map((question) => (
          <BlogDetails
            key={question._id}
            question={question}
            setBlogModal={setBlogModal}
          ></BlogDetails>
        ))}
      </div>
      <div>
        {blogModal && (
          <BlogModal
            blogModal={blogModal}
            setBlogModal={setBlogModal}
          ></BlogModal>
        )}
      </div>
    </section>
  );
};

export default Blog;
