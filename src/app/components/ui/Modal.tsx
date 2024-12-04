import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  materials: Array<{ id: string; title: string }>;
  handleMaterialClick: (id: number)=> void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, materials, handleMaterialClick }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-2 rounded shadow-lg w-3/4 h-3/4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center gap-2">
          <h2 className="text font-bold ps-2">Semua Materi</h2>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
            x
          </button>
        </div>
        <div className="mt-2 p-2">
          <ul>
            {materials.map((material) => (
              <li
                key={material.id}
                className="p-2 border border-green-500 mb-1 text-sm cursor-pointer hover:bg-green-500 hover:text-white"
                onClick={() => handleMaterialClick(Number(material.id))} // Add click event for navigation
              >
                {material.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
