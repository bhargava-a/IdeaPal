
import { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { courses, trendingTopics } from '@/data/courses';

interface SearchDropdownProps {
  className?: string;
  placeholder?: string;
}

const SearchDropdown = ({ className = "", placeholder = "What would you like to learn today?" }: SearchDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses.slice(0, 6)); // Show first 6 courses when no search
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    setShowDropdown(true);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder={placeholder}
          className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-primary font-inter"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
      </div>
      
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 max-h-96 overflow-y-auto">
          {/* Trending Topics */}
          <div className="mb-4">
            <h4 className="font-poppins font-semibold text-sm text-gray-700 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-accent" />
              Trending Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="font-inter text-sm hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleTopicClick(topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          {/* Course Results */}
          {searchQuery.trim() && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-poppins font-semibold text-sm text-gray-700 mb-3">
                  Course Results ({filteredCourses.length})
                </h4>
                {filteredCourses.length > 0 ? (
                  <div className="space-y-2">
                    {filteredCourses.slice(0, 5).map((course) => (
                      <div
                        key={course.id}
                        className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="font-poppins font-bold text-primary text-lg">
                              {course.title.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-poppins font-medium text-gray-900 text-sm line-clamp-1">
                              {course.title}
                            </h5>
                            <p className="font-inter text-gray-600 text-xs line-clamp-2 mt-1">
                              {course.description}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full font-dm-sans">
                              {course.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-inter text-gray-500 text-sm">No courses found matching your search.</p>
                )}
              </div>
            </>
          )}

          {/* Popular Courses when no search */}
          {!searchQuery.trim() && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-poppins font-semibold text-sm text-gray-700 mb-3">
                  Popular Courses
                </h4>
                <div className="space-y-2">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="font-poppins font-bold text-primary text-lg">
                            {course.title.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-poppins font-medium text-gray-900 text-sm line-clamp-1">
                            {course.title}
                          </h5>
                          <p className="font-inter text-gray-600 text-xs line-clamp-2 mt-1">
                            {course.description}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full font-dm-sans">
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
