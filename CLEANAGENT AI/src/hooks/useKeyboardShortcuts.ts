import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShortcutAction {
  key: string;
  ctrlKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  const shortcuts: ShortcutAction[] = [
    {
      key: 'h',
      ctrlKey: true,
      action: () => navigate('/'),
      description: 'Go to Home'
    },
    {
      key: 'm',
      ctrlKey: true,
      action: () => navigate('/metrics'),
      description: 'Go to Metrics'
    },
    {
      key: 's',
      ctrlKey: true,
      action: () => navigate('/sales'),
      description: 'Go to Sales'
    },
    {
      key: 'k',
      ctrlKey: true,
      action: () => navigate('/marketing'),
      description: 'Go to Marketing'
    },
    {
      key: 'r',
      ctrlKey: true,
      action: () => navigate('/hiring'),
      description: 'Go to Hiring'
    },
    {
      key: 'o',
      ctrlKey: true,
      action: () => navigate('/operations'),
      description: 'Go to Operations'
    },
    {
      key: 'i',
      ctrlKey: true,
      action: () => navigate('/settings'),
      description: 'Go to Settings'
    },
    {
      key: '/',
      action: () => document.querySelector<HTMLInputElement>('input[type="search"]')?.focus(),
      description: 'Focus Search'
    },
    {
      key: 'Escape',
      action: () => document.activeElement instanceof HTMLElement && document.activeElement.blur(),
      description: 'Clear Focus'
    }
  ];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const shortcut = shortcuts.find(
        s => s.key.toLowerCase() === event.key.toLowerCase() &&
        (!s.ctrlKey || (s.ctrlKey && (event.ctrlKey || event.metaKey)))
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return {
    shortcuts,
    showShortcutsHelp: () => {
      // You can implement a modal or tooltip to show available shortcuts
      console.table(
        shortcuts.map(s => ({
          Shortcut: `${s.ctrlKey ? 'Ctrl + ' : ''}${s.key}`,
          Description: s.description
        }))
      );
    }
  };
} 