import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  key?: number | string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="faq-question"
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{question}</span>
      </button>
      <div 
        className={`faq-answer ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "How do I receive the templates?",
      answer: "After purchase, you'll receive an email with a link to the Notion page. Simply click 'Duplicate' in the top right corner to add it to your own workspace."
    },
    {
      question: "Do I need a paid Notion account?",
      answer: "No! All our templates work perfectly with the free version of Notion. Some advanced features might benefit from a Plus plan, but they are not required."
    },
    {
      question: "Can I customize the templates?",
      answer: "Absolutely. Once you duplicate the template into your workspace, it's yours to modify, add to, or change as you see fit."
    },
    {
      question: "What is your refund policy?",
      answer: "Due to the digital nature of these products, we generally don't offer refunds once the template has been accessed. However, if you have issues, please reach out!"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4" id="faq">
      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <span>❓</span> FAQ
      </h2>
      <div className="notion-divider"></div>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
