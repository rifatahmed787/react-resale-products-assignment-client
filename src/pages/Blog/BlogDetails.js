import React from "react";

const BlogDetails = ({ question }) => {
  const { img, question: ques, answer } = question;
  return (
    <div>
      <div className="card w-96 bg-[#BCE1F9] shadow-xl my-10 mx-auto">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <p>{ques}</p>
          <div className="card-actions ">
            <label htmlFor="blogDetails" className="btn btn-primary w-full">
              See Answer
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="blogDetails" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Here is your answer:</h3>
          <p className="py-4">{answer}</p>
          <div className="modal-action">
            <label htmlFor="blogDetails" className="btn">
              Got it
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
