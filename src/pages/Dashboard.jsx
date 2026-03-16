import React from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { BrainCircuit, BookOpen, Flame, Target, AlertTriangle, ChevronRight, Lightbulb, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student!</h1>
            <p className="text-muted-foreground mt-1 text-lg">Your reasoning is improving. Keep it up!</p>
          </div>
          <Button onClick={() => navigate('/subjects')} size="lg" className="shadow-md">
            Start Practice <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Practice Score</CardTitle>
              <Trophy className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">82<span className="text-muted-foreground text-lg font-normal">/100</span></div>
              <p className="text-xs text-green-600 mt-1 flex items-center"><Target className="h-3 w-3 mr-1"/> +4 from last week</p>
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
      </main>
    </div>
  );
}
