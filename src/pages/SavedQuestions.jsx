import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Star, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavedQuestions() {
  const navigate = useNavigate();
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'solved', 'unsolved'

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('thinkfirst_saved_questions') || '[]');
    setSavedQuestions(saved);
  }, []);

  const removeBookmark = (id) => {
    const updated = savedQuestions.filter(q => q.id !== id);
    localStorage.setItem('thinkfirst_saved_questions', JSON.stringify(updated));
    setSavedQuestions(updated);
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-slide-up">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Important Questions</h1>
              <p className="text-muted-foreground">Your bookmarked and pinned revisions folder.</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
            <Button variant={filter === 'solved' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('solved')}>Solved</Button>
            <Button variant={filter === 'unsolved' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('unsolved')}>Unsolved</Button>
          </div>

          {savedQuestions.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Star className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-1">No saved questions yet</h3>
              <p className="text-muted-foreground text-sm mb-4">Bookmark questions while practicing to save them here.</p>
              <Button onClick={() => navigate('/subjects')}>Start Practice</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedQuestions.map((q) => (
                <Card key={q.id} className="border-border hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{q.topicName || "Topic"}</Badge>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty || "Hard"}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold leading-snug">{q.questionText}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => removeBookmark(q.id)} className="text-yellow-500 fill-yellow-500 rounded-full">
                          <Star className="h-5 w-5" />
                        </Button>
                        <Button onClick={() => navigate(`/practice/${q.topicId}`)} size="sm" className="hidden sm:flex">
                          Solve <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
