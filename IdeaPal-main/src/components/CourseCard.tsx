import { Star, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  rating: number;
  duration: string;
  students: number;
  image?: string;
  level: string;
  category: string;
}

const CourseCard = ({ 
  id,
  title, 
  description, 
  rating, 
  duration, 
  students, 
  image, 
  level, 
  category 
}: CourseCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white border border-gray-100 rounded-2xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-poppins font-bold text-primary/20">
              {title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-dm-sans font-medium text-gray-700">
            {level}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-xs font-dm-sans font-medium text-secondary uppercase tracking-wide">
            {category}
          </span>
        </div>
        
        <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-accent fill-current" />
              <span className="font-dm-sans font-medium text-sm text-gray-700">
                {rating}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-dm-sans text-sm text-gray-600">
                {duration}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="font-dm-sans text-sm text-gray-600">
                {students}k
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
