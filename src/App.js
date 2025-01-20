import React, { useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import { useSteps } from './hooks/useSteps';
import { useTaskManager } from './hooks/useTaskManager';
import { useModals } from './hooks/useModal';
import { TaskBoard } from './components/Taskboard';
import { AddTaskButton } from './components/AddTaskButton';
import Navbar from './components/Navbar';
import AddTaskDialog from './components/modal/AddtaskModal';
import EditTaskModal from './components/modal/EditTaskModal';
import DeleteConfirmModal from './components/modal/DeleteConfirmModal';
import PriorityModal from './components/PriorityModal';
import { useTaskTour } from './hooks/useLocalStorage';

const App = () => {
  const [newTaskText, setNewTaskText] = useState('');
  const { setIsOpen, setCurrentStep, setSteps } = useTour();
  const { showTour } = useTaskTour();
  const { getSecondPart } = useSteps();

  const {
    tasks,
    selectedTask,
    setSelectedTask,
    addTask,
    moveTask,
    deleteTask,
    toggleTaskComplete,
    updateTask
  } = useTaskManager();

  const {
    isAddModalOpen,
    setIsAddModalOpen,
    isPriorityModalOpen,
    setIsPriorityModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen
  } = useModals();

  useEffect(() => {
    if (!showTour) {
      setIsOpen(true);
    }
  }, [showTour, setIsOpen]);



  const handleAddTask = (text) => {
    setNewTaskText(text);
    setIsAddModalOpen(false);
    setIsPriorityModalOpen(true);
    setCurrentStep(2);
  };

  const handlePrioritySelect = (priority) => {
    addTask(newTaskText, priority);
    setIsPriorityModalOpen(false);
    setSteps(getSecondPart());
    setCurrentStep(0);
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 relative">
          <TaskBoard
            tasks={tasks}
            onTaskMove={moveTask}
            onTaskDelete={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              setSelectedTask(task);
              setIsDeleteModalOpen(true);
            }}
            onTaskComplete={toggleTaskComplete}
            onUpdateTask={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              setSelectedTask(task);
              setIsEditModalOpen(true);
            }}
          />

          <AddTaskButton
            onClick={() => {
              setIsAddModalOpen(true);
              setCurrentStep(1);
            }}
          />

          <AddTaskDialog
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddTask}
          />

          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedTask(null);
            }}
            onSubmit={(updatedText) => {
              if (selectedTask) {
                updateTask(selectedTask.id, updatedText);
                setIsEditModalOpen(false);
                setSelectedTask(null);
              }
            }}
            initialTask={selectedTask?.text || ''}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            itemName={selectedTask?.text || ''}
          />

          <PriorityModal
            isOpen={isPriorityModalOpen}
            onRequestClose={() => setIsPriorityModalOpen(false)}
            onPrioritySelect={handlePrioritySelect}
          />
        </div>
      </div>
    </>
  );
};

export default App;