

import { PenSquare, Trash2 } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, index, onDelete, onComplete, priority, onUpdateTask }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: () => ({ 
            type: 'TASK',
            id: task.id,
            index: index,
            priority: priority
        }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    // Handle animation and spacing during drag
    useEffect(() => {
        if (!ref.current) return;

        if (isDragging) {
            // When dragging starts, collapse the space immediately
            ref.current.style.height = '0';
            ref.current.style.padding = '0';
            ref.current.style.margin = '0';
            ref.current.style.opacity = '0';
        } else {
            // When dragging ends, restore the original dimensions
            ref.current.style.height = 'auto';
            ref.current.style.padding = '0.75rem';
            ref.current.style.margin = '';
            ref.current.style.opacity = task.completed ? '0.5' : '1';
        }
    }, [isDragging, task.completed]);

    drag(ref);

    return (
        <div
            ref={ref}
            data-taskid={task.id}
            className={`task-item transition-all duration-200 ${
                priority === "do_first" ? "bg-do-first" :
                priority === "do_later" ? "bg-do-later" :
                priority === "delegate" ? "bg-delegate" :
                "bg-eliminate"
            } p-3 rounded flex items-center cursor-pointer justify-between ${
                task.completed ? 'opacity-50' : ''
            } ${isDragging ? 'dragging' : ''}`}
        >
            <div className="flex items-center space-x-3">
                <div className="inline-flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                        <input
                            onChange={() => onComplete(task.id)}
                            checked={task.completed}
                            type="checkbox"
                            className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-transparent shadow hover:shadow-md border border-green-700 checked:bg-green-800 checked:border-slate-800"
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                </div>
                <span className={`text-white ${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                </span>
            </div>
            <div className='space-x-2'>
                <button
                    onClick={() => onUpdateTask(task.id)}
                    className="text-blue-500 hover:text-blue-600"
                >
                    <PenSquare className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-500 hover:text-red-600"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Task;