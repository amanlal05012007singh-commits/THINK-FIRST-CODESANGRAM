import React from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, PlayCircle, BarChart2, CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Topics() {
  const navigate = useNavigate();
  const { subject } = useParams();
  const [selectedClass, setSelectedClass] = React.useState("Class 12");

  React.useEffect(() => {
    const storedClass = localStorage.getItem('thinkfirst_user_class');
    if (storedClass) {
      setSelectedClass(storedClass);
    }
  }, []);

  // Mock data based on route param
  const subjectName = subject === 'mathematics' ? 'Mathematics' : subject === 'chemistry' ? 'Physical Chemistry' : 'Physics';
  
  const allTopics = {
    physics: [
      { id: 'light-reflection', name: 'Light - Reflection & Refraction', difficulty: 'Medium', questions: 35, mastered: false, progress: 10, targetClass: 'Class 10' },
      { id: 'electricity-10', name: 'Electricity', difficulty: 'Hard', questions: 40, mastered: false, progress: 0, targetClass: 'Class 10' },
      { id: 'kinematics', name: 'Kinematics', difficulty: 'Medium', questions: 50, mastered: false, progress: 20, targetClass: 'Class 11' },
      { id: 'thermodynamics-phys', name: 'Thermodynamics', difficulty: 'Hard', questions: 45, mastered: false, progress: 0, targetClass: 'Class 11' },
      { id: 'electrostatics', name: 'Electrostatics', difficulty: 'Hard', questions: 45, mastered: false, progress: 40, targetClass: 'Class 12' },
      { id: 'current-electricity', name: 'Current Electricity', difficulty: 'Medium', questions: 38, mastered: true, progress: 100, targetClass: 'Class 12' },
      { id: 'friction', name: 'Friction & Mechanics', difficulty: 'Medium', questions: 52, mastered: false, progress: 15, targetClass: 'Class 12' },
    ],
    mathematics: [
      { id: 'quadratics', name: 'Quadratic Equations', difficulty: 'Medium', questions: 40, mastered: false, progress: 10, targetClass: 'Class 10' },
      { id: 'trigonometry-10', name: 'Introduction to Trigonometry', difficulty: 'Hard', questions: 45, mastered: false, progress: 0, targetClass: 'Class 10' },
      { id: 'sets', name: 'Sets', difficulty: 'Easy', questions: 30, mastered: true, progress: 100, targetClass: 'Class 11' },
      { id: 'limits', name: 'Limits and Derivatives', difficulty: 'Hard', questions: 50, mastered: false, progress: 5, targetClass: 'Class 11' },
      { id: 'integration', name: 'Integration', difficulty: 'Hard', questions: 60, mastered: false, progress: 20, targetClass: 'Class 12' },
      { id: 'matrices', name: 'Matrices', difficulty: 'Easy', questions: 30, mastered: true, progress: 100, targetClass: 'Class 12' },
      { id: 'probability', name: 'Probability', difficulty: 'Medium', questions: 45, mastered: false, progress: 50, targetClass: 'Class 12' },
    ],
    chemistry: [
      { id: 'chemical-reactions', name: 'Chemical Reactions', difficulty: 'Easy', questions: 30, mastered: false, progress: 10, targetClass: 'Class 10' },
      { id: 'acids-bases', name: 'Acids, Bases and Salts', difficulty: 'Medium', questions: 35, mastered: false, progress: 0, targetClass: 'Class 10' },
      { id: 'equilibrium-11', name: 'Equilibrium', difficulty: 'Hard', questions: 50, mastered: false, progress: 10, targetClass: 'Class 11' },
      { id: 'structure-atom', name: 'Structure of Atom', difficulty: 'Medium', questions: 45, mastered: true, progress: 100, targetClass: 'Class 11' },
      { id: 'thermodynamics', name: 'Thermodynamics', difficulty: 'Hard', questions: 55, mastered: false, progress: 10, targetClass: 'Class 12' },
      { id: 'mole-concept', name: 'Mole Concept', difficulty: 'Medium', questions: 40, mastered: true, progress: 100, targetClass: 'Class 12' },
      { id: 'chemical-equilibrium', name: 'Chemical Equilibrium', difficulty: 'Hard', questions: 48, mastered: false, progress: 5, targetClass: 'Class 12' },
    ]
  };

  const subjectTopics = allTopics[subject] || allTopics.physics;
  const topics = subjectTopics.filter(topic => topic.targetClass === selectedClass);

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
          <Button variant="ghost" className="mb-6 -ml-4" onClick={() => navigate('/subjects')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subjects
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{subjectName} Topics</h1>
            <p className="text-muted-foreground">Select a specific chapter to start reasoning practice.</p>
          </div>

          <div className="space-y-4">
            {topics.map(topic => (
              <Card key={topic.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold">{topic.name}</h3>
                        {topic.mastered && (
                          <Badge variant="success" className="h-5 px-1.5 rounded-sm">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Mastered
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                        <span className="flex items-center">
                          <BarChart2 className="h-4 w-4 mr-1" /> {topic.questions} Questions
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <div className="w-full sm:w-32 hidden md:block">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{topic.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${topic.progress}%` }}></div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => navigate(`/practice/${topic.id}`)}
                        className={`w-full sm:w-auto ${topic.mastered ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        {topic.mastered ? 'Review Again' : 'Start Practice'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
