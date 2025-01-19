import React from "react";
import Modal from "./Modal";

const AddTaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [taskText, setTaskText] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            onSubmit(taskText);
            setTaskText('');
            onClose();
        }
    };


    const handleOnClose = ()=>{
        setTaskText('');
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6" data-tut="enter_input">
                <h2 className="text-2xl mb-2 font-bold">Add New Task</h2>
                <p className="text-gray-300 mb-4">Add your task here.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input


                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        className="w-full border bg-transparent text-white px-4 py-2 rounded"
                        placeholder="Enter task description"
                        autoFocus
                    />

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={handleOnClose} className="px-4 py-2  text-red-600 rounded  font-bold">
                            Close
                        </button>
                        <button type="submit" className={`px-4 py-2 ${taskText.length > 0 ? "bg-modal-btn" : "bg-gray-500"}  text-white rounded hover:bg-yellow-600`}>
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};


export default AddTaskModal