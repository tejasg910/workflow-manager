
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskContainer from './components/TaskContainer';
import PriorityModal from './components/PriorityModal';
import { useLocalStorage, useTaskTour } from './hooks/useLocalStorage';
import 'react-responsive-modal/styles.css';
import AddTaskDialog from './components/modal/AddtaskModal';
import EditTaskModal from './components/modal/EditTaskModal';
import DeleteConfirmModal from './components/modal/DeleteConfirmModal';
import { useTour } from '@reactour/tour';

import "./App.css"
import { useSteps } from './hooks/useSteps';
import Navbar from './components/Navbar';
const App = () => {



  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const { setIsOpen, setCurrentStep, setSteps } = useTour();
  const { showTour } = useTaskTour()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { getSecondPart } = useSteps();


  useEffect(() => {

    console.log(showTour, "This is show router")
    if (!showTour) {


      setIsOpen(true)
    }
  }, [showTour])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isAddModalOpen) {
        e.preventDefault();
        setIsAddModalOpen(true);
        setCurrentStep(2)
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAddModalOpen]);

  const handleAddTask = (text) => {
    setNewTaskText(text);
    setIsAddModalOpen(false);
    setIsPriorityModalOpen(true);
    setCurrentStep(2)

  };

  const handlePrioritySelect = (priority) => {
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setIsPriorityModalOpen(false);




    setSteps(getSecondPart())
    setCurrentStep(0);
  };

  const handleTaskMove = (taskId, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
  };

  const handleTaskDelete = (taskId) => {

    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      // Set the selected task
      setSelectedTask(taskToEdit);
      // Open the modal
      setisDeleteModalOpen(true);
    }
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };


  const handleUpdateTask = (taskId) => {
    // Find the task to edit
    const taskToEdit = tasks.find(task => task.id === taskId);
    console.log(taskToEdit, "this ists task found")
    if (taskToEdit) {
      // Set the selected task
      setSelectedTask(taskToEdit);
      // Open the modal
      setIsEditModalOpen(true);
    }
  };

  const handleEditTask = (updatedTaskText) => {
    if (selectedTask) {
      // Update the task in the tasks array
      const updatedTasks = tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, text: updatedTaskText }
          : task
      );

      // Save updated tasks
      setTasks(updatedTasks);

      // Close modal and reset selected task
      setIsEditModalOpen(false);
      setSelectedTask(null);
    }
  };


  const handleDeleteTask = () => {
    const newTasks = tasks.filter((task) => task.id !== selectedTask?.id);

    console.log(newTasks, "this si new tasks")
    setTasks(newTasks)
  }

  return (
    <>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-900 flex flex-col">


          <div className="flex-1 relative">

            <div className="max-w-full mx-auto h-screen grid grid-cols-2 grid-rows-2 gap-0" data-tut="change_priority">
              <TaskContainer
                title="Do First"
                priority="do_first"
                tasks={tasks.filter(task => task.priority === 'do_first')}
                onTaskMove={handleTaskMove}
                onTaskDelete={handleTaskDelete}
                onTaskComplete={handleTaskComplete}
                onUpdateTask={handleUpdateTask}
              />
              <TaskContainer
                title="Do Later"
                priority="do_later"
                tasks={tasks.filter(task => task.priority === 'do_later')}
                onTaskMove={handleTaskMove}
                onTaskDelete={handleTaskDelete}
                onTaskComplete={handleTaskComplete}
                onUpdateTask={handleUpdateTask}

              />
              <TaskContainer
                title="Delegate"
                priority="delegate"
                tasks={tasks.filter(task => task.priority === 'delegate')}
                onTaskMove={handleTaskMove}
                onTaskDelete={handleTaskDelete}
                onTaskComplete={handleTaskComplete}
                onUpdateTask={handleUpdateTask}

              />
              <TaskContainer
                title="Eliminate"
                priority="eliminate"
                tasks={tasks.filter(task => task.priority === 'eliminate')}
                onTaskMove={handleTaskMove}
                onTaskDelete={handleTaskDelete}
                onTaskComplete={handleTaskComplete}
                onUpdateTask={handleUpdateTask}

              />
            </div>


            <button data-tut="add_task"
              onClick={() => { setIsAddModalOpen(true); setCurrentStep(1) }}
              className="absolute add-task-button left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-4 shadow-lg transition-all z-50 w-12 h-12 flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>

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
              onSubmit={handleEditTask}
              initialTask={selectedTask?.text || ''}
            />
            <DeleteConfirmModal
              isOpen={isDeleteModalOpen}
              onClose={() => setisDeleteModalOpen(false)}
              onConfirm={handleDeleteTask}
              itemName={selectedTask?.text || ''}
            />


            <PriorityModal
              isOpen={isPriorityModalOpen}
              onRequestClose={() => setIsPriorityModalOpen(false)}
              onPrioritySelect={handlePrioritySelect}
            />


          </div>


        </div>
      </DndProvider></>
  );
};




export default App;