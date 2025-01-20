import React from 'react';

export const AddTaskButton = ({ onClick }) => (
  <button
    data-tut="add_task"
    onClick={onClick}
    className="absolute add-task-button left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-4 shadow-lg transition-all z-50 w-12 h-12 flex items-center justify-center"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  </button>
);