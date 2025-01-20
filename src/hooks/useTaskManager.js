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
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (taskId, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    ));
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
