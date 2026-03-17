import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Clock, Calculator, Lightbulb, MessageSquare, BookOpen, Send, CheckCircle2, XCircle, PanelRightOpen, PanelRightClose, Unlock, Star, Trophy, ArrowLeft, Image, BarChart2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';

export default function QuestionPractice() {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const topicQuestions = questions ? questions.filter(q => q.topicId === topic) : [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = topicQuestions.length > 0 ? topicQuestions[currentQuestionIndex] : (questions && questions.length > 0 ? questions[0] : null);

  const solutionRef = useRef(null);

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setHintsUsed(0);
    setSolutionStep(0);
    setInputValue("");
    setTimeLeft(300);
    setSolutionUnlocked(false);
    setShowToast(false);
    setMessages([{ role: 'ai', content: "Let's work through this new problem! Show me your reasoning step by step." }]);
  };
  
  const [timeLeft, setTimeLeft] = useState(300);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solutionStep, setSolutionStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [solutionUnlocked, setSolutionUnlocked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your reasoning coach. Let's work through this problem step-by-step. Remember, don't just guess the answer—show me how you think about it." }
  ]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Solution Analysis States
  const [analysisStats, setAnalysisStats] = useState({
    accuracy: 94,
    mistakes: [],
    conceptScore: 100,
    formulaScore: 85,
    calcScore: 90,
    suggestions: ["Identify values for 'u', 'a', and 't' to structure variables."]
  });

  const [solveSteps, setSolveSteps] = useState([
    { id: 1, label: "Concept", text: "", status: "Pending" },
    { id: 2, label: "Formula", text: "", status: "Pending" },
    { id: 3, label: "Variables", text: "", status: "Pending" },
    { id: 4, label: "Calculation", text: "", status: "Pending" }
  ]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Sync Saved State
  useEffect(() => {
    if (currentQuestion) {
      const saved = JSON.parse(localStorage.getItem('thinkfirst_saved_questions') || '[]');
      setIsSaved(saved.some(q => q.id === currentQuestion.id));
    }
  }, [currentQuestion]);

  // Solution Analysis Parser 
  useEffect(() => {
    if (!currentQuestion || !currentQuestion.ideal) return;

    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    const text = lastUserMsg.content.toLowerCase().replace(/\s+/g, '');
    const ideal = currentQuestion.ideal;

    setSolveSteps(prev => prev.map(step => {
      let isCorrect = false;
      if (step.label === "Concept") isCorrect = ideal.concept.some(c => text.includes(c.toLowerCase()));
      if (step.label === "Formula") isCorrect = ideal.formula.some(f => text.includes(f.toLowerCase()));
      if (step.label === "Variables") isCorrect = ideal.substitution.some(s => text.includes(s.toLowerCase()));
      if (step.label === "Calculation") isCorrect = ideal.calculation.some(c => text.includes(c.toLowerCase()));

      if (isCorrect) {
        // Adjust points or metrics
        setAnalysisStats(prevStats => ({
           ...prevStats,
           formulaScore: step.label === "Formula" ? 100 : prevStats.formulaScore,
           conceptScore: step.label === "Concept" ? 100 : prevStats.conceptScore,
           calcScore: step.label === "Calculation" ? 100 : prevStats.calcScore,
           suggestions: ["Great work on the " + step.label + "! Move to next step."]
        }));
        return { ...step, text: lastUserMsg.content, status: "Correct" };
      }
      return step;
    }));
  }, [messages, currentQuestion]);

  const toggleSave = () => {
    const saved = JSON.parse(localStorage.getItem('thinkfirst_saved_questions') || '[]');
    if (isSaved) {
      const updated = saved.filter(q => q.id !== currentQuestion.id);
      localStorage.setItem('thinkfirst_saved_questions', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      saved.push({
        id: currentQuestion.id,
        topicId: topic || currentQuestion.topicId,
        subjectId: currentQuestion.subjectId,
        questionText: currentQuestion.questionText,
        difficulty: currentQuestion.difficulty,
        topicName: currentQuestion.topicName || topic
      });
      localStorage.setItem('thinkfirst_saved_questions', JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
         alert("Image must be less than 5MB");
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
         setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedImage) return;
    
    const newMessage = { 
      role: 'user', 
      content: inputValue,
      image: attachedImage 
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setAttachedImage(null);
    
    // Simple mock response logic based on solution stage
    setTimeout(() => {
      let aiResponse = "";
      const cleanInput = inputValue.toLowerCase().replace(/\s+/g, '');
      const correctOpt = currentQuestion.options ? currentQuestion.options.find(o => o.isCorrect) : null;
      const correctText = correctOpt ? correctOpt.text.toLowerCase().replace(/\s+/g, '') : "";

      const matchByOption = correctText && correctText.includes(cleanInput) && cleanInput.length >= 1;
      const matchBySolution = currentQuestion.solution && currentQuestion.solution.toLowerCase().replace(/\s+/g, '').includes(cleanInput) && cleanInput.length >= 2;

      if (cleanInput.length >= 1 && (matchByOption || matchBySolution)) {
        aiResponse = "🎉 Hurrayyy! That is absolutely the Right Answer! Excellent reasoning and derivation. 🚀";
        setSolutionStep(4);
        
        setSolveSteps(prev => prev.map(step => ({
          ...step,
          status: "Correct",
          text: step.text || (step.label === "Calculation" ? inputValue : "Verified ✔️")
        })));

        setAnalysisStats({
          accuracy: 100,
          mistakes: [],
          conceptScore: 100,
          formulaScore: 100,
          calcScore: 100,
          suggestions: ["Excellent job! You correctly solved this problem fully."]
        });
      } else if (currentQuestion.id === "phys_12_01" || currentQuestion.id === "phys_01") {
        if (solutionStep === 0 && inputValue.toLowerCase().includes("force")) {
          aiResponse = "Excellent! You've correctly identified that this involves electrostatic force. Now, what's the appropriate formula?";
          setSolutionStep(1);
        } else if (solutionStep === 1 && inputValue.toLowerCase().includes("kq1q2")) {
          aiResponse = "Perfect formula selection (Coulomb's Law). Now try substituting the values from the problem.";
          setSolutionStep(2);
        } else if (solutionStep === 2 && inputValue.includes("10^-6")) {
          aiResponse = "Great unit conversion! You caught that microcoloumbs need to be changed to Coloumbs. Now perform the final calculation.";
          setSolutionStep(3);
        } else {
          aiResponse = "That's not quite right. Think about the physical principles involved. Use a hint if you're stuck.";
        }
      } else {
        if (solutionStep === 0) {
          aiResponse = "Good start! You're analyzing the problem. What concept or formula should we apply next?";
          setSolutionStep(1);
        } else if (solutionStep === 1) {
          aiResponse = "Makes sense. Now, try setting up the equation or applying the formula with the given values.";
          setSolutionStep(2);
        } else if (solutionStep === 2) {
          aiResponse = "You're on the right track! Go ahead and calculate the final answer representing the result.";
          setSolutionStep(3);
        } else {
          aiResponse = "Let's review the final steps and see if the reasoning holds up.";
        }
      }
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
    
    setInputValue("");
  };

  const requestHint = () => {
    if (hintsUsed >= 3) return;
    const hintIndex = hintsUsed;
    setHintsUsed(hintsUsed + 1);
    
    let hintMsg = "";
    if (currentQuestion.hints && currentQuestion.hints.length > 0) {
      hintMsg = `Hint ${hintIndex + 1}: ${currentQuestion.hints[hintIndex % currentQuestion.hints.length]}`;
    } else if (currentQuestion.reasoningSteps && currentQuestion.reasoningSteps.length > 0) {
      hintMsg = `Hint ${hintIndex + 1}: ${currentQuestion.reasoningSteps[hintIndex % currentQuestion.reasoningSteps.length]}`;
    } else {
      if (hintIndex === 0) hintMsg = "Hint 1 (Concept): Think about what principle applies here.";
      if (hintIndex === 1) hintMsg = "Hint 2 (Formula): Identify the key formula needed.";
      if (hintIndex === 2) hintMsg = "Hint 3 (Calculation): Substitute the given values carefully.";
    }
    
    setMessages(prev => [...prev, { role: 'ai', content: hintMsg, isHint: true }]);
  };

  const handleOptionSelect = (option) => {
    // Determine points difficulty
    const value = currentQuestion.difficulty === 'Hard' ? 5 : currentQuestion.difficulty === 'Medium' ? 3 : 1;
    
    if (option.isCorrect) {
      const currentPoints = parseInt(localStorage.getItem('thinkfirst_user_points') || '0');
      localStorage.setItem('thinkfirst_user_points', (currentPoints + value).toString());
      setMessages(prev => [...prev, { role: 'ai', content: `🎉 Correct answer! You've earned +${value} points.` }]);
      
      // Points Popup triggering logic simulation
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setMessages(prev => [...prev, { role: 'ai', content: "❌ Not quite right. Let's review the step or use a hint!" }]);
    }
  };

  const handleUnlockSolution = () => {
    setSolutionUnlocked(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    setTimeout(() => {
      if (solutionRef.current) {
        solutionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleBack = () => {
    if (currentQuestion && currentQuestion.subjectId) {
      navigate(`/topics/${currentQuestion.subjectId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
           <Card className="max-w-md w-full text-center p-8 border-dashed">
             <CardHeader>
               <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/40 mb-2" />
               <CardTitle className="text-xl">Questions Not Found</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground text-sm mb-6">We couldn't retrieve practice items for this topic ID: "{topic}".</p>
               <Button onClick={() => navigate('/subjects')} className="w-full">
                 Back to Subjects
               </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    );
  }

  const questionText = currentQuestion.questionText;

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      <Navbar />

      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-5 duration-300">
          <Unlock className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">Solution Unlocked!</p>
            <p className="text-xs text-green-100">Scroll down to see the full solution.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-2 text-green-200 hover:text-white">
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {/* Top action bar */}
      <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1 pr-3 pl-1.5 font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-lg" onClick={handleBack}>
             <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="h-4 w-px bg-border/60 mx-1" />
          <Badge variant="outline" className="text-muted-foreground border-border">{currentQuestion.topicName || topic || "Topic"}</Badge>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="h-7 w-7 rounded-full flex items-center justify-center border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
              title="Previous Question"
            >‹</button>
            <div className="text-sm font-medium">Question {currentQuestionIndex + 1} of {topicQuestions.length > 0 ? topicQuestions.length : 1}</div>
            <button
              onClick={() => goToQuestion(Math.min(topicQuestions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex >= topicQuestions.length - 1}
              className="h-7 w-7 rounded-full flex items-center justify-center border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
              title="Next Question"
            >›</button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center font-mono font-medium bg-background px-3 py-1 rounded border shadow-sm text-yellow-600 dark:text-yellow-400">
             <Trophy className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
             +{currentQuestion.difficulty === 'Hard' ? '5' : currentQuestion.difficulty === 'Medium' ? '3' : '1'} pts
          </div>
          <div className={`flex items-center font-mono font-medium ${timeLeft < 60 ? 'text-destructive animate-pulse' : ''} bg-background px-3 py-1 rounded border shadow-sm`}>
            <Clock className="h-4 w-4 mr-2" />
            {formatTime(timeLeft)}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            className={isCalculatorOpen ? 'bg-primary/10 border-primary block md:block' : 'hidden md:flex'}
          >
            <Calculator className="h-4 w-4 mr-2" /> Calculator
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            {isSidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Main split layout container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Question Content */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Badge variant="outline">{currentQuestion.difficulty || "Hard"}</Badge>
              <span>Estimated Time: 5 mins</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSave} className={`rounded-full transition-all hover:bg-muted ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}>
              <Star className="h-5 w-5" />
              <span className="sr-only">Save Question</span>
            </Button>
          </div>
          
          <h2 className="text-2xl font-bold leading-relaxed">{questionText}</h2>
          
          {/* Concept Helper Box */}
          <Card className="bg-primary/5 border-primary/20 mt-8">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm flex items-center text-primary">
                <BookOpen className="h-4 w-4 mr-2" /> Concept Helper
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2 text-sm">
              <p>Consider the core principles and formulas applicable to this specific problem.</p>
              {(currentQuestion.id === "phys_12_01" || currentQuestion.id === "phys_01") && (
              <div className="bg-background p-3 rounded border font-mono text-xs mt-2">
                k = 9 × 10^9 N·m²/C²<br/>
                1 µC = 10^-6 C
              </div>
              )}
            </CardContent>
          </Card>

          {/* Solution Card — shown after unlocking */}
          {solutionUnlocked && currentQuestion.solution && (
            <div ref={solutionRef}>
              <Card className="bg-green-500/5 border-green-500/30 mt-6">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm flex items-center text-green-700 dark:text-green-400">
                    <Unlock className="h-4 w-4 mr-2" /> Full Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed text-foreground bg-background rounded-lg p-4 border border-green-500/20">{currentQuestion.solution}</pre>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics View Toggle Button */}
          <Button 
             variant="outline" 
             className="w-full mt-4 flex items-center justify-center gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 rounded-xl py-5 font-semibold animate-in fade-in-50 duration-300"
             onClick={() => setShowAnalytics(!showAnalytics)}
          >
             <BarChart2 className="h-4 w-4" />
             {showAnalytics ? "Hide Performance Analytics" : "View Performance Analytics"}
          </Button>

          {/* Live System Diagnostics Feedback Panel */}
          {showAnalytics && (
             <Card className="border border-primary/20 bg-muted/20 shadow-sm mt-6">
                <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b bg-background">
                   <div className="flex items-center gap-2">
                       <BarChart2 className="h-4 w-4 text-primary" />
                       <CardTitle className="text-sm font-semibold">Live Solution Analytics</CardTitle>
                   </div>
                   <Badge variant="outline" className={`${analysisStats.accuracy > 80 ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'}`}>Accuracy: {analysisStats.accuracy}%</Badge>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {solveSteps.map(step => (
                             <div key={step.id} className={`p-3 rounded-xl border bg-background/90 ${step.status === 'Correct' ? 'border-green-500/30 bg-green-500/5' : 'border-border'}`}>
                                 <div className="flex justify-between items-center mb-1">
                                     <span className="text-xs font-semibold text-muted-foreground">{step.label}</span>
                                     {step.status === 'Correct' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Clock className="h-3.5 w-3.5 text-muted-foreground/30" />}
                                 </div>
                                 <p className="text-xs truncate">{step.text || "Pending..."}</p>
                             </div>
                         ))}
                     </div>

                     <div className="grid grid-cols-3 gap-3">
                         <div className="p-2 border rounded-lg bg-background">
                             <span className="text-[10px] text-muted-foreground">Concept</span>
                             <div className="h-1.5 bg-muted rounded-full mt-1"><div className="h-full bg-green-500 rounded-full" style={{width: `${analysisStats.conceptScore}%`}}></div></div>
                         </div>
                         <div className="p-2 border rounded-lg bg-background">
                             <span className="text-[10px] text-muted-foreground">Formula</span>
                             <div className="h-1.5 bg-muted rounded-full mt-1"><div className="h-full bg-blue-500 rounded-full" style={{width: `${analysisStats.formulaScore}%`}}></div></div>
                         </div>
                         <div className="p-2 border rounded-lg bg-background">
                             <span className="text-[10px] text-muted-foreground">Calculation</span>
                             <div className="h-1.5 bg-muted rounded-full mt-1"><div className="h-full bg-orange-500 rounded-full" style={{width: `${analysisStats.calcScore}%`}}></div></div>
                         </div>
                     </div>

                     <div className="pt-2 border-t">
                         <h4 className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center">💡 Next Step Suggestions</h4>
                         {analysisStats.suggestions.map((s, i) => (
                             <p key={i} className="text-xs text-foreground bg-primary/5 p-2 rounded-md border border-primary/10 mb-1">{s}</p>
                         ))}
                     </div>
                </CardContent>
             </Card>
          )}

          {/* Previous / Next Question navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
            <Button
              variant="outline"
              onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border-2 hover:bg-muted disabled:opacity-30"
            >
              ← Previous Question
            </Button>

            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                {currentQuestionIndex + 1} / {topicQuestions.length > 0 ? topicQuestions.length : 1}
              </span>
              
              {currentQuestionIndex === topicQuestions.length - 1 && topicQuestions.length > 0 && (
                <Button 
                  onClick={() => {
                    // Record completion and navigate back to dashboard
                    localStorage.setItem(`thinkfirst_completed_${topic}`, 'true');
                    navigate('/dashboard');
                  }} 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg animate-in zoom-in-50 duration-300"
                >
                  Submit Practice
                </Button>
              )}
            </div>

            <Button
              onClick={() => goToQuestion(Math.min(topicQuestions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex >= topicQuestions.length - 1}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md disabled:opacity-30"
            >
              Next Question →
            </Button>
          </div>

          {/* Calculator Overlay */}
          {isCalculatorOpen && (
            <Card className="absolute top-6 left-1/2 -translate-x-1/2 w-64 shadow-xl border-border z-20">
              <CardHeader className="py-2 px-3 border-b bg-muted/50 flex flex-row items-center justify-between">
                <span className="text-xs font-semibold">Calculator</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setIsCalculatorOpen(false)}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-3">
                <Input 
                  value={calcInput} 
                  onChange={(e) => setCalcInput(e.target.value)} 
                  placeholder="e.g. 9*10^9 * 4*10^-6"
                  className="font-mono text-xs h-8 mb-2"
                />
                <div className="grid grid-cols-4 gap-1 text-xs">
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "7")}>7</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "8")}>8</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "9")}>9</Button>
                  <Button variant="outline" size="sm" onClick={() => setCalcInput(calcInput + "/")}>/</Button>
                  
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "4")}>4</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "5")}>5</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "6")}>6</Button>
                  <Button variant="outline" size="sm" onClick={() => setCalcInput(calcInput + "*")}>*</Button>
                  
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "1")}>1</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "2")}>2</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "3")}>3</Button>
                  <Button variant="outline" size="sm" onClick={() => setCalcInput(calcInput + "-")}>-</Button>
                  
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + "0")}>0</Button>
                  <Button variant="secondary" size="sm" onClick={() => setCalcInput(calcInput + ".")}>.</Button>
                  <Button onClick={() => {
                    try { setCalcInput(eval(calcInput.replace('^', '**')).toString()) } 
                    catch { setCalcInput("Error") }
                  }} size="sm" className="col-span-2">=</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side: AI Coach / Solution Input */}
        <div className={`w-full md:w-[400px] lg:w-[450px] border-l flex flex-col bg-muted/10 ${isSidebarOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="p-4 border-b bg-background flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" /> AI Reasoning Coach
            </h3>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i < hintsUsed ? 'bg-yellow-500' : 'bg-muted border border-border'}`} />
              ))}
            </div>
          </div>

          {/* Thinking Flow Visualization */}
          <div className="px-4 py-4 border-b bg-background/50">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Thinking Flow</h4>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-[10%] right-[10%] top-1/2 -mt-[1px] h-[2px] bg-muted/50 -z-10"></div>
              
              <div className="flex flex-col items-center gap-1 z-10 bg-background/80 px-1 rounded-full">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${solutionStep >= 0 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-muted text-muted-foreground'}`}>1</div>
                <span className="text-[10px] font-medium text-center leading-none">Understand<br/>Problem</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 z-10 bg-background/80 px-1 rounded-full">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${solutionStep >= 1 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-muted text-muted-foreground'}`}>2</div>
                <span className="text-[10px] font-medium text-center leading-none">Identify<br/>Concept</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 z-10 bg-background/80 px-1 rounded-full">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${solutionStep >= 2 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-muted text-muted-foreground'}`}>3</div>
                <span className="text-[10px] font-medium text-center leading-none">Select<br/>Formula</span>
              </div>
              
              <div className="flex flex-col items-center gap-1 z-10 bg-background/80 px-1 rounded-full">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${solutionStep >= 3 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-muted text-muted-foreground'}`}>4</div>
                <span className="text-[10px] font-medium text-center leading-none">Substitute<br/>& Calc</span>
              </div>
            </div>
            
            {solutionStep > 0 && solutionStep < 4 && (
              <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded p-2 text-xs flex items-start text-blue-800 dark:text-blue-300">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 mt-0.5 shrink-0" />
                <span>You've successfully completed stage {solutionStep}. Move to the next logical step.</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                    : msg.isHint 
                      ? 'bg-yellow-500/10 text-yellow-800 dark:text-yellow-200 border border-yellow-500/20 rounded-tl-sm'
                      : 'bg-card border-border border rounded-tl-sm'
                }`}>
                  {msg.image && (
                    <img src={msg.image} alt="User solution" className="max-w-xs h-auto rounded-lg mb-2 shadow-sm border border-border" />
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-background border-t">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center text-xs">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={requestHint} 
                  disabled={hintsUsed >= 3}
                  className="h-7 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                >
                  <Lightbulb className="h-3 w-3 mr-1" /> Get Hint ({3 - hintsUsed} left)
                </Button>
                {hintsUsed >= 3 && !solutionUnlocked && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-7 text-green-600 hover:text-green-700 font-semibold"
                    onClick={handleUnlockSolution}
                  >
                    <Unlock className="h-3 w-3 mr-1" /> Unlock Full Solution
                  </Button>
                )}
                {solutionUnlocked && (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Solution unlocked below
                  </span>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />

                {attachedImage && (
                  <div className="absolute bottom-14 left-0 p-2 bg-background border rounded-lg shadow-lg flex items-center gap-2 z-20 animate-in slide-in-from-bottom-2">
                    <img src={attachedImage} className="w-12 h-12 object-cover rounded border" />
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setAttachedImage(null)}>
                      <XCircle className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )}

                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute left-1 top-1.5 h-9 w-9 text-muted-foreground hover:text-primary z-10"
                >
                  <Image className="h-4 w-4" />
                </Button>

                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type reasoning or upload solution..." 
                  className="pl-11 pr-12 py-6 text-sm resize-none shadow-sm"
                />
                
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1.5 top-1.5 h-9 w-9"
                  disabled={!inputValue.trim() && !attachedImage}
                >
                  <Send className="h-4 w-4 mr-0.5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
