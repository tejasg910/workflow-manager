import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const TaskContainer = ({ title, priority, tasks, onTaskMove, onTaskDelete, onTaskComplete, onUpdateTask }) => {
    const containerRef = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        hover: (draggedItem, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;
            
            const container = containerRef.current;
            if (!container) return;
            
            const mouseY = monitor.getClientOffset()?.y || 0;
            const tasks = Array.from(container.querySelectorAll('.task-item:not(.dragging)'));
            
            // Reset positions
            tasks.forEach(task => {
                task.style.transform = '';
            });

            // Find target position
            let targetIndex = tasks.length;
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                const rect = task.getBoundingClientRect();
                const middle = rect.top + rect.height / 2;

                if (mouseY < middle) {
                    targetIndex = i;
                    break;
                }
            }

            // Move tasks to make space
            if (targetIndex < tasks.length) {
                const targetTask = tasks[targetIndex];
                const taskHeight = targetTask.offsetHeight;
                
                for (let i = targetIndex; i < tasks.length; i++) {
                    const task = tasks[i];
                    task.style.transform = `translateY(${taskHeight}px)`;
                }
            }
        },
        drop: (draggedItem, monitor) => {
            const container = containerRef.current;
            if (!container) return;

            const mouseY = monitor.getClientOffset()?.y || 0;
            const tasks = Array.from(container.querySelectorAll('.task-item:not(.dragging)'));
            let targetIndex = tasks.length;

            // Reset all transforms
            tasks.forEach(task => {
                task.style.transform = '';
            });

            // Find drop position
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                const rect = task.getBoundingClientRect();
                const middle = rect.top + rect.height / 2;

                if (mouseY < middle) {
                    targetIndex = i;
                    break;
                }
            }

            onTaskMove(draggedItem.id, priority, targetIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true })
        })
    });

    return (
        <div
            id={`container-${priority}`}
            ref={(element) => {
                containerRef.current = element;
                drop(element);
            }}
            className={`bg-[#121212] border border-gray-400 h-full p-4 flex flex-col transition-all duration-200 ${
                isOver ? 'border-2 border-green-500' : ''
            }`}
        >
            <h2 className={`text-xl font-bold mb-4 flex-shrink-0 ${
                priority === "do_first" ? "text-do_first-text" :
                priority === "do_later" ? "text-do_later-text" :
                priority === "delegate" ? "text-delegate-text" :
                "text-eliminate-text"
            }`}>{title}</h2>
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="flex flex-col gap-2">
                    {tasks
                        .sort((a, b) => a.order - b.order)
                        .map((task, index) => (
                            <Task
                                key={task.id}
                                index={index}
                                task={task}
                                onDelete={onTaskDelete}
                                onComplete={onTaskComplete}
                                onUpdateTask={onUpdateTask}
                                priority={priority}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TaskContainer;