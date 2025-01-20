import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskContainer from './TaskContainer';
import { PRIORITIES, PRIORITY_TITLES } from '../lib/constants';

export const TaskBoard = ({ tasks, onTaskMove, onTaskDelete, onTaskComplete, onUpdateTask }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-full mx-auto h-screen grid grid-cols-2 grid-rows-2 gap-0" data-tut="change_priority">
        {Object.values(PRIORITIES
        ).map(priority => (
          <TaskContainer
            key={priority}
            title={PRIORITY_TITLES[priority]}
            priority={priority}
            tasks={tasks.filter(task => task.priority === priority)}
            onTaskMove={onTaskMove}
            onTaskDelete={onTaskDelete}
            onTaskComplete={onTaskComplete}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};