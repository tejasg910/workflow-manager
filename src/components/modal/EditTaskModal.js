import React, { useEffect } from "react";
import Modal from "./Modal";
const EditTaskModal = ({ isOpen, onClose, onSubmit, initialTask }) => {
  const [taskText, setTaskText] = React.useState("");
  useEffect(() => {
    setTaskText(initialTask)
  }, [initialTask])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onSubmit(taskText);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl mb-2">Edit Task</h2>
        <p className="text-gray-300 mb-4">Update your task details below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="w-full bg-transparent border text-white px-4 py-2 rounded"
            autoFocus
          />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 font-bold text-red-600 rounded ">
              Close
            </button>
            <button type="submit" className={`px-4 py-2 ${taskText.length > 0 ? "bg-modal-btn" : "bg-gray-500"}  text-white rounded hover:bg-yellow-600`}>
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};


export default EditTaskModal