"use client"

import React, { useEffect } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import Modal from "./modal/Modal"

const priorities = [
  {
    key: "do_first",
    label: "Do first",
    color: "bg-emerald-500",
    shortcut: <ArrowUp className="w-4 h-4" />,
    arrowKey: "ArrowUp"
  },
  {
    key: "do_later",
    label: "Do later",
    color: "bg-teal-500",
    shortcut: <ArrowRight className="w-4 h-4" />,
    arrowKey: "ArrowRight"
  },
  {
    key: "delegate",
    label: "Delegate",
    color: "bg-amber-500",
    shortcut: <ArrowLeft className="w-4 h-4" />,
    arrowKey: "ArrowLeft"
  },
  {
    key: "eliminate",
    label: "Eliminate",
    color: "bg-red-500",
    shortcut: <ArrowDown className="w-4 h-4" />,
    arrowKey: "ArrowDown"
  }
]

const PriorityModal = ({ isOpen, onRequestClose, onPrioritySelect }) => {
  const handleKeyDown = (event) => {
    if (event.shiftKey) {
      const priority = priorities.find(p => p.arrowKey === event.key)
      if (priority) {
        onPrioritySelect(priority.key)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.removeEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-gray-900 rounded-lg p-6 max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">
        Add tasks
      </h2>

      <div className="space-y-4" data-tut="set_priority">
        {priorities.map(({ key, label, color, shortcut }) => (
          <div key={key} className="grid grid-cols-2 gap-4">
            {/* Shortcut button */}
            <button
              onClick={() => onPrioritySelect(key)}
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none flex items-center justify-center gap-2"
              aria-label={`Keyboard shortcut for ${label}`}
            >
              <span className="font-medium">Shift ⇧</span>
              <span>+</span>
              {shortcut}
            </button>

            {/* Action button */}
            <button
              onClick={() => onPrioritySelect(key)}
              className={`${color} text-white px-4 py-2 rounded hover:opacity-90 focus:outline-none text-center`}
              aria-label={`Select ${label}`}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onRequestClose}
        className="mt-6 text-red-500 hover:text-red-400 font-medium"
        aria-label="Close modal"
      >
        CLOSE
      </button>
    </Modal>
  )
}

export default PriorityModal

