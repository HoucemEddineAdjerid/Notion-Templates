interface Template {
  id: string;
  emoji: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  link: string;
}

const templates: Template[] = [
  {
    id: "1",
    emoji: "📅",
    name: "Ultimate Life Planner",
    description: "The all-in-one system to organize your tasks, habits, and long-term goals.",
    price: 12,
    tags: ["Productivity", "Life"],
    link: "https://gumroad.com/l/ultimate-life-planner"
  },
  {
    id: "2",
    emoji: "💼",
    name: "Freelancer OS",
    description: "Manage clients, projects, and invoices in one clean, professional dashboard.",
    price: 15,
    tags: ["Business", "Finance"],
    link: "https://gumroad.com/l/freelancer-os"
  },
  {
    id: "3",
    emoji: "📚",
    name: "Second Brain Starter Kit",
    description: "Capture ideas, notes, and resources using the P.A.R.A. method.",
    price: 9,
    tags: ["Knowledge", "Learning"],
    link: "https://gumroad.com/l/second-brain"
  },
  {
    id: "4",
    emoji: "💰",
    name: "Personal Finance Tracker",
    description: "Track every dollar, set budgets, and visualize your net worth growth.",
    price: 10,
    tags: ["Finance", "Goals"],
    link: "https://gumroad.com/l/finance-tracker"
  },
  {
    id: "5",
    emoji: "🚀",
    name: "Startup Launch Pad",
    description: "Everything you need to go from idea to launch: roadmap, CRM, and pitch deck.",
    price: 18,
    tags: ["Business", "Startups"],
    link: "https://gumroad.com/l/startup-launch"
  },
  {
    id: "6",
    emoji: "🎯",
    name: "Goal & Habit Tracker",
    description: "Simple, effective tracking for your daily habits and major milestones.",
    price: 8,
    tags: ["Productivity", "Health"],
    link: "https://gumroad.com/l/habit-tracker"
  }
];

const tagColors: Record<string, string> = {
  Productivity: "bg-blue-100 text-blue-700",
  Life: "bg-green-100 text-green-700",
  Business: "bg-purple-100 text-purple-700",
  Finance: "bg-yellow-100 text-yellow-700",
  Knowledge: "bg-orange-100 text-orange-700",
  Learning: "bg-pink-100 text-pink-700",
  Goals: "bg-indigo-100 text-indigo-700",
  Startups: "bg-red-100 text-red-700",
  Health: "bg-emerald-100 text-emerald-700",
};

export default function TemplatesGrid() {
  return (
    <section className="max-w-6xl mx-auto py-16 px-4" id="templates">
      <h2 className="text-2xl mb-2 flex items-center gap-2">
        <span>📂</span> Templates
      </h2>
      <div className="notion-divider"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {templates.map((template) => (
          <div key={template.id} className="notion-card flex flex-col h-full">
            <div className="text-3xl mb-3">{template.emoji}</div>
            <h3 className="text-lg font-bold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
              {template.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.map(tag => (
                <span key={tag} className={`notion-tag ${tagColors[tag] || 'bg-gray-100'}`}>
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-notion-border">
              <span className="font-bold text-lg">${template.price}</span>
              <a 
                href={template.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-notion-accent hover:underline flex items-center gap-1"
              >
                Get Template <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
