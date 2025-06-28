
import { useState } from 'react';
import { StickyNote, Save, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Notepad = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const saveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes.trim()]);
      setNotes('');
    }
  };

  const deleteNote = (index: number) => {
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full h-fit sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <StickyNote className="w-5 h-5 text-accent" />
          <h3 className="font-poppins font-semibold">Quick Notes</h3>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Jot down your thoughts..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] resize-none font-inter"
          />
          <Button 
            onClick={saveNote}
            size="sm"
            className="w-full bg-accent hover:bg-accent/90 text-black font-dm-sans"
            disabled={!notes.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
        </div>
        
        {savedNotes.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-poppins font-medium text-sm text-gray-700">
              Saved Notes:
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedNotes.map((note, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-inter text-sm text-gray-700 mb-2">
                    {note}
                  </p>
                  <Button
                    onClick={() => deleteNote(index)}
                    size="sm"
                    variant="ghost"
                    className="h-6 p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Notepad;
