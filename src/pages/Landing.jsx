import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Brain, Footprints, Lightbulb, LineChart, ArrowRight, CheckCircle2, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Reasoning Tracker",
      description: "Tracks how you approach each problem, from understanding to solution.",
      icon: <Footprints className="h-6 w-6 text-primary" />,
    },
    {
      title: "Step-by-Step Analysis",
      description: "Detects mistakes in your reasoning steps, not just the final answer.",
      icon: <Brain className="h-6 w-6 text-accent" />,
    },
    {
      title: "Smart Hint System",
      description: "Provides progressive hints instead of directly revealing solutions.",
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Progress Dashboard",
      description: "Tracks improvement and thinking quality over time with ThinkScore.",
      icon: <LineChart className="h-6 w-6 text-secondary" />,
    }
  ];

  const steps = [
    {
      num: "1",
      title: "Select Your Topic",
      description: "Choose your grade, subject, and topic from the curriculum."
    },
    {
      num: "2",
      title: "Solve Step-by-Step",
      description: "Write your solution with clear reasoning at each step."
    },
    {
      num: "3",
      title: "Get Smart Feedback",
      description: "Receive detailed analysis of your reasoning and hints to improve."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Students", icon: <Users className="h-5 w-5 mb-2 text-primary/80" /> },
    { value: "50K+", label: "Problems Solved", icon: <CheckCircle2 className="h-5 w-5 mb-2 text-secondary/80" /> },
    { value: "95%", label: "Improvement Rate", icon: <Award className="h-5 w-5 mb-2 text-accent/80" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20">
      <Navbar />
      
      <main className="flex-1">
        {/* Modern Hero Section with Soft Gradient Background */}
        <section className="relative w-full py-24 md:py-36 overflow-hidden flex flex-col items-center justify-center text-center px-4">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-primary/5 via-background to-background">
              <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl opacity-50"></div>
          </div>

          <div className="max-w-4xl space-y-8 animate-slide-up z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm bg-primary/5 text-primary font-medium mb-4 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-ping opacity-75"></span>
              <span className="flex absolute h-2 w-2 rounded-full bg-primary mr-2"></span>
              For Grades 10, 11 & 12
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
              Improve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Thinking</span>,<br />
              Not Just Your Answers.
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ThinkFirst monitors your reasoning pathways and helps you improve your problem-solving approach. We don't just check correctness—we analyze how you think.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1" onClick={() => navigate('/dashboard')}>
                Start Solving <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 bg-background/50 backdrop-blur-sm border-2 hover:bg-muted/50 transition-all">
                Learn More
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-16 max-w-3xl mx-auto border-t border-border/50 mt-12">
               {stats.map((stat, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-4">
                    {stat.icon}
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-muted/30 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">Why Choose ThinkFirst?</h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                We focus on building your reasoning skills, not just memorization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => (
                <Card key={idx} className="bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1">
                  <CardHeader className="p-6">
                    <div className="h-14 w-14 rounded-2xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-6 transition-colors shadow-inner">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl mb-3 font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 border-t border-border/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">How ThinkFirst Works</h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                 A simple, structured approach to mastering problem-solving.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-border via-primary/30 to-border z-0"></div>

               {steps.map((step, idx) => (
                 <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-background border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/20">
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-[280px]">
                      {step.description}
                    </p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Student Benefits Section */}
        <section className="w-full py-24 bg-gradient-to-b from-background via-muted/10 to-background border-y border-border/50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Student Benefits</h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                 Gain critical advantages beyond just scoring marks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col p-6 rounded-2xl bg-card border hover:border-primary/40 transition-all duration-300">
                <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Build Confidence</h4>
                <p className="text-muted-foreground">Understand the 'Why' behind every step, reducing exam anxiety and boosting self-reliance.</p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-card border hover:border-primary/40 transition-all duration-300">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">Dynamic Reasoning</h4>
                <p className="text-muted-foreground">Nurture structured logical deduction workflows that adapt to high-level entrance exams.</p>
              </div>
              <div className="flex flex-col p-6 rounded-2xl bg-card border hover:border-primary/40 transition-all duration-300">
                <LineChart className="h-10 w-10 text-secondary mb-4" />
                <h4 className="text-xl font-bold mb-2">Trackable Mastery</h4>
                <p className="text-muted-foreground">Visually see your performance map growing daily, allowing targeted effort adjustments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-24 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
           <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Think Better?</h2>
              <p className="text-xl mb-10 opacity-90">
                 Join thousands of students improving their reasoning and analytical skills today.
              </p>
              <Button size="lg" className="bg-background text-primary hover:bg-background/90 text-lg px-10 h-14 rounded-full shadow-2xl hover:scale-105 transition-transform" onClick={() => navigate('/dashboard')}>
                 Start Your Journey Today
              </Button>
           </div>
        </section>

      </main>
      
      <footer className="w-full border-t border-border/50 bg-background py-12 text-center">
        <div className="container mx-auto px-4 text-muted-foreground">
          <div className="flex justify-center items-center mb-4 text-xl font-bold text-foreground">
              <Brain className="h-6 w-6 mr-2 text-primary" />
              ThinkFirst
          </div>
          <p className="mb-6 max-w-md mx-auto">Empowering students to think critically and solve problems effectively.</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} ThinkFirst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
