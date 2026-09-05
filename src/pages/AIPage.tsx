import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, BarChart3, BookOpen, Brain, Target, Search, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: BarChart3, label: 'Analyze My Performance', prompt: 'Analyze my overall academic performance and tell me what needs improvement.' },
  { icon: BookOpen, label: 'What Should I Study?', prompt: 'Based on my performance data, what should I study today?' },
  { icon: Search, label: 'Find Weak Subjects', prompt: 'Which subjects am I weakest in and what can I do to improve?' },
  { icon: Brain, label: 'Predict My Performance', prompt: 'Can you predict how I will perform this semester based on my current data?' },
  { icon: Target, label: 'Create Exam Plan', prompt: 'Create a 7-day study plan for my upcoming exams based on my weakest areas.' },
  { icon: Sparkles, label: 'Practice Questions', prompt: 'Generate 10 practice questions for my weakest subject.' },
];

function generateResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('performance') || lower.includes('analyze')) {
    return `Based on your academic data:

**Overall Performance Score: 78.4%**

**Strengths:**
- Operating Systems: 90% average — your best subject
- Data Structures & Algorithms: 81% — consistently strong

**Areas for Improvement:**
- Discrete Mathematics: 55% average — this has declined 10% since CAT 1
- Computer Networks: 60% — below your target

**Attendance:** 84% overall. Computer Networks attendance at 80% is dangerously close to the 75% threshold.

**Recommendation:** Prioritize Mathematics revision immediately. Your declining trend needs to be reversed before the next assessment.`;
  }

  if (lower.includes('study') || lower.includes('today')) {
    return `Based on your current performance and upcoming deadlines:

**Today's Study Priority:**

1. **Discrete Mathematics** (45 min) — Your weakest subject at 55%. Focus on Graph Theory since your overdue assignment covers this topic.

2. **Computer Networks** (30 min) — TCP Socket Programming assignment due Nov 1. Review socket programming concepts.

3. **DBMS** (20 min) — Quick revision to maintain your improving trend (70% → 80%).

**Why this order?** Mathematics is declining fastest and has an overdue assignment. CN has an upcoming deadline. DBMS needs light maintenance to keep the upward trend going.`;
  }

  if (lower.includes('weak') || lower.includes('improve')) {
    return `**Your Weakest Subjects (ranked by concern level):**

1. **Discrete Mathematics** — 55% average, declining trend (-10%)
   - Risk Level: HIGH
   - Overdue assignment pending
   - Action: Submit Graph Theory problem set immediately, then allocate 45 min/day

2. **Computer Networks** — 60% average, slight improvement (+8%)
   - Risk Level: MEDIUM
   - Attendance at 80% (close to threshold)
   - Action: Attend every class, review TCP/IP fundamentals

All other subjects are performing well (80%+ average).`;
  }

  if (lower.includes('predict') || lower.includes('semester')) {
    return `**Semester Performance Prediction:**

Based on your current trajectory:
- **Expected Semester Average: 74.2%**
- **Expected GPA: 7.8**

**Subject-wise Predictions:**
| Subject | Predicted | Confidence |
|---------|-----------|------------|
| OS | 91% | 90% |
| DSA | 82% | 85% |
| SE | 82% | 80% |
| DBMS | 76% | 78% |
| CN | 62% | 72% |
| Math | 52% | 68% |

**Key Factor:** Your Mathematics score is pulling down the overall average significantly. Improving Math from 52% to 65% would raise your GPA to ~8.2.`;
  }

  if (lower.includes('plan') || lower.includes('exam')) {
    return `**7-Day Study Plan (Prioritized by weakness):**

**Day 1 — Mathematics Focus**
- Graph Theory revision (1 hr)
- Complete overdue assignment (1 hr)

**Day 2 — Computer Networks**
- TCP/IP Protocol suite (45 min)
- Socket programming practice (45 min)

**Day 3 — Mathematics + DBMS**
- Combinatorics problems (45 min)
- SQL query optimization (30 min)

**Day 4 — Practice Day**
- Math practice problems (1 hr)
- CN practice problems (30 min)

**Day 5 — DSA + OS Review**
- Binary tree problem solving (45 min)
- Process scheduling concepts (30 min)

**Day 6 — Weak Topics Review**
- Revisit any topic below 70% confidence
- Focus on areas where you made mistakes

**Day 7 — Full Revision**
- Quick review of all 6 subjects (15 min each)
- Focus on formulas and key concepts`;
  }

  if (lower.includes('practice') || lower.includes('question')) {
    return `**Practice Questions for Discrete Mathematics (your weakest subject):**

1. Prove that a connected graph with n vertices has at least n-1 edges.

2. How many ways can you distribute 10 identical balls into 4 distinct boxes?

3. Find the chromatic number of the Petersen graph.

4. Using Dijkstra's algorithm, find the shortest path from A to D in a weighted graph.

5. Prove by mathematical induction: 1 + 2 + ... + n = n(n+1)/2

6. How many spanning trees does K4 (complete graph on 4 vertices) have?

7. Determine if the following graph has an Eulerian circuit: a graph with 5 vertices all of degree 4.

8. Solve the recurrence relation: a(n) = 3a(n-1) - 2a(n-2), with a(0) = 1, a(1) = 3.

9. Find the number of paths of length 4 from vertex 1 to vertex 4 in a given adjacency matrix.

10. Is the following Boolean expression a tautology? (p → q) ↔ (¬q → ¬p)

Try answering these and I can help explain any you're stuck on!`;
  }

  return `I understand your question. Based on your academic data, here's what I can tell you:

- **GPA:** 7.84
- **Average Marks:** 73.4%
- **Strongest:** Operating Systems (90%)
- **Weakest:** Discrete Mathematics (55%)
- **At Risk:** Mathematics (declining) and Computer Networks (below target)

Could you be more specific? I can help with:
- Detailed performance analysis
- Study planning
- Subject-specific advice
- Practice questions
- Exam preparation strategies

Just ask me anything about your academics!`;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    const response = generateResponse(text);
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
            <Bot className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>EduTrack AI</h2>
          <p className="text-sm mb-8 text-center max-w-md" style={{ color: 'var(--text-secondary)' }}>
            I'm your personal academic assistant. I can analyze your performance, create study plans, find your study materials, and help you prepare for exams.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full">
            {quickActions.map(qa => (
              <button key={qa.label} onClick={() => sendMessage(qa.prompt)}
                className="flex items-center gap-2 p-3 rounded-xl border text-sm text-left hover:border-primary-300 transition-colors"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <qa.icon className="w-4 h-4 text-primary-600 shrink-0" />
                <span style={{ color: 'var(--text-primary)' }}>{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : ''
              }`}
              style={msg.role === 'assistant' ? { backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' } : {}}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-primary-600" />
                    <span className="text-xs font-medium text-primary-600">EduTrack AI</span>
                  </div>
                )}
                <div className={`text-sm whitespace-pre-wrap ${msg.role === 'assistant' ? '' : ''}`}
                  style={msg.role === 'assistant' ? { color: 'var(--text-primary)' } : {}}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary-600" />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        {messages.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            {quickActions.slice(0, 4).map(qa => (
              <button key={qa.label} onClick={() => sendMessage(qa.prompt)}
                className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border hover:border-primary-300 transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                {qa.label}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask EduTrack AI anything about your academics..."
            className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
          />
          <button type="submit" disabled={!input.trim() || isTyping}
            className="px-4 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
