import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { Plus, Calendar as CalendarIcon, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { SocialPost, Platform } from '@/types/social';
import { NewPostModal } from './NewPostModal';
import { AIContentSuggestions } from './AIContentSuggestions';

const localizer = momentLocalizer(moment);

const platformColors = {
  instagram: 'bg-pink-100 border-pink-500 text-pink-700',
  twitter: 'bg-blue-100 border-blue-500 text-blue-700',
  facebook: 'bg-indigo-100 border-indigo-500 text-indigo-700',
  linkedin: 'bg-sky-100 border-sky-500 text-sky-700',
};

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
};

interface SocialMediaCalendarProps {
  posts: SocialPost[];
  onAddPost: (post: Omit<SocialPost, 'id'>) => void;
  onUpdatePost: (post: SocialPost) => void;
  onDeletePost: (postId: string) => void;
}

export const SocialMediaCalendar: React.FC<SocialMediaCalendarProps> = ({
  posts,
  onAddPost,
  onUpdatePost,
  onDeletePost,
}) => {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsNewPostModalOpen(true);
  };

  const handleSelectEvent = (post: SocialPost) => {
    setSelectedPost(post);
    setIsNewPostModalOpen(true);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const postId = result.draggableId;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newStart = moment(post.scheduledTime)
      .add(
        moment(result.destination.droppableId).diff(
          moment(result.source.droppableId),
          'minutes'
        ),
        'minutes'
      )
      .toDate();

    onUpdatePost({
      ...post,
      scheduledTime: newStart,
    });
  };

  const calendarEvents = posts.map(post => ({
    id: post.id,
    title: post.content,
    start: new Date(post.scheduledTime),
    end: moment(post.scheduledTime).add(30, 'minutes').toDate(),
    post,
  }));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Social Media Calendar</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAISuggestions(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            AI Suggestions
          </button>
          <button
            onClick={() => {
              setSelectedDate(new Date());
              setIsNewPostModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 bg-white rounded-lg shadow">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event: any) => handleSelectEvent(event.post)}
            defaultView={Views.WEEK}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            eventPropGetter={(event: any) => ({
              className: `border-l-4 ${
                platformColors[event.post.platform as keyof typeof platformColors]
              }`,
            })}
            components={{
              event: ({ event }: any) => {
                const Icon = platformIcons[event.post.platform as keyof typeof platformIcons];
                return (
                  <Draggable draggableId={event.id} index={0}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              },
            }}
          />
        </div>
      </DragDropContext>

      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => {
          setIsNewPostModalOpen(false);
          setSelectedPost(null);
          setSelectedDate(null);
        }}
        onSubmit={(postData) => {
          if (selectedPost) {
            onUpdatePost({ ...selectedPost, ...postData });
          } else {
            onAddPost({ ...postData, scheduledTime: selectedDate || new Date() });
          }
          setIsNewPostModalOpen(false);
          setSelectedPost(null);
          setSelectedDate(null);
        }}
        initialData={selectedPost}
        selectedDate={selectedDate}
      />

      <AIContentSuggestions
        isOpen={showAISuggestions}
        onClose={() => setShowAISuggestions(false)}
        onApplySuggestion={(suggestion) => {
          setSelectedDate(suggestion.recommendedTime);
          setIsNewPostModalOpen(true);
        }}
      />
    </div>
  );
}; 