import React from "react";

const MyOrdersModal = ({
  title,
  handleDeleteOrder,
  modalData,
  handleCancel,
}) => {
  return (
    <div>
      <input type="checkbox" id="orderdelete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="modal-action">
            <label
              onClick={() => handleDeleteOrder(modalData)}
              htmlFor="orderdelete-modal"
              className="btn"
            >
              Delete
            </label>
            <label
              onClick={handleCancel}
              htmlFor="orderdelete-modal"
              className="btn"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersModal;
