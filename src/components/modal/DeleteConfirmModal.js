import React from "react";
import Modal from "./Modal";
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl mb-2">Confirm Delete</h2>
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete "{itemName}"? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2  text-red-600 rounded font-bold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 bg-modal-btn  text-white rounded hover:bg-yellow-600`}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal