
import { Brain, Lightbulb } from 'lucide-react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Brain className="w-8 h-8 text-primary" />
        <Lightbulb className="w-4 h-4 text-accent absolute -top-1 -right-1" />
      </div>
      <span className="font-poppins font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        IdeaPal
      </span>
    </div>
  );
};

export default Logo;
