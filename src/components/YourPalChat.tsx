import { useState, useRef, useEffect } from 'react';
import { Bot, User, Loader2, FileUp, X, History } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const LOCAL_HISTORY_KEY = 'yourpal_chat_history';

interface YourPalChatProps {
  className?: string;
}

const YourPalChat = ({ className = '' }: YourPalChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentText, setDocumentText] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<Message[][]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_HISTORY_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save to history when a session ends (when user closes modal, not handled here)
  const saveHistory = () => {
    if (messages.length > 0) {
      const updated = [messages, ...history].slice(0, 20); // keep last 20 sessions
      setHistory(updated);
      localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
    }
  };

  // File upload handler (stubbed)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentName(file.name);
    setDocumentText('(Document text extraction coming soon)');
  };
  const handleRemoveDocument = () => {
    setDocumentText(null);
    setDocumentName(null);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);
    setError(null);
    // Simulate AI response (replace with real API call later)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'This is a simulated AI response. (Real AI coming soon!)' }]);
      setLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    saveHistory();
    setMessages([]);
    setDocumentText(null);
    setDocumentName(null);
    setError(null);
  };

  return (
    <div className={`relative flex flex-col h-full w-full ${className}`}>
      {/* History Sidebar */}
      {showHistory && (
        <div className="absolute left-0 top-0 h-full w-72 bg-white border-r shadow-xl z-20 animate-slide-in">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg text-primary">Chat History</span>
            <button onClick={() => setShowHistory(false)} aria-label="Close history" className="text-gray-400 hover:text-primary"><X className="w-5 h-5" /></button>
          </div>
          <div className="overflow-y-auto h-full p-2">
            {history.length === 0 && <div className="text-gray-400 text-center mt-8">No previous chats</div>}
            {history.map((session, idx) => (
              <div key={idx} className="mb-4 p-2 rounded-lg border hover:bg-primary/10 cursor-pointer" onClick={() => { setMessages(session); setShowHistory(false); }}>
                <div className="text-xs text-gray-500 mb-1">Session {history.length - idx}</div>
                <div className="truncate text-sm text-gray-700">{session.map(m => m.content).join(' ').slice(0, 60)}{session.map(m => m.content).join(' ').length > 60 ? '...' : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Chat Card */}
      <div className="flex flex-col h-full bg-white/95 rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300">
        {/* Chat Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-8 pt-8 pb-4 border-b bg-white z-10">
          <div className="flex items-center gap-4">
            <button onClick={handleNewChat} className="text-xs text-primary font-semibold hover:underline">New Chat</button>
            <label className="flex items-center gap-2 cursor-pointer text-primary font-semibold">
              <FileUp className="w-5 h-5" />
              <span>Upload PDF, DOCX, or PPTX</span>
              <input
                type="file"
                accept=".pdf,.docx,.pptx"
                className="hidden"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
            {documentName && (
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                <span className="text-sm text-gray-700">{documentName}</span>
                <button onClick={handleRemoveDocument} className="text-gray-400 hover:text-red-600" aria-label="Remove document">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <button onClick={() => setShowHistory(true)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary"><History className="w-4 h-4" />History</button>
        </div>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 px-8 py-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-gray-400 text-center animate-fade-in text-lg">Ask me anything about your studies!</div>
            </div>
          ) : (
            <div className="flex flex-col justify-end flex-1">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-xl px-6 py-4 rounded-2xl shadow ${msg.role === 'user' ? 'bg-primary text-white rounded-br-3xl' : 'bg-gray-200 text-gray-900 flex items-center rounded-bl-3xl'} text-lg`} style={{animationDelay: `${idx * 50}ms`}}>
                    {msg.role === 'ai' && <Bot className="w-5 h-5 mr-3 text-primary" />}
                    <span>{msg.content}</span>
                    {msg.role === 'user' && <User className="w-5 h-5 ml-3 text-white/80" />}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start mb-4 animate-fade-in">
                  <div className="max-w-xl px-6 py-4 rounded-2xl shadow bg-gray-200 text-gray-900 flex items-center text-lg">
                    <Bot className="w-5 h-5 mr-3 text-primary animate-bounce" />
                    <Loader2 className="w-5 h-5 animate-spin mr-3" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-red-600 text-center mb-2 animate-fade-in">{error}</div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        {/* Input Area */}
        <form onSubmit={handleSend} className="flex items-center gap-3 px-8 pb-8 pt-4 bg-white rounded-b-2xl animate-fade-in border-t z-10">
          <input
            type="text"
            className="flex-1 border rounded-lg px-6 py-3 focus:outline-primary text-lg"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md text-lg"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default YourPalChat; 