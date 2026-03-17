import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { Sun, Moon, Sunrise, BrainCircuit, LogOut, Settings, User, Mail, Calendar, BookOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SettingsDropdown() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-9 w-9 rounded-full transition-colors ${isOpen ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
        title="Settings & Theme"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg shadow-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-border/50 bg-muted/20">
            <h4 className="text-sm font-semibold text-foreground">Appearance</h4>
          </div>
          <div className="p-2 flex justify-between gap-1 border-b border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('light')}
              className={`flex-1 flex-col h-14 rounded-lg bg-background border border-border/50 hover:border-primary hover:bg-primary/5 ${theme === 'light' ? 'ring-2 ring-primary ring-offset-1' : ''}`}
            >
              <Sun className="h-4 w-4 mb-1" />
              <span className="text-[10px] text-muted-foreground">Light</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('warm')}
              className={`flex-1 flex-col h-14 rounded-lg bg-amber-50 dark:bg-amber-950 border border-border/50 hover:border-amber-500 hover:bg-amber-500/10 ${theme === 'warm' ? 'ring-2 ring-amber-500 ring-offset-1' : ''}`}
            >
              <Sunrise className="h-4 w-4 mb-1 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] text-amber-600 dark:text-amber-400">Warm</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme('dark')}
              className={`flex-1 flex-col h-14 rounded-lg bg-slate-900 border border-border/50 hover:border-blue-500 hover:bg-slate-800 ${theme === 'dark' ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
            >
              <Moon className="h-4 w-4 mb-1 text-slate-200" />
              <span className="text-[10px] text-slate-300">Dark</span>
            </Button>
          </div>
          <div className="p-1">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState({
    name: 'Student',
    initial: 'S',
    email: 'Not provided',
    class: 'Not selected',
    dob: 'Not provided'
  });

  useEffect(() => {
    // Load data from local storage
    const name = localStorage.getItem('thinkfirst_user_name') || 'Student';
    setUserData({
      name: name,
      initial: name.charAt(0).toUpperCase(),
      email: localStorage.getItem('thinkfirst_user_email') || 'student@example.com',
      class: localStorage.getItem('thinkfirst_user_class') || 'Class 12',
      dob: localStorage.getItem('thinkfirst_user_dob') || 'Jan 1, 2008'
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Re-run when opening to ensure fresh data

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:scale-105 transition-all text-primary-foreground border-2 border-background ring-2 ring-transparent focus-within:ring-primary/30"
        title="Profile"
      >
        <span className="text-sm font-bold">{userData.initial}</span>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card shadow-xl shadow-primary/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header */}
          <div className="bg-primary/5 p-4 flex items-center space-x-3 border-b border-border/50">
            <div className="h-12 w-12 rounded-full bg-primary flex flex-shrink-0 items-center justify-center text-primary-foreground text-lg font-bold shadow-sm">
               {userData.initial}
            </div>
            <div className="overflow-hidden">
               <h3 className="font-bold text-base text-foreground truncate">{userData.name}</h3>
               <p className="text-xs text-muted-foreground truncate">{userData.email}</p>
            </div>
          </div>
          
          {/* Details */}
          <div className="p-2">
            <div className="px-3 py-2 flex items-center text-sm text-foreground/80 hover:bg-muted/50 rounded-lg transition-colors">
              <BookOpen className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="flex-1">Grade</span>
              <span className="font-medium">{userData.class}</span>
            </div>
            <div className="px-3 py-2 flex items-center text-sm text-foreground/80 hover:bg-muted/50 rounded-lg transition-colors">
              <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="flex-1">Date of Birth</span>
              <span className="font-medium text-xs">{userData.dob}</span>
            </div>
          </div>
          
          <div className="p-2 border-t border-border/50 bg-muted/20">
             <Button variant="outline" size="sm" className="w-full text-xs hover:bg-background" onClick={() => setIsOpen(false)}>
               Manage Account
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">ThinkFirst</span>
        </Link>
        
        {!isLoginPage && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <Link to="/dashboard" className={`transition-colors hover:text-foreground ${location.pathname === '/dashboard' ? 'text-foreground' : ''}`}>Dashboard</Link>
            <Link to="/subjects" className={`transition-colors hover:text-foreground ${location.pathname.startsWith('/subjects') || location.pathname.startsWith('/topics') ? 'text-foreground' : ''}`}>Practice</Link>
            <Link to="/profile" className={`transition-colors hover:text-foreground ${location.pathname === '/profile' ? 'text-foreground' : ''}`}>Profile</Link>
          </nav>
        )}

        <div className="flex items-center space-x-3">
          {!isLoginPage ? (
            <>
              <SettingsDropdown />
              <div className="w-px h-6 bg-border mx-1"></div>
              <UserProfileDropdown />
            </>
          ) : (
            null // Can add a simple theme toggle for login pages if desired
          )}
        </div>
      </div>
    </header>
  );
}
