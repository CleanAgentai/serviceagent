import React from 'react';
import { Keyboard } from 'lucide-react';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import Button from './Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsHelp({ isOpen, onClose }: Props) {
  const { shortcuts } = useKeyboardShortcuts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-300">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-sm font-mono">
                  {shortcut.ctrlKey ? 'Ctrl + ' : ''}{shortcut.key.toUpperCase()}
                </kbd>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">?</kbd> anywhere to show this help dialog
          </p>
        </div>
      </div>
    </div>
  );
} 