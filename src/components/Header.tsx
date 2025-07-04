import { useState, useRef, useEffect } from 'react';
import { Menu, X, User, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import SearchDropdown from './SearchDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, profile, loading, profileLoading } = useAuth();
  const location = useLocation();
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);

  // Redirect to /account-details if logged in but profile is missing
  if (!loading && user && !profile && !profileLoading && location.pathname !== '/account-details') {
    navigate('/account-details');
  }

  // Close profile card when clicking outside
  useEffect(() => {
    if (!showProfileCard) return;
    const handleClick = (e: MouseEvent) => {
      if (profileCardRef.current && !profileCardRef.current.contains(e.target as Node)) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showProfileCard]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
            {/* Replace the old search button with the SearchDropdown */}
            <SearchDropdown className="w-72" placeholder="What would you like to learn today?" />
            {loading ? null : user ? (
              <>
                {profile && (
                  <div className="flex items-center gap-2 mr-2 relative">
                    <div
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg cursor-pointer border-2 border-primary/60 hover:border-primary transition"
                      onClick={() => setShowProfileCard(v => !v)}
                    >
                      {profile.first_name?.[0] || profile.username?.[0] || user.email[0]}
                    </div>
                    <span className="font-inter text-gray-700">{profile.username || user.email}</span>
                    {/* Profile Card Popover */}
                    {showProfileCard && (
                      <div ref={profileCardRef} className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl border w-80 p-6 animate-fade-in">
                        {editingProfile ? (
                          <form onSubmit={async e => {
                            e.preventDefault();
                            setEditLoading(true);
                            setEditError(null);
                            setEditSuccess(false);
                            if (!user) {
                              setEditError('Not authenticated.');
                              setEditLoading(false);
                              return;
                            }
                            const { error } = await supabase.from('profiles').update({
                              first_name: editForm.first_name,
                              last_name: editForm.last_name,
                              school: editForm.school,
                              education_program: editForm.education_program,
                              graduation_year: editForm.graduation_year,
                              age: editForm.age,
                            }).eq('id', user.id);
                            setEditLoading(false);
                            if (error) {
                              setEditError(error.message);
                            } else {
                              setEditSuccess(true);
                              setEditingProfile(false);
                            }
                          }}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                                {profile.first_name?.[0] || profile.username?.[0] || user.email[0]}
                              </div>
                              <div>
                                <div className="font-bold text-lg text-primary">{profile.username}</div>
                                <div className="text-gray-600 text-sm">{user.email}</div>
                              </div>
                            </div>
                            <div className="mb-2"><span className="font-semibold">First Name:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.first_name} onChange={e => setEditForm((f: any) => ({ ...f, first_name: e.target.value }))} /></div>
                            <div className="mb-2"><span className="font-semibold">Last Name:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.last_name} onChange={e => setEditForm((f: any) => ({ ...f, last_name: e.target.value }))} /></div>
                            <div className="mb-2"><span className="font-semibold">School:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.school} onChange={e => setEditForm((f: any) => ({ ...f, school: e.target.value }))} /></div>
                            <div className="mb-2"><span className="font-semibold">Program:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.education_program} onChange={e => setEditForm((f: any) => ({ ...f, education_program: e.target.value }))} /></div>
                            <div className="mb-2"><span className="font-semibold">Graduation:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.graduation_year} onChange={e => setEditForm((f: any) => ({ ...f, graduation_year: e.target.value }))} /></div>
                            <div className="mb-2"><span className="font-semibold">Age:</span> <input className="border rounded px-2 py-1 w-full" value={editForm.age} onChange={e => setEditForm((f: any) => ({ ...f, age: e.target.value }))} /></div>
                            {editError && <div className="text-red-600 text-center mb-2 animate-fade-in">{editError}</div>}
                            {editSuccess && <div className="text-green-600 text-center mb-2 animate-fade-in">Profile updated!</div>}
                            <div className="flex gap-2 mt-4">
                              <button type="submit" className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition-colors" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</button>
                              <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition-colors" onClick={() => setEditingProfile(false)}>Cancel</button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                                {profile.first_name?.[0] || profile.username?.[0] || user.email[0]}
                              </div>
                              <div>
                                <div className="font-bold text-lg text-primary">{profile.username}</div>
                                <div className="text-gray-600 text-sm">{user.email}</div>
                              </div>
                            </div>
                            <div className="mb-2"><span className="font-semibold">Name:</span> {profile.first_name} {profile.last_name}</div>
                            <div className="mb-2"><span className="font-semibold">School:</span> {profile.school}</div>
                            <div className="mb-2"><span className="font-semibold">Program:</span> {profile.education_program}</div>
                            <div className="mb-2"><span className="font-semibold">Graduation:</span> {profile.graduation_year}</div>
                            <div className="mb-2"><span className="font-semibold">Age:</span> {profile.age}</div>
                            <div className="flex gap-2 mt-4">
                              <button className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition-colors" onClick={() => { setEditForm(profile); setEditingProfile(true); }}>Edit</button>
                              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition-colors" onClick={() => setShowProfileCard(false)}>Close</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Button variant="outline" size="sm" className="font-dm-sans" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="font-dm-sans" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" className="font-dm-sans bg-primary hover:bg-primary/90" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            )}
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
                {loading ? null : user ? (
                  <Button variant="outline" size="sm" className="font-dm-sans" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="font-dm-sans" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
                      Login
                    </Button>
                    <Button size="sm" className="font-dm-sans bg-primary hover:bg-primary/90" onClick={() => { setIsMenuOpen(false); navigate('/signup'); }}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
