{/* Message Input */}
<div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-sm">
  <div className="flex items-center px-4 py-3">
    <div className="flex-1 flex items-center gap-3 max-w-[1200px] mx-auto w-full">
      <button 
        className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        title="Attach file"
      >
        <Paperclip className="h-5 w-5" />
      </button>
      
      <div className="flex-1 relative">
        <textarea
          className="w-full pl-6 pr-5 py-2.5 border border-gray-200 rounded-full bg-white text-gray-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
          placeholder="Ask anything"
          rows={1}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
      </div>
      
      <button 
        className="flex-shrink-0 p-2.5 rounded-full text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        onClick={() => handleSendMessage()}
        disabled={!messageInput.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  </div>
</div> 