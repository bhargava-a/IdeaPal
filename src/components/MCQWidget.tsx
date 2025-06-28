
import { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MCQ } from '@/data/courses';

interface MCQWidgetProps {
  mcq: MCQ;
  onAnswer?: (correct: boolean) => void;
}

const MCQWidget = ({ mcq, onAnswer }: MCQWidgetProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setShowResult(true);
    const isCorrect = selectedOption === mcq.correctAnswer;
    onAnswer?.(isCorrect);
  };

  const reset = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <Card className="my-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-sm font-bold">?</span>
          </div>
          <h4 className="font-poppins font-semibold text-lg text-gray-900">
            {mcq.question}
          </h4>
        </div>

        <div className="space-y-3 ml-9">
          {mcq.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                showResult
                  ? index === mcq.correctAnswer
                    ? 'bg-green-100 border-green-300'
                    : index === selectedOption && selectedOption !== mcq.correctAnswer
                    ? 'bg-red-100 border-red-300'
                    : 'bg-gray-50'
                  : selectedOption === index
                  ? 'bg-primary/10 border-primary'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border-2 ${
                selectedOption === index && !showResult ? 'border-primary' : 'border-transparent'
              }`}
            >
              <input
                type="radio"
                name={`mcq-${mcq.question}`}
                value={index}
                checked={selectedOption === index}
                onChange={() => !showResult && setSelectedOption(index)}
                disabled={showResult}
                className="sr-only"
              />
              
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedOption === index 
                  ? showResult
                    ? index === mcq.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}>
                {selectedOption === index && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              
              <span className="font-inter text-gray-700 flex-1">
                {option}
              </span>
              
              {showResult && index === mcq.correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              
              {showResult && index === selectedOption && selectedOption !== mcq.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </label>
          ))}
        </div>

        <div className="ml-9 mt-4 space-y-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-primary hover:bg-primary/90 font-dm-sans"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-3">
              <div className={`flex items-start space-x-3 p-4 rounded-lg ${
                selectedOption === mcq.correctAnswer 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <Lightbulb className={`w-5 h-5 mt-0.5 ${
                  selectedOption === mcq.correctAnswer ? 'text-green-600' : 'text-red-600'
                }`} />
                <div>
                  <p className={`font-dm-sans font-medium mb-1 ${
                    selectedOption === mcq.correctAnswer ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedOption === mcq.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="font-inter text-sm text-gray-700">
                    {mcq.explanation}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={reset}
                variant="outline"
                className="font-dm-sans"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQWidget;
