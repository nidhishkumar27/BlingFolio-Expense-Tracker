import { useState } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser } from 'react-icons/fi';

const rules = [
  { key: /food|restaurant|grocer|eat|meal/i, reply: '🍽️ Smart Food Tip: Plan your meals weekly and batch cook to reduce food costs by up to 40%!' },
  { key: /shopping|buy|purchase|store/i, reply: '🛍️ Shopping Wisdom: Wait 24 hours before non-essential purchases. You\'ll be surprised how often you forget about them!' },
  { key: /transport|bus|fuel|gas|car|travel/i, reply: '🚗 Transport Hack: Combine errands into one trip and consider carpooling or public transport to cut costs significantly.' },
  { key: /train|rail|ticket/i, reply: '🚆 Train Travel: Book tickets in advance, use rail passes, and travel during off-peak hours for discounts.' },
  { key: /hotel|stay|accommodation|room/i, reply: '🏨 Hotel Savings: Compare prices online, use loyalty programs, and consider alternative accommodations like hostels or rentals.' },
  { key: /stationary|pen|notebook|paper|office/i, reply: '✏️ Stationary Tips: Buy in bulk, look for sales, and avoid branded items for everyday use.' },
  { key: /bills|utilities|electric|water|phone/i, reply: '📄 Bills Management: Review and cancel unused subscriptions monthly. Set up autopay to avoid late fees!' },
  { key: /entertainment|movie|games|fun|leisure/i, reply: '🎬 Entertainment Budget: Set a monthly fun budget and look for free local events. Your wallet will thank you!' },
  { key: /save|saving|tip|money|budget/i, reply: '💰 Golden Rule: Pay yourself first! Automate transfers to savings before you spend. Even ₹25/week adds up!' },
  { key: /help|hello|hi|start/i, reply: '👋 Hey there! I\'m your financial assistant. Ask me about saving tips for food, transport, shopping, bills, entertainment, train, hotel, or stationary!' }
];

export default function Chatbot({ expenses = [] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hey! I\'m your smart financial assistant. Ask me for personalized saving tips!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Analyze expenses by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.category || 'Other';
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {});

  // Find top spending category
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  const categoryTips = {
    Food: '🍽️ You spend most on Food. Try meal prepping, buying in bulk, and reducing takeout to save more!',
    Transport: '🚗 Transport is your biggest expense. Consider carpooling, using public transport, or planning routes to save fuel.',
    Shopping: '🛍️ Shopping is high. Wait 24 hours before non-essential purchases and look for discounts.',
    Bills: '📄 Bills are a major expense. Review subscriptions and utilities for possible savings.',
    Entertainment: '🎬 Entertainment is costing you. Set a monthly fun budget and explore free local events.',
    Other: '💡 Review your miscellaneous expenses for hidden savings opportunities.'
  };

  const respond = (text) => {
    // Total expense
    if (/total/i.test(text)) {
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  return `💰 Your total expense is ₹${total.toFixed(2)}.`;
    }
    // Highest expense
    if (/highest|max|biggest/i.test(text)) {
      if (expenses.length === 0) return '🔍 No expenses found.';
      const highest = expenses.reduce((max, exp) => exp.amount > max.amount ? exp : max, expenses[0]);
  return `🔝 Your highest expense is ₹${highest.amount.toFixed(2)} for '${highest.category || 'Other'}' on ${highest.date ? new Date(highest.date).toLocaleDateString() : 'N/A'}.`;
    }
    // Personalized tip
    if (/my|personal|analyze|custom|based/i.test(text)) {
      if (topCategory) {
        return categoryTips[topCategory] + ` (Your top category: ${topCategory})`;
      } else {
        return '🔍 Add some expenses first so I can analyze and give you personalized tips!';
      }
    }
    // Otherwise, use rules
    const rule = rules.find(r => r.key.test(text));
    return rule ? rule.reply : '🤔 I can help you save money! Try asking about food, transport, shopping, bills, entertainment, total expense, highest expense, or ask for a personalized tip based on your expenses.';
  };

  const handleSend = e => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { from: 'user', text: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMsg = { from: 'bot', text: respond(userMsg.text) };
      setMessages(m => [...m, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setOpen(o => !o)} 
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-40 ${
          open 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
            : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 animate-pulse-glow'
        }`}
      >
        <div className="flex items-center justify-center text-white text-2xl">
          {open ? <FiX /> : <FiMessageCircle />}
        </div>
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] glass-panel rounded-2xl shadow-2xl flex flex-col h-[500px] z-30 animate-slide-up border border-white/20">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <FiMessageCircle className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-white">Financial Assistant</h3>
              <p className="text-xs text-dark-400">Smart money tips & advice</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 animate-slide-up ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {msg.from === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMessageCircle className="text-white text-sm" />
                  </div>
                )}
                
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.from === 'bot' 
                    ? 'bg-dark-800/60 backdrop-blur-sm text-gray-100 border border-white/10' 
                    : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white ml-auto'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>

                {msg.from === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-white text-sm" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="text-white text-sm" />
                </div>
                <div className="bg-dark-800/60 backdrop-blur-sm text-gray-100 border border-white/10 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                className="flex-1 input-modern text-sm py-3"
                placeholder="Ask for a saving tip..."
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={isTyping || !input.trim()}
                className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
