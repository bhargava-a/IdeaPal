
import { useState } from 'react';
import { Menu, X, User, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={handleLogoClick}>
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={handleHomeClick}
              className="font-inter text-gray-700 hover:text-primary transition-colors flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <a href="/courses" className="font-inter text-gray-700 hover:text-primary transition-colors">
              Courses
            </a>
            <a href="/about" className="font-inter text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="font-inter text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="font-dm-sans">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm" className="font-dm-sans">
              Login
            </Button>
            <Button size="sm" className="font-dm-sans bg-primary hover:bg-primary/90">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={handleHomeClick}
                className="font-inter text-gray-700 hover:text-primary transition-colors flex items-center space-x-2 text-left"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <a href="/courses" className="font-inter text-gray-700 hover:text-primary transition-colors">
                Courses
              </a>
              <a href="/about" className="font-inter text-gray-700 hover:text-primary transition-colors">
                About
              </a>
              <a href="/contact" className="font-inter text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="font-dm-sans">
                  Login
                </Button>
                <Button size="sm" className="font-dm-sans bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
