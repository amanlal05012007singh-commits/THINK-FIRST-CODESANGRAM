import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Atom, Calculator, FlaskConical, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Subjects() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Class 12");

  useEffect(() => {
    // Check local storage for the user's class preference
    const storedClass = localStorage.getItem('thinkfirst_user_class');
    if (storedClass) {
      setSelectedClass(storedClass);
    }
  }, []);

  const classes = ["Class 10", "Class 11", "Class 12"];

  const subjects = [
    {
      id: "physics",
      name: "Physics",
      icon: <Atom className="h-10 w-10 text-blue-500" />,
      description: "Mechanics, Electromagnetism, Optics, and Modern Physics",
      color: "bg-blue-500/10 border-blue-500/20",
      topicsCount: 15
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: <Calculator className="h-10 w-10 text-rose-500" />,
      description: "Calculus, Algebra, Coordinate Geometry, and Vectors",
      color: "bg-rose-500/10 border-rose-500/20",
      topicsCount: 18
    },
    {
      id: "chemistry",
      name: "Physical Chemistry",
      icon: <FlaskConical className="h-10 w-10 text-emerald-500" />,
      description: "Thermodynamics, Equilibrium, Electrochemistry, Kinetics",
      color: "bg-emerald-500/10 border-emerald-500/20",
      topicsCount: 12
    }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" className="mb-6 -ml-4 h-9 gap-1 font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-lg" onClick={() => navigate('/dashboard')}>
             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Button>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Select Your Subject</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-2">
              <span>Master your reasoning skills across different scientific disciplines for</span>
              <select 
                value={selectedClass} 
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  localStorage.setItem('thinkfirst_user_class', e.target.value);
                }}
                className="bg-primary/10 text-primary font-semibold border border-primary/20 rounded-md px-2 py-1 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <Card key={subject.id} className={`border-2 hover:shadow-md transition-all cursor-pointer ${subject.color}`} onClick={() => navigate(`/topics/${subject.id}`)}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-background p-4 rounded-full shadow-sm mb-4">
                    {subject.icon}
                  </div>
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                  <CardDescription className="pt-2 h-12">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center bg-background/50 border-t pt-4 mt-4 rounded-b-lg">
                  <Badge variant="secondary">{subject.topicsCount} Topics</Badge>
                  <Button variant="ghost" size="sm" className="px-2">
                    Start <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
