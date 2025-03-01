# Chat Module

This module provides a comprehensive chat interface for the CleanAgent application, allowing users to communicate with AI agents specialized in different domains.

## Components

### ChatPage

The main component that integrates all chat functionality. It includes:

- A sidebar with a searchable list of conversations
- A main chat panel displaying the conversation history
- A message input area with AI suggestions
- Support for multiple agent types (Sales, Hiring, Operations)
- Integration with advanced AI editing capabilities

### AdvancedChatControls

A component that provides an expanded interface for generating and editing complex AI responses before sending them. Features include:

- Agent-specific content generation
- Expandable/collapsible interface
- Content editing capabilities
- Version history tracking
- Accept/regenerate functionality

## Usage

```tsx
import { ChatPage } from '@/modules/chat';

const App = () => {
  return (
    <div>
      <ChatPage />
    </div>
  );
};
```

## Agent Types

The chat module supports multiple agent types, each specialized in different domains:

- **Sales**: Assists with sales outreach, pipeline management, and customer engagement
- **Hiring**: Helps with job descriptions, candidate evaluation, and recruitment processes
- **Operations**: Provides guidance on workflow optimization, process improvement, and operational efficiency

Each agent type has its own color coding and specialized response generation capabilities.

## AI Integration

The chat module integrates with the AI components from the shared components library:

- Uses `AIEditableContent` for advanced message editing
- Provides AI-powered suggestions based on conversation context
- Supports regeneration of AI content with different parameters

## Styling

The chat interface follows the application's design system, using:

- Design tokens for consistent colors, spacing, and typography
- Responsive design for optimal display on different devices
- Accessibility features for inclusive user experience 