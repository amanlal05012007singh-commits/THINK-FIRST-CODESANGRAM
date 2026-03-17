import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { BrainCircuit, BookOpen, Flame, Target, AlertTriangle, ChevronRight, Lightbulb, Trophy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Student');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem('thinkfirst_user_name');
    if (storedName) {
      const firstName = storedName.split(' ')[0];
      setUserName(firstName);
    }
    const storedPoints = localStorage.getItem('thinkfirst_user_points');
    if (storedPoints) {
      setPoints(parseInt(storedPoints));
    }
  }, []);

  // Mock Calendar Events
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const activeStreaks = [4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20];
  const events = [
    { day: 8, type: 'holiday', title: 'Public Holiday: Holi' },
    { day: 15, type: 'quiz', title: 'Trigonometry Quiz 1' },
    { day: 22, type: 'exam', title: 'Calculus Mock Test' },
    { day: 28, type: 'task', title: 'Formula Sheet Revision' }
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              Welcome back, {userName}!
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 gap-1 px-2 py-1 flex items-center h-fit text-xs font-bold dark:bg-yellow-900/30 dark:text-yellow-400">
                <Trophy className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {points} PTS
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">Your reasoning is improving. Keep it up!</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Button onClick={() => navigate('/saved-questions')} size="lg" variant="outline" className="shadow-md bg-background hover:bg-muted/50 border border-yellow-500/30">
              <Star className="mr-2 h-4 w-4 text-yellow-500 fill-yellow-500" /> Important Questions
            </Button>
            <Button onClick={() => navigate('/subjects')} size="lg" className="shadow-md">
              Start Practice <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Practice Score</CardTitle>
              <Trophy className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{points}<span className="text-muted-foreground text-lg font-normal"> pts</span></div>
              <p className="text-xs text-green-600 mt-1 flex items-center"><Target className="h-3 w-3 mr-1"/> Accuracy: 76%</p>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
              <Flame className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12 <span className="text-muted-foreground text-lg font-normal">days</span></div>
              <p className="text-xs text-muted-foreground mt-1">Keep the momentum going!</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Topics Mastered</CardTitle>
              <BookOpen className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-xs text-muted-foreground mt-1">Out of 15 syllabus topics</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-primary">Accuracy Rate</CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">76%</div>
              <Progress value={76} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Top Performers / Leaderboard Preview */}
        <Card className="border-border shadow-sm mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" /> Top Performers
              </CardTitle>
              <CardDescription>The highest points scorers adapting reasoning solutions.</CardDescription>
            </div>
            <Button onClick={() => navigate('/leaderboard')} variant="outline" size="sm">
              View Leaderboard <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="flex items-center gap-3 p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
                <span className="font-bold text-lg text-yellow-600 dark:text-yellow-400">#1</span>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav" alt="" className="w-10 h-10 rounded-full border border-yellow-500/50 bg-background" />
                <div>
                   <h5 className="font-bold text-sm truncate">Aarav Sharma</h5>
                   <p className="text-xs text-muted-foreground">452 pts</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border">
                <span className="font-bold text-lg text-gray-400">#2</span>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita" alt="" className="w-10 h-10 rounded-full border bg-background" />
                <div>
                   <h5 className="font-bold text-sm truncate">Ishita Patel</h5>
                   <p className="text-xs text-muted-foreground">420 pts</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border">
                <span className="font-bold text-lg text-amber-600">#3</span>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" alt="" className="w-10 h-10 rounded-full border bg-background" />
                <div>
                   <h5 className="font-bold text-sm truncate">Rohan Verma</h5>
                   <p className="text-xs text-muted-foreground">398 pts</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thinking Pattern Detection */}
          <Card className="lg:col-span-1 border-border shadow-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" /> 
                Learning Insights
              </CardTitle>
              <CardDescription>Based on your recent practice sessions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Skipping Steps</span>
                  <Badge variant="warning">Frequent</Badge>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                  "You often skip concept identification and jump directly to formulas. Try to pause and identify the core concept first."
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Calculation Errors</span>
                  <Badge variant="destructive">Needs Work</Badge>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border">
                  "Your concepts are correct but calculation errors are reducing your score. Double-check your basic arithmetic."
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-2">Detailed Accuracy</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Concept Identification</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Formula Selection</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Calculation</span>
                      <span className="font-medium text-destructive">60%</span>
                    </div>
                    <Progress value={60} className="h-1.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thinking Heatmap */}
          <Card className="lg:col-span-2 border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Skill Mastery Matrix</CardTitle>
              <CardDescription>Visualizing your performance across topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-md">Topic</th>
                      <th className="px-4 py-3 text-center">Concept</th>
                      <th className="px-4 py-3 text-center">Formula</th>
                      <th className="px-4 py-3 text-center rounded-tr-md">Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-4 font-medium">Electrostatics</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="success" className="w-full justify-center">Strong</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="success" className="w-full justify-center">Strong</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="warning" className="w-full justify-center">Moderate</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-4 font-medium">Current Electricity</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="success" className="w-full justify-center">Strong</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="warning" className="w-full justify-center">Moderate</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="warning" className="w-full justify-center">Moderate</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-4 font-medium">Integration</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="warning" className="w-full justify-center">Moderate</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="destructive" className="w-full justify-center">Weak</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="destructive" className="w-full justify-center">Weak</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium">Thermodynamics</td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="destructive" className="w-full justify-center">Weak</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="success" className="w-full justify-center">Strong</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge variant="success" className="w-full justify-center">Strong</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-muted/40 rounded-lg flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold mb-1">Study Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    You have strong conceptual understanding in Physics but struggle with Integration in Math. Let's focus on identifying the correct substitution pattern before writing integrals. 
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar & Streak System */}
        <Card className="border-border shadow-sm mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Flame className="mr-2 h-5 w-5 text-orange-500" />
                Study Calendar & Consistency Streaks
              </CardTitle>
              <CardDescription>Visualizing your daily practice and upcoming deadlines.</CardDescription>
            </div>
            <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
               12 Day Streak
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-background/50 border rounded-xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">March 2026</h3>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="h-8 w-8 p-0">‹</Button>
                     <Button variant="outline" size="sm" className="h-8 w-8 p-0">›</Button>
                  </div>
               </div>
               <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-muted-foreground mb-4">
                  <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
               </div>
               <div className="grid grid-cols-7 gap-3">
                  {/* Empty cells for calendar offset (mock March 2026 starts on Sunday) */}
                  {daysInMonth.map((day) => {
                     const isStreak = activeStreaks.includes(day);
                     const hasEvent = events.find(e => e.day === day);
                     return (
                        <div key={day} className={`relative h-12 flex items-center justify-center rounded-lg border border-border/40 hover:border-primary/50 transition-colors cursor-pointer group ${isStreak ? 'bg-orange-500/10 border-orange-500/30 font-bold text-orange-600 dark:text-orange-400' : 'bg-background'}`}>
                           <span>{day}</span>
                           {hasEvent && (
                              <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${hasEvent.type === 'holiday' ? 'bg-gray-400' : hasEvent.type === 'quiz' ? 'bg-primary' : 'bg-destructive'}`} />
                           )}
                           {hasEvent && (
                              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs p-2 rounded shadow-md border -top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
                                 {hasEvent.title}
                              </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-muted-foreground justify-center">
               <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500/10 border border-orange-500/30 block"></span> Streak Day</div>
               <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary block"></span> Quiz</div>
               <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-destructive block"></span> Exam</div>
               <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 block"></span> Holiday</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
