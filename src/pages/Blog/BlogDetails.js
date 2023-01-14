import React from "react";

const BlogDetails = ({ question, setBlogModal }) => {
  const { img, question: ques } = question;
  return (
    <div>
      <div className="card w-72 h-96 bg-[#BCE1F9] dark:bg-black dark:border shadow-xl my-10 mx-auto">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <p className="dark:text-white">{ques}</p>
          <div className="card-actions ">
            <label
              htmlFor="blogDetails"
              onClick={() => setBlogModal(question)}
              className="btn btn-primary w-full"
            >
              See Answer
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
