import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { Sun, Moon, Sunrise, BrainCircuit } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 bg-muted p-1 rounded-full border border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme('light')}
        className={`h-8 w-8 rounded-full ${theme === 'light' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme('warm')}
        className={`h-8 w-8 rounded-full ${theme === 'warm' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
        title="Warm Mode"
      >
        <Sunrise className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme('dark')}
        className={`h-8 w-8 rounded-full ${theme === 'dark' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

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

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {!isLoginPage && (
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 cursor-pointer">
              <span className="text-sm font-semibold text-primary">A</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
