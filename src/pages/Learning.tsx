import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import HighlightableText from '@/components/HighlightableText';
import MCQWidget from '@/components/MCQWidget';
import Notepad from '@/components/Notepad';
import { courses } from '@/data/courses';

const Learning = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const course = courses.find(c => c.id === courseId);
  const currentModule = course?.modules.find(m => m.id === moduleId);

  if (!course || !currentModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-4">
            Module Not Found
          </h1>
          <p className="font-inter text-gray-600">
            The learning module you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
  const progress = ((moduleIndex + 1) / course.modules.length) * 100;

  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  const handleContinueToNext = () => {
    const nextModuleIndex = moduleIndex + 1;
    if (nextModuleIndex < course.modules.length) {
      const nextModuleId = course.modules[nextModuleIndex].id;
      navigate(`/course/${courseId}/module/${nextModuleId}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const handleMCQAnswer = (correct: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = correct;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentModule.mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBackToCourse}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-poppins font-semibold text-gray-900">
                  {course.title}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-inter text-sm text-gray-600">
                Module {moduleIndex + 1} of {course.modules.length}
              </p>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                <div className="mb-8">
                  <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-2">
                    {currentModule.title}
                  </h1>
                  <p className="font-inter text-lg text-gray-600">
                    Module {moduleIndex + 1} of {course.modules.length}
                  </p>
                </div>

                {/* Module Content */}
                <div className="prose prose-lg max-w-none mb-12">
                  <HighlightableText>
                    {currentModule.content}
                  </HighlightableText>
                </div>

                {/* Jokes Section */}
                {currentModule.jokes.length > 0 && (
                  <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-8">
                    <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-4">
                      😄 Learning with Laughter
                    </h3>
                    <div className="space-y-3">
                      {currentModule.jokes.map((joke, index) => (
                        <p key={index} className="font-inter text-gray-700 italic">
                          "{joke}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* MCQs Section */}
                {currentModule.mcqs.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-poppins font-bold text-2xl text-gray-900">
                        Quick Check
                      </h3>
                      <span className="font-inter text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {currentModule.mcqs.length}
                      </span>
                    </div>

                    <MCQWidget
                      mcq={currentModule.mcqs[currentQuestionIndex]}
                      onAnswer={handleMCQAnswer}
                    />

                    {/* MCQ Navigation */}
                    <div className="flex justify-between items-center">
                      <Button
                        onClick={prevQuestion}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                        className="font-dm-sans"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex space-x-2">
                        {currentModule.mcqs.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentQuestionIndex
                                ? 'bg-primary'
                                : answers[index] !== undefined
                                ? answers[index]
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      <Button
                        onClick={nextQuestion}
                        disabled={currentQuestionIndex === currentModule.mcqs.length - 1}
                        className="bg-primary hover:bg-primary/90 font-dm-sans"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Module Completion */}
                <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="font-poppins font-semibold text-lg text-green-800">
                      Module Complete!
                    </h3>
                  </div>
                  <p className="font-inter text-green-700 mb-4">
                    Great job completing this module! You're making excellent progress.
                  </p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 font-dm-sans"
                    onClick={handleContinueToNext}
                  >
                    {moduleIndex + 1 < course.modules.length ? 'Continue to Next Module' : 'Back to Course'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar with Notepad */}
            <div className="lg:col-span-1">
              <Notepad />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
