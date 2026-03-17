import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BrainCircuit, ArrowRight, Mail, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';

// Import the generated image
import StudentLoginImage from '../assets/login-student.png';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login and redirect to landing page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex selection:bg-primary/20 font-sans">
      
      {/* Left Side: Image Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-start bg-muted/20 p-12 overflow-hidden border-r border-border/50">
        
        {/* Top left logo */}
        <div className="flex items-center space-x-3 cursor-pointer z-20 mb-16" onClick={() => navigate('/')}>
           <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
             <BrainCircuit className="h-6 w-6 text-primary-foreground" />
           </div>
           <span className="font-extrabold text-2xl tracking-tight text-foreground">ThinkFirst</span>
        </div>
        
        <div className="flex flex-col flex-1 max-w-xl mx-auto z-20">
          {/* Marketing Text */}
          <div className="mb-8 animate-fade-in">
             <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs bg-primary/10 text-primary font-bold mb-6 border border-primary/20 shadow-sm">
               Built for Class 10–12 Students | Math • Physics • Chemistry
             </div>
             <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.15]">
               Train Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Brain</span>,<br/>
               Not Just Your Answers.
             </h1>
             <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-6">
               ThinkFirst analyzes your step-by-step problem-solving approach, detects mistakes in your thinking, and helps you improve faster with real-time insights.
             </p>
             
             {/* Feature Highlights Group */}
             <div className="space-y-3 mb-8">
                 {[
                   "Tracks your step-by-step reasoning",
                   "Detects mistakes instantly",
                   "Shows personalized improvement insights"
                 ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium font-sans">
                         <div className="bg-green-500/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-green-500" /></div>
                         {feat}
                      </div>
                 ))}
             </div>
          </div>

          {/* The Image */}
          {/* Bonus Interactive Live Preview Panel */}
          <div className="relative w-full rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl overflow-hidden p-6 animate-in slide-in-from-bottom-5 duration-700">
               <div className="absolute top-0 right-0 p-4">
                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary flex items-center gap-1"> <Sparkles className="h-3 w-3" /> Live Analysis </Badge>
               </div>
               <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-muted-foreground mb-4">Thinking Flow Tracker</h4>
               
               <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl border bg-background/80 shadow-sm animate-in fade-in duration-300">
                         <div className="flex items-center gap-3">
                             <span className="text-xs font-bold h-6 w-6 rounded-full bg-muted flex items-center justify-center">1</span>
                             <span className="text-sm font-medium">Identify Concept</span>
                         </div>
                         <span className="text-red-500 text-xs font-semibold flex items-center gap-1">Concept Mistake ❌</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-green-500/30 bg-green-500/5 shadow-sm animate-in fade-in duration-500">
                         <div className="flex items-center gap-3">
                             <span className="text-xs font-bold h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center">2</span>
                             <span className="text-sm font-semibold">Formula Setup `v = u + at`</span>
                         </div>
                         <span className="text-green-500 text-xs font-semibold whitespace-nowrap">Correct ✅</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 shadow-sm animate-in fade-in duration-700">
                         <div className="flex items-center gap-3">
                             <span className="text-xs font-bold h-6 w-6 rounded-full bg-yellow-500 text-white flex items-center justify-center">3</span>
                             <span className="text-sm font-semibold">Substitution `v = 0 + (3)(4)`</span>
                         </div>
                         <span className="text-yellow-500 text-xs font-semibold flex items-center gap-1 whitespace-nowrap">Calculation Mistake ⚠️</span>
                    </div>
               </div>
          </div>
        </div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl opacity-50 pointer-events-none"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-background">
        
        {/* Mobile Header / Logo (Only visible on small screens) */}
        <div className="absolute top-6 left-6 flex lg:hidden items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">ThinkFirst</span>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 mb-3">Unlock Your Full Potential</h2>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your journey and master problem-solving.
            </p>
          </div>

          <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardContent className="p-8 pt-8">
              {/* Google Sign In - Elevated To Top */}
              <Button variant="outline" type="button" className="w-full h-12 rounded-xl border-border bg-card hover:bg-muted/50 transition-all font-semibold text-foreground flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/40" />
                </div>
                <div className="flex items-center justify-center w-full">
                  <span className="px-3 text-xs text-muted-foreground uppercase bg-card z-10">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                 {/* Email Input */}
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
                   <div className="relative">
                       <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                       <Input 
                          id="email"
                          type="email" 
                          placeholder="name@example.com" 
                          className="h-12 pl-10 bg-muted/30 border-border/40 focus-visible:ring-primary focus-visible:bg-background transition-all"
                          required
                       />
                   </div>
                 </div>

                 {/* Password Input */}
                 <div className="space-y-2">
                   <div className="flex items-center justify-between">
                     <label htmlFor="password" className="text-sm font-semibold text-foreground">Password</label>
                     <a href="#" className="text-xs font-medium text-primary/80 hover:text-primary transition-colors">Forgot password?</a>
                   </div>
                   <div className="relative">
                       <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                       <Input 
                          id="password"
                          type="password" 
                          placeholder="••••••••" 
                          className="h-12 pl-10 bg-muted/30 border-border/40 focus-visible:ring-primary focus-visible:bg-background transition-all"
                          required
                       />
                   </div>
                 </div>

                 {/* Login Button */}
                 <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:opacity-95 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5 mt-4">
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
                 
                 <p className="text-center text-[11px] text-muted-foreground mt-4">
                    Trusted by students improving their problem-solving skills daily
                 </p>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center bg-muted/20 border-t border-border/50 p-6">
              <p className="text-sm text-foreground">
                Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline underline-offset-4">Sign up for free</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
