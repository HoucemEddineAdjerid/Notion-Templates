import { motion } from 'motion/react';
import TemplatesGrid from './components/TemplatesGrid';
import FAQ from './components/FAQ';
import ChatBot from './components/ChatBot';
import { ExternalLink, Twitter, Github } from 'lucide-react';

export default function App() {
  const scrollToTemplates = () => {
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-notion-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-xl">📄</span>
            <span>TemplatesHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button onClick={scrollToTemplates} className="hover:bg-notion-hover px-2 py-1 rounded transition-colors">Templates</button>
            <a href="#about" className="hover:bg-notion-hover px-2 py-1 rounded transition-colors">About</a>
            <a href="#faq" className="hover:bg-notion-hover px-2 py-1 rounded transition-colors">FAQ</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <header className="relative">
          {/* Cover Image Area */}
          <div className="h-48 w-full bg-[#E9E9E7] overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-50"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10">
            <div className="text-7xl mb-6">🚀</div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Supercharge Your Workflow with Notion Templates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 mb-8 max-w-2xl"
            >
              Beautifully crafted templates for productivity, business, and personal growth. Built for thinkers, creators, and doers.
            </motion.p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={scrollToTemplates}
                className="notion-btn-primary text-lg px-6 py-2"
              >
                Browse Templates
              </button>
              <button className="notion-btn-ghost text-lg px-6 py-2">
                Learn More
              </button>
            </div>
          </div>
        </header>

        {/* Why Section (Callout Style) */}
        <section className="max-w-4xl mx-auto px-4 py-12" id="about">
          <div className="notion-callout bg-[#F1F1EF] border-l-4 border-notion-text">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-bold mb-2">Why choose our templates?</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✅</span>
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-600">🔄</span>
                  <span>Lifetime Updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-600">💬</span>
                  <span>Community Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <TemplatesGrid />

        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
      <footer className="border-t border-notion-border py-12 bg-notion-bg-alt">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-sm text-gray-500">
              Built with Notion ❤️ | Powered by Gumroad
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="flex items-center gap-1 hover:underline">
                <Twitter size={14} /> Twitter
              </a>
              <a href="#" className="flex items-center gap-1 hover:underline">
                <ExternalLink size={14} /> Gumroad Store
              </a>
              <a href="#" className="flex items-center gap-1 hover:underline">
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} TemplatesHub. All rights reserved.
          </div>
        </div>
      </footer>

      {/* AI ChatBot */}
      <ChatBot />
    </div>
  );
}
