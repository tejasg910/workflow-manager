import { PenSquare, Trash2 } from 'lucide-react';
import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, onDelete, onComplete,  priority, onUpdateTask }) => {

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });



    return (
        <div data-tut="view_task"
            ref={drag}
            className={`${priority === "do_first" ? "bg-do-first" :
                priority === "do_later" ? "bg-do-later" :
                    priority === "delegate" ? "bg-delegate" :
                        "bg-eliminate"} p-3 rounded flex items-center justify-between ${isDragging ? 'opacity-50' : ''
                } ${task.completed ? 'opacity-50' : ''}`}
        >
            <div className="flex items-center space-x-3">
                {/* <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onComplete(task.id)}
                    className="h-4 w-4 rounded"
                /> */}
        <div class="inline-flex items-center">
  <label class="flex items-center cursor-pointer relative">
    <input  onChange={() => onComplete(task.id)}  checked={task.completed} type="checkbox" class="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-transparent shadow hover:shadow-md border border-green-700 checked:bg-green-800 checked:border-slate-800" id="check-custom-style" />
    <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>
    </span>
  </label>
</div>


                <span
                    className={`text-white ${task.completed ? 'line-through' : ''}`}

                >
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