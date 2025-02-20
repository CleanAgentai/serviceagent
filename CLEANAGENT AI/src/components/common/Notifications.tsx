import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';
import Card from './Card';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export default function Notifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add demo notifications if none exist
  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications([
        {
          id: '1',
          title: 'New Task Assigned',
          message: 'You have been assigned a new task in Operations.',
          type: 'info',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          title: 'Deal Update',
          message: 'Sales pipeline updated with new opportunity.',
          type: 'success',
          timestamp: new Date(Date.now() - 3600000),
          read: false
        }
      ]);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-success-500" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary-500" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div className="relative notifications-container">
      <Button
        variant="ghost"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative hover:bg-primary-50"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-fade-in">
            {unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <Card
          className="absolute right-0 mt-2 w-96 z-50 animate-slide-up"
          hover={false}
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-sm hover:bg-primary-50"
                  >
                    Mark all as read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllNotifications}
                    className="text-sm text-red-600 hover:bg-red-50"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors',
                    !notification.read && 'bg-primary-50'
                  )}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 