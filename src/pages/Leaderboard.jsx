import React from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Trophy, Award, Medal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard() {
  const navigate = useNavigate();

  // Mock Leaderboard Data
  const leaderboardData = [
    { rank: 1, name: "Aarav Sharma", points: 452, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav" },
    { rank: 2, name: "Ishita Patel", points: 420, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita" },
    { rank: 3, name: "Rohan Verma", points: 398, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan" },
    { rank: 4, name: "Ananya Gupta", points: 385, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya" },
    { rank: 5, name: "Kabir Singh", points: 370, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kabir" },
    { rank: 6, name: "Sanya Roy", points: 355 },
    { rank: 7, name: "Aditya Das", points: 340 },
    { rank: 8, name: "Dia Sen", points: 325 },
    { rank: 9, name: "Arjun Nair", points: 310 },
    { rank: 10, name: "Meera Iyer", points: 295 }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400 fill-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600 fill-amber-600" />;
    return <span className="font-bold text-sm text-muted-foreground w-6 text-center">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-slide-up">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Global Leaderboard</h1>
            <p className="text-muted-foreground">Top thinkers pushing the boundaries of reasoning.</p>
          </div>

          {/* Top 3 Highlighting */}
          <div className="grid grid-cols-3 gap-4 mb-12 items-end max-w-2xl mx-auto">
             {/* Rank 2 */}
             <div className="flex flex-col items-center">
                <div className="relative mb-2">
                   <img src={leaderboardData[1].avatar} alt="" className="w-16 h-16 rounded-full border-4 border-gray-300 shadow-md bg-background" />
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-background">2</div>
                </div>
                <div className="text-center bg-card p-3 rounded-xl border border-border shadow-sm w-full">
                   <h4 className="font-bold text-sm truncate">{leaderboardData[1].name}</h4>
                   <p className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</p>
                </div>
             </div>

             {/* Rank 1 */}
             <div className="flex flex-col items-center">
                <div className="relative mb-3 transform -translate-y-4">
                   <img src={leaderboardData[0].avatar} alt="" className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-xl bg-background" />
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-background animate-pulse">1</div>
                </div>
                <div className="text-center bg-gradient-to-b from-yellow-500/5 to-transparent bg-card p-4 rounded-xl border border-yellow-500/30 shadow-md w-full">
                   <h4 className="font-extrabold text-base truncate text-yellow-600 dark:text-yellow-400">{leaderboardData[0].name}</h4>
                   <p className="font-bold text-sm text-yellow-600/80">{leaderboardData[0].points} pts</p>
                </div>
             </div>

             {/* Rank 3 */}
             <div className="flex flex-col items-center">
                <div className="relative mb-2">
                   <img src={leaderboardData[2].avatar} alt="" className="w-16 h-16 rounded-full border-4 border-amber-600 shadow-md bg-background" />
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-background">3</div>
                </div>
                <div className="text-center bg-card p-3 rounded-xl border border-border shadow-sm w-full">
                   <h4 className="font-bold text-sm truncate">{leaderboardData[2].name}</h4>
                   <p className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</p>
                </div>
             </div>
          </div>

          <Card className="border-border shadow-md">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg">Rankings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border">
                  {leaderboardData.map((student) => (
                     <div key={student.rank} className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${student.rank <= 3 ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                        <div className="flex items-center space-x-4">
                           <div className="w-8 flex justify-center">
                              {getRankIcon(student.rank)}
                           </div>
                           <div className="flex items-center space-x-3">
                              {student.avatar ? (
                                 <img src={student.avatar} alt="" className="w-8 h-8 rounded-full border bg-background" />
                              ) : (
                                 <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{student.name.split(' ').map(n=>n[0]).join('')}</div>
                              )}
                              <span className="font-medium text-sm">{student.name}</span>
                              {student.rank <= 10 && (
                                 <Badge variant="outline" className="text-[10px] h-4 px-1 border-primary/40 text-primary">Top 10</Badge>
                              )}
                           </div>
                        </div>
                        <div className="font-bold text-sm text-foreground">
                           {student.points} pts
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
