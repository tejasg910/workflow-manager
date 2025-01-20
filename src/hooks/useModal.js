import { useEffect, useState } from 'react';

export const useModals = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isAnyModalOpen = isAddModalOpen || isPriorityModalOpen || isEditModalOpen || isDeleteModalOpen;

  // Space key handler for add modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isAnyModalOpen) {
        e.preventDefault();
        setIsAddModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnyModalOpen]); // Depend on isAnyModalOpen instead of just isAddModalOpen
  return {
    isAddModalOpen,
    setIsAddModalOpen,
    isPriorityModalOpen,
    setIsPriorityModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isAnyModalOpen
  };
};
