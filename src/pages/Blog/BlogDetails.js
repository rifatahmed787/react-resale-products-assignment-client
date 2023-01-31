import React from "react";
import "./Blog.css";

const BlogDetails = ({ question, setBlogModal }) => {
  const { img, question: ques } = question;
  return (
    <div>
      <div className="card w-72 h-96 dark:bg-black dark:border shadow-xl my-10 mx-auto">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <p className="dark:text-white">{ques}</p>
          <div className="card-actions ">
            <label
              htmlFor="blogDetails"
              onClick={() => setBlogModal(question)}
              className="custom-btn-1 btn-1 mx-auto"
            >
              <span className="text-center">See Answer</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
