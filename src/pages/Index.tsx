
import { ArrowRight, Sparkles, BookOpen, Users, Star, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import Logo from '@/components/Logo';
import SearchDropdown from '@/components/SearchDropdown';
import { courses } from '@/data/courses';
import { useState } from 'react';
import YourPalChat from '@/components/YourPalChat';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const featuredCourses = courses.slice(0, 3);
  const [showYourPal, setShowYourPal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/10">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Logo className="scale-150" />
          </div>
          
          <h1 className="font-poppins font-bold text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Your AI-Powered 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Study Buddy
            </span>
          </h1>
          
          <p className="font-inter text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover personalized learning paths, get instant AI-powered doubt resolution, 
            and master any subject with interactive modules designed just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-dm-sans text-lg px-8 py-4 rounded-xl group"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="font-dm-sans text-lg px-8 py-4 rounded-xl"
            >
              Watch Demo
            </Button>
          </div>

          {/* Search Bar */}
          <SearchDropdown className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/80 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-poppins font-bold text-3xl text-gray-900 mb-2">50K+</h3>
              <p className="font-inter text-gray-600">Active Learners</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-poppins font-bold text-3xl text-gray-900 mb-2">200+</h3>
              <p className="font-inter text-gray-600">Expert Courses</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-poppins font-bold text-3xl text-gray-900 mb-2">4.9</h3>
              <p className="font-inter text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-4xl text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Start your learning journey with our most popular courses, 
            designed by experts and loved by students worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              rating={course.rating}
              duration={course.duration}
              students={course.students}
              level={course.level}
              category={course.category}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="font-dm-sans text-lg px-8 py-4 rounded-xl group"
          >
            View All Courses
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* AI Features Highlight */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="font-poppins font-bold text-4xl text-gray-900 mb-6">
              AI-Powered Learning Experience
            </h2>
            
            <p className="font-inter text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Highlight any text and get instant AI explanations. Ask follow-up questions 
              and dive deeper into concepts with our intelligent doubt resolution system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
                <h3 className="font-poppins font-semibold text-lg mb-3">Smart Highlighting</h3>
                <p className="font-inter text-gray-600">
                  Select any text to get instant AI-powered explanations and clarifications.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
                <h3 className="font-poppins font-semibold text-lg mb-3">Contextual Doubts</h3>
                <p className="font-inter text-gray-600">
                  Ask questions within the context of your current learning material.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
                <h3 className="font-poppins font-semibold text-lg mb-3">Nested Learning</h3>
                <p className="font-inter text-gray-600">
                  Chain multiple questions together for deeper understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Logo className="justify-center mb-6" />
            <p className="font-inter text-gray-400 max-w-2xl mx-auto">
              Empowering learners worldwide with AI-driven education. 
              Start your journey today and unlock your potential.
            </p>
          </div>
        </div>
      </footer>

      {/* YourPal Floating AI Icon */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl p-5 flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"
        onClick={() => setShowYourPal(true)}
        aria-label="Open YourPal AI Chat"
      >
        <Bot className="w-8 h-8" />
        <span className="ml-3 font-bold text-lg hidden sm:inline">YourPal</span>
      </button>

      {/* YourPal Modal (with chat) */}
      {showYourPal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowYourPal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-0 flex flex-col min-h-[75vh] h-[75vh] relative" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowYourPal(false)}
              aria-label="Close YourPal"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <div className="flex items-center mb-6 px-8 pt-8">
              <Bot className="w-8 h-8 text-primary" />
              <span className="ml-3 font-bold text-2xl text-primary">YourPal</span>
            </div>
            <YourPalChat className="flex-1 min-h-0" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
