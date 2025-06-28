
import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HighlightableTextProps {
  children: string;
}

interface Doubt {
  id: string;
  selectedText: string;
  query: string;
  response: string;
  zIndex: number;
}

const HighlightableText = ({ children }: HighlightableTextProps) => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [currentQuery, setCurrentQuery] = useState<{ [key: string]: string }>({});

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      // Create and position the help icon
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        
        // Remove any existing help icons
        const existingIcon = document.querySelector('.doubt-icon');
        if (existingIcon) {
          existingIcon.remove();
        }
        
        // Create help icon
        const helpIcon = document.createElement('div');
        helpIcon.className = 'doubt-icon fixed cursor-pointer';
        helpIcon.style.left = `${rect.right + 10}px`;
        helpIcon.style.top = `${rect.top}px`;
        helpIcon.style.zIndex = '9999';
        helpIcon.innerHTML = `
          <div class="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <circle cx="12" cy="17" r="1"/>
            </svg>
          </div>
        `;
        
        helpIcon.onclick = () => {
          createDoubt(text);
          helpIcon.remove();
        };
        
        document.body.appendChild(helpIcon);
        
        // Remove icon after 5 seconds
        setTimeout(() => {
          helpIcon.remove();
        }, 5000);
      }
    }
  };

  const createDoubt = (selectedText: string) => {
    const newDoubt: Doubt = {
      id: generateId(),
      selectedText,
      query: '',
      response: '',
      zIndex: 1000 + doubts.length * 10
    };
    
    setDoubts(prev => [...prev, newDoubt]);
    setCurrentQuery(prev => ({ ...prev, [newDoubt.id]: '' }));
  };

  const handleDoubtSubmit = async (doubtId: string) => {
    const doubt = doubts.find(d => d.id === doubtId);
    const query = currentQuery[doubtId];
    
    if (!doubt || !query.trim()) return;
    
    // Simulate AI response (replace with actual Gemini/GPT API call)
    const aiResponse = `Based on the selected text "${doubt.selectedText}", here's an explanation for your question "${query}":

This is a simulated AI response. In a production app, this would connect to the Gemini or GPT API to provide contextual explanations about the highlighted content.

The system analyzes the selected text and provides relevant, educational responses to help clarify concepts and answer student doubts in real-time.

You can highlight text within this response to create nested doubts and dive deeper into specific concepts.`;

    setDoubts(prev => 
      prev.map(d => 
        d.id === doubtId 
          ? { ...d, response: aiResponse }
          : d
      )
    );
  };

  const closeDoubt = (doubtId: string) => {
    setDoubts(prev => prev.filter(d => d.id !== doubtId));
    setCurrentQuery(prev => {
      const updated = { ...prev };
      delete updated[doubtId];
      return updated;
    });
  };

  const updateQuery = (doubtId: string, query: string) => {
    setCurrentQuery(prev => ({ ...prev, [doubtId]: query }));
  };

  return (
    <>
      <div 
        className="prose prose-lg max-w-none font-inter leading-relaxed"
        onMouseUp={handleTextSelection}
        dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, '<br/>') }}
      />
      
      {/* Render nested doubt popups */}
      {doubts.map((doubt, index) => (
        <div key={doubt.id}>
          {/* Background blur overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: doubt.zIndex - 1 }}
            onClick={() => closeDoubt(doubt.id)}
          />
          
          {/* Doubt popup */}
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-white rounded-xl shadow-2xl border border-gray-200 
                     max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4"
            style={{ zIndex: doubt.zIndex }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">
                  Ask about selected text
                </h3>
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="font-inter text-sm text-gray-700 italic">
                    "{doubt.selectedText}"
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => closeDoubt(doubt.id)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Query input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask your doubt about the selected text..."
                  value={currentQuery[doubt.id] || ''}
                  onChange={(e) => updateQuery(doubt.id, e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleDoubtSubmit(doubt.id)}
                />
                <Button 
                  onClick={() => handleDoubtSubmit(doubt.id)}
                  className="bg-primary hover:bg-primary/90 font-dm-sans"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>
              
              {/* AI Response */}
              {doubt.response && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-poppins font-semibold mb-2 text-gray-900">AI Response:</h4>
                  <div 
                    className="font-inter text-gray-700 whitespace-pre-wrap cursor-text"
                    onMouseUp={handleTextSelection}
                    dangerouslySetInnerHTML={{ __html: doubt.response.replace(/\n/g, '<br/>') }}
                  />
                </div>
              )}
            </div>
            
            {/* Chain indicator */}
            {index > 0 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-dm-sans font-medium">
                  Doubt #{index + 1}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default HighlightableText;
