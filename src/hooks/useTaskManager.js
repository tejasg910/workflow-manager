import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false,
      order: tasks.filter(t => t.priority === priority).length // Add order field
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (draggedTaskId, targetPriority, targetIndex) => {
    setTasks(prevTasks => {
        const draggedTask = prevTasks.find(task => task.id === draggedTaskId);
        if (!draggedTask) return prevTasks;

        const newTasks = prevTasks.filter(task => task.id !== draggedTaskId);
        
        // Find current index and priority
        const sourceIndex = prevTasks.findIndex(task => task.id === draggedTaskId);
        const sourcePriority = draggedTask.priority;

        // Create updated task with new priority
        const updatedTask = {
            ...draggedTask,
            priority: targetPriority,
        };

        // Insert task at new position
        newTasks.splice(targetIndex, 0, updatedTask);

        // Update order for all tasks in affected priority sections
        return newTasks.map((task, index) => ({
            ...task,
            order: index
        }));
    });
};

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (taskId, updatedText) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: updatedText } : task
    ));
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    addTask,
    moveTask,
    deleteTask,
    toggleTaskComplete,
    updateTask
  };
};