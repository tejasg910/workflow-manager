import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const TaskContainer = ({ title, priority, tasks, onTaskMove, onTaskDelete, onTaskComplete,  onUpdateTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => onTaskMove(item.id, priority),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div
            ref={drop}
            className={`bg-[#121212] border border-gray-400 h-full  p-4  ${isOver ? 'border-2 border-green-500' : ''}`}
        >
            <h2 className={`text-xl font-bold mb-4 ${priority === "do_first" ? "text-do_first-text" :
                priority === "do_later" ? "text-do_later-text" :
                    priority === "delegate" ? "text-delegate-text" :
                        "text-eliminate-text"}`}>{title}</h2>
            <div className="space-y-2 overflow-y-auto max-h-[calc(100%-4rem)]">
                {tasks.map(task => (
                    <Task
                    onUpdateTask={onUpdateTask}
                        key={task.id}
                        task={task}
                        onDelete={onTaskDelete}
                        onComplete={onTaskComplete}
                        priority={priority}
                    />
                ))}
            </div>
        </div>
    );
};


export default TaskContainer