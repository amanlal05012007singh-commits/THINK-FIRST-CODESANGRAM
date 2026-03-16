import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Brain, Footprints, Lightbulb, LineChart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Reasoning Tracker",
      description: "We don't just check your final answer. We track how you approach and think through a problem.",
      icon: <Footprints className="h-6 w-6 text-primary" />,
    },
    {
      title: "Step-by-Step Analysis",
      description: "Get instant feedback on your specific reasoning steps and pinpoint exactly where you made a mistake.",
      icon: <Brain className="h-6 w-6 text-accent" />,
    },
    {
      title: "Smart Hint System",
      description: "Stuck? Get progressive hints that guide you to the solution instead of just handing you the answer.",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Progress Dashboard",
      description: "Monitor your thinking quality over time, track streaks, and visualize your improvement trends.",
      icon: <LineChart className="h-6 w-6 text-secondary" />,
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-8 animate-slide-up">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-muted/50 text-muted-foreground mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              The modern way to prepare for CBSE Board Exams
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Improve Your Thinking,<br />
              <span className="text-primary">Not Just Your Answers.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A reasoning-focused learning platform that monitors your pathways and helps you build stronger conceptual thinking through guided problem solving.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14" onClick={() => navigate('/dashboard')}>
                Start Solving <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why ThinkFirst?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Passive learning isn't enough. We actively evaluate your decision pathway to build robust problem-solving skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <Card key={idx} className="bg-background border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t py-8 mt-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ThinkFirst Education. All rights reserved.</p>
      </footer>
    </div>
  );
}
