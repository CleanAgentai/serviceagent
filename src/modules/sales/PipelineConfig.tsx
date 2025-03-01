import React, { useState, useRef } from 'react';
import { X, Save, Plus, Trash, GripVertical, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export interface PipelineStage {
  id: string;
  name: string;
  description?: string;
  color?: string;
  order: number;
}

interface PipelineConfigProps {
  isOpen: boolean;
  onClose: () => void;
  stages: PipelineStage[];
  onSave: (stages: PipelineStage[]) => void;
}

const DEFAULT_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-orange-500',
];

const PipelineConfig: React.FC<PipelineConfigProps> = ({
  isOpen,
  onClose,
  stages,
  onSave
}) => {
  const [currentStages, setCurrentStages] = useState<PipelineStage[]>([...stages].sort((a, b) => a.order - b.order));
  const [draggedStage, setDraggedStage] = useState<string | null>(null);
  const [newStageName, setNewStageName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dragOverItemRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleDragStart = (stageId: string) => {
    setDraggedStage(stageId);
  };

  const handleDragEnter = (index: number) => {
    dragOverItemRef.current = index;
  };

  const handleDragEnd = () => {
    if (draggedStage && dragOverItemRef.current !== null) {
      const draggedIndex = currentStages.findIndex(stage => stage.id === draggedStage);
      const newStages = [...currentStages];
      const draggedItem = newStages[draggedIndex];
      
      // Remove the dragged item
      newStages.splice(draggedIndex, 1);
      
      // Insert at the new position
      newStages.splice(dragOverItemRef.current, 0, draggedItem);
      
      // Update order values
      const updatedStages = newStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
      
      setCurrentStages(updatedStages);
    }
    
    setDraggedStage(null);
    dragOverItemRef.current = null;
  };

  const handleAddStage = () => {
    if (!newStageName.trim()) {
      setError('Please enter a stage name');
      return;
    }
    
    // Check for duplicate name
    if (currentStages.some(stage => stage.name.toLowerCase() === newStageName.trim().toLowerCase())) {
      setError('A stage with this name already exists');
      return;
    }
    
    const newStage: PipelineStage = {
      id: uuidv4(),
      name: newStageName.trim(),
      color: DEFAULT_COLORS[currentStages.length % DEFAULT_COLORS.length],
      order: currentStages.length
    };
    
    setCurrentStages([...currentStages, newStage]);
    setNewStageName('');
    setError(null);
  };

  const handleDeleteStage = (stageId: string) => {
    const updatedStages = currentStages
      .filter(stage => stage.id !== stageId)
      .map((stage, index) => ({
        ...stage,
        order: index
      }));
    
    setCurrentStages(updatedStages);
  };

  const handleUpdateStageName = (stageId: string, name: string) => {
    if (!name.trim()) return;
    
    // Check for duplicate name (excluding the current stage)
    const otherStages = currentStages.filter(s => s.id !== stageId);
    if (otherStages.some(stage => stage.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('A stage with this name already exists');
      return;
    }
    
    setCurrentStages(currentStages.map(stage => 
      stage.id === stageId ? { ...stage, name: name.trim() } : stage
    ));
    setError(null);
  };

  const handleSaveChanges = () => {
    onSave(currentStages);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Configure Sales Pipeline Stages</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-sm text-gray-600">
            Customize your sales pipeline stages by adding, renaming, or reordering them. 
            Drag and drop to change the order.
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {/* Stage List */}
          <div className="space-y-2">
            {currentStages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`flex items-center p-3 border rounded-md ${
                  draggedStage === stage.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                draggable
                onDragStart={() => handleDragStart(stage.id)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="cursor-move mr-2 text-gray-400">
                  <GripVertical className="h-5 w-5" />
                </div>
                
                <div className={`h-4 w-4 rounded-full ${stage.color || 'bg-gray-400'} mr-3`}></div>
                
                <input
                  type="text"
                  value={stage.name}
                  onChange={(e) => handleUpdateStageName(stage.id, e.target.value)}
                  className="flex-1 px-2 py-1 border-b border-transparent focus:border-blue-500 focus:outline-none"
                  placeholder="Stage name"
                />
                
                <button
                  onClick={() => handleDeleteStage(stage.id)}
                  className="ml-2 text-gray-400 hover:text-red-600"
                  disabled={currentStages.length <= 1}
                  title={currentStages.length <= 1 ? "You must have at least one stage" : "Delete stage"}
                >
                  <Trash className={`h-4 w-4 ${currentStages.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Add New Stage */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="New stage name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddStage();
              }}
            />
            <button
              onClick={handleAddStage}
              className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineConfig; 