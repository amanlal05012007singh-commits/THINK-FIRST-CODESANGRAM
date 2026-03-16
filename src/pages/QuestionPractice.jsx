import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Clock, Calculator, Lightbulb, MessageSquare, BookOpen, Send, CheckCircle2, XCircle, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuestionPractice() {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes standard
  const [hintsUsed, setHintsUsed] = useState(0);
  const [solutionStep, setSolutionStep] = useState(0); // 0: Understand, 1: Concept, 2: Formula, 3: Calculate
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your reasoning coach. Let's work through this problem step-by-step. Remember, don't just guess the answer—show me how you think about it." }
  ]);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    
    // Simple mock response logic based on solution stage
    setTimeout(() => {
      let aiResponse = "";
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
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
    
    setInputValue("");
  };

  const requestHint = () => {
    if (hintsUsed >= 3) return;
    setHintsUsed(hintsUsed + 1);
    
    let hintMsg = "";
    if (hintsUsed === 0) hintMsg = "Hint 1 (Concept): Consider what physical interaction occurs between two charged point particles.";
    if (hintsUsed === 1) hintMsg = "Hint 2 (Formula): You'll need Coulomb's Law: F = k * (|q1|*|q2|)/r².";
    if (hintsUsed === 2) hintMsg = "Hint 3 (Calculation): Don't forget that r must be in meters (convert 5cm) and q must be in Coulombs (convert µC).";
    
    setMessages(prev => [...prev, { role: 'ai', content: hintMsg, isHint: true }]);
  };

  // Mock question details
  const questionText = "Two point charges, q1 = +4 µC and q2 = -6 µC, are separated by a distance of 5 cm in a vacuum. Calculate the magnitude of the electrostatic force exactly midway between them if a third test charge of +1 µC is placed there.";

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      {/* Top action bar */}
      <div className="h-14 border-b bg-muted/30 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-muted-foreground border-border">{topic || "Topic"}</Badge>
          <div className="text-sm font-medium">Question 4 of 10</div>
        </div>
        
        <div className="flex items-center space-x-4">
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
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Badge variant="outline">Hard</Badge>
            <span>Estimated Time: 5 mins</span>
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
              <p>Recall that the total force on the test charge is the vector sum of forces from q1 and q2.</p>
              <div className="bg-background p-3 rounded border font-mono text-xs">
                k = 9 × 10^9 N·m²/C²<br/>
                1 µC = 10^-6 C
              </div>
            </CardContent>
          </Card>

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
                {hintsUsed >= 3 && (
                  <Button variant="link" size="sm" className="h-7 text-destructive">Unlock Full Solution</Button>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="relative">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your reasoning step here..." 
                  className="pr-12 py-6 text-sm resize-none shadow-sm"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-1.5 top-1.5 h-9 w-9"
                  disabled={!inputValue.trim()}
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
