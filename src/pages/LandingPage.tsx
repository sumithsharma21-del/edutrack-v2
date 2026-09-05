import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, BarChart3, CalendarCheck, Brain, Shield, Lightbulb, Target, ArrowRight, ChevronRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const features = [
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Deep insights into your academic performance with visual charts and trends.' },
  { icon: CalendarCheck, title: 'Attendance Tracking', desc: 'Monitor attendance across subjects with threshold warnings.' },
  { icon: Brain, title: 'Smart Predictions', desc: 'AI-powered predictions for your future academic performance.' },
  { icon: Shield, title: 'Risk Detection', desc: 'Early warning system to identify academic risks before they escalate.' },
  { icon: Lightbulb, title: 'Personalized Recommendations', desc: 'Actionable study recommendations based on your data.' },
  { icon: Target, title: 'Goal Tracking', desc: 'Set academic goals and track your progress with visual indicators.' },
];

const steps = [
  { num: '01', title: 'Add Your Data', desc: 'Enter subjects, marks, attendance, and assignments.' },
  { num: '02', title: 'Analyze Performance', desc: 'View analytics, trends, and subject comparisons.' },
  { num: '03', title: 'Get Predictions', desc: 'Receive AI-powered score predictions and risk analysis.' },
  { num: '04', title: 'Follow Recommendations', desc: 'Act on personalized study plans and improve.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { signInDemo } = useAuth();

  const handleTryDemo = () => {
    signInDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-16 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary-600" />
          <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>EduTrack V2</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-12 py-20 lg:py-32 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
          <span>Student Performance Platform</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
          Understand Performance.<br />
          <span className="text-primary-600">Predict Progress.</span><br />
          Improve Outcomes.
        </h1>
        <p className="text-lg lg:text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          Your personal academic analytics platform. Track performance, predict scores, get smart recommendations, and take control of your academic journey.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <button onClick={handleTryDemo} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            Try Demo
          </button>
          <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-12 py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--text-primary)' }}>Everything You Need</h2>
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive tools to understand, predict, and improve your academic performance.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl p-6 border hover:shadow-md transition-shadow"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-12 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-primary)' }}>How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-4">
              <div className="text-3xl font-bold text-primary-200">{s.num}</div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Take Control of Your Academics</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
            Join EduTrack V2 and start making data-driven decisions about your academic life.
          </p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-lg">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t text-center" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-primary-600" />
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>EduTrack V2</span>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Student Performance Analytics Platform</p>
      </footer>
    </div>
  );
}
