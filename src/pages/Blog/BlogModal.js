import React from "react";

const BlogModal = ({ blogModal, setBlogModal }) => {
  const { answer } = blogModal;
  return (
    <div>
      <input type="checkbox" id="blogDetails" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-black">
          <h3 className="font-bold text-lg dark:text-white">
            Here is your answer:
          </h3>
          <p className="py-4 dark:text-white">{answer}</p>
          <div className="modal-action">
            <label
              htmlFor="blogDetails"
              className="btn btn-sm bg-[rgb(4,141,196)] hover:bg-[rgb(4,141,196)] border-none"
            >
              Got it
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
