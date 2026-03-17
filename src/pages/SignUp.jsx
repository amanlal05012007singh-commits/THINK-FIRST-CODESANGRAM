import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BrainCircuit, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

// We can reuse the same image from Login
import StudentLoginImage from '../assets/login-student.png';

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Basic validation for step 1 could go here
    if (formData.name && formData.className && formData.dob) {
        setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Basic validation for step 2
    if (formData.email && formData.password && formData.password === formData.confirmPassword) {
      // Mock saving user session
      localStorage.setItem('thinkfirst_user_name', formData.name);
      localStorage.setItem('thinkfirst_user_email', formData.email);
      if (formData.className) {
        localStorage.setItem('thinkfirst_user_class', formData.className);
      }
      if (formData.dob) {
        localStorage.setItem('thinkfirst_user_dob', formData.dob);
      }
      navigate('/dashboard');
    } else if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
    }
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
          <div className="mb-12">
             <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs bg-primary/10 text-primary font-bold mb-6 border border-primary/20">
               Start Your Journey
             </div>
             <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.15]">
               Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Potential</span>,<br/>
               Master Every Subject.
             </h1>
             <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
               Join ThinkFirst today and discover a smarter way to learn and improve your reasoning skills.
             </p>
          </div>

          {/* The Image */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-background/50 backdrop-blur-sm group">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                 src={StudentLoginImage} 
                 alt="Student studying thoughtfully" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
          </div>
        </div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl opacity-50 pointer-events-none"></div>
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative bg-background">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center space-x-2 cursor-pointer z-20" onClick={() => navigate('/')}>
           <div className="bg-primary p-1.5 rounded-lg">
             <BrainCircuit className="h-6 w-6 text-primary-foreground" />
           </div>
           <span className="font-bold text-xl tracking-tight text-foreground">ThinkFirst</span>
        </div>

        <div className="w-full max-w-md mt-16 lg:mt-0">
          <div className="text-center mb-10 text-foreground">
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">Create an Account</h2>
            <p className="text-muted-foreground">
              {step === 1 ? "Let's get to know you first." : "Secure your account."}
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl shadow-primary/5 border border-border p-8 mb-6">
            
            {/* Form Step Indicator */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10 transform -translate-y-1/2"></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-background ${step >= 1 ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>1</div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-background ${step >= 2 ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>2</div>
            </div>

            <form onSubmit={step === 1 ? handleNextStep : handleSignUp} className="space-y-5">
              
              {/* --- STEP 1 --- */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="name">Full Name</label>
                    <Input 
                      id="name" 
                      name="name"
                      type="text" 
                      placeholder="e.g. Aman Lal Singh" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="className">Class / Grade</label>
                    <select
                      id="className" 
                      name="className"
                      required 
                      value={formData.className}
                      onChange={handleInputChange}
                      className="w-full h-12 px-3 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl text-foreground appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select your class</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="dob">Date of Birth</label>
                    <Input 
                      id="dob" 
                      name="dob"
                      type="date" 
                      required 
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="h-12 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* --- STEP 2 --- */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="email">Email Address</label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="password">Password</label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-12 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-sm font-semibold text-foreground/80 pl-1" htmlFor="confirmPassword">Retype Password</label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-12 bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-primary transition-all rounded-xl"
                    />
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <Button type="button" variant="outline" onClick={handlePreviousStep} className="h-12 w-16 rounded-xl border-border px-0 flex-shrink-0">
                       <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button type="submit" className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all">
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:text-accent font-semibold transition-colors">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
