import React from "react";

const BlogModal = ({ blogModal, setBlogModal }) => {
  const { answer } = blogModal;
  return (
    <div>
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

export default BlogModal;
