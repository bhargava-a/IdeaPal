
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, Play, Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { courses } from '@/data/courses';

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-4">
            Course Not Found
          </h1>
          <p className="font-inter text-gray-600 mb-8">
            The course you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const handleStartLearning = () => {
    if (course.modules.length > 0) {
      navigate(`/course/${courseId}/module/${course.modules[0].id}`);
    }
  };

  const handleContinueLearning = () => {
    // Find the first incomplete module or the first module if none are completed
    // For now, we'll assume we continue from the first module
    // In a real app, you'd track completion status
    const nextModule = course.modules[0]; // This would be the next incomplete module
    navigate(`/course/${courseId}/module/${nextModule.id}`);
  };

  const handleModuleClick = (moduleId: string) => {
    navigate(`/course/${courseId}/module/${moduleId}`);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoHome}
              className="text-gray-600 hover:text-primary"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-inter">Course</span>
          </div>

          {/* Course Header */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Badge className="mb-4 bg-secondary text-black">
                    {course.category}
                  </Badge>
                  
                  <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-4">
                    {course.title}
                  </h1>
                  
                  <p className="font-inter text-lg text-gray-600 mb-6">
                    {course.abstract}
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-accent fill-current" />
                      <span className="font-dm-sans font-semibold text-gray-900">
                        {course.rating}
                      </span>
                      <span className="font-inter text-gray-600">
                        ({course.reviews.length} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="font-inter text-gray-600">
                        {course.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="font-inter text-gray-600">
                        {course.students}k students
                      </span>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-primary border-primary">
                    {course.level}
                  </Badge>
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 font-dm-sans text-lg py-3"
                          onClick={handleStartLearning}
                        >
                          Start Learning
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full font-dm-sans text-lg py-3 group"
                          onClick={handleContinueLearning}
                        >
                          Continue Learning
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-inter text-gray-600">Duration:</span>
                          <span className="font-dm-sans font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-inter text-gray-600">Level:</span>
                          <span className="font-dm-sans font-medium">{course.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-inter text-gray-600">Students:</span>
                          <span className="font-dm-sans font-medium">{course.students}k</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-inter text-gray-600">Modules:</span>
                          <span className="font-dm-sans font-medium">{course.modules.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Modules */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary" />
                    Course Modules
                  </h2>
                  
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer hover:bg-gray-50 group"
                        onClick={() => handleModuleClick(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-dm-sans font-semibold text-primary text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="font-poppins font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                              {module.title}
                            </h3>
                          </div>
                          <Play className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">
                    Student Reviews
                  </h2>
                  
                  <div className="space-y-6">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                              <span className="font-poppins font-semibold text-white text-sm">
                                {review.userName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-dm-sans font-semibold text-gray-900">
                                {review.userName}
                              </h4>
                              <p className="font-inter text-sm text-gray-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-accent fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <p className="font-inter text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="font-poppins font-bold text-lg text-gray-900 mb-4">
                    What You'll Learn
                  </h3>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="font-inter text-gray-700">
                        Master fundamental concepts with interactive examples
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="font-inter text-gray-700">
                        Get instant AI-powered doubt resolution
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="font-inter text-gray-700">
                        Practice with engaging MCQs and quizzes
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                      <span className="font-inter text-gray-700">
                        Build practical projects and applications
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
