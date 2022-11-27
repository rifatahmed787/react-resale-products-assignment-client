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
          <h3 className="font-bold text-lg text-center">{title}</h3>
          <div className="modal-action flex justify-center">
            <label
              onClick={() => handleDeleteOrder(modalData)}
              htmlFor="orderdelete-modal"
              className="btn btn-sm btn-error"
            >
              Delete
            </label>
            <label
              onClick={handleCancel}
              htmlFor="orderdelete-modal"
              className="btn btn-sm btn-primary"
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
