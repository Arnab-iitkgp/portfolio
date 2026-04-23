import React, { useState, useEffect } from 'react';

export const quotes = [
  // --- Bhagavad Gita ---
  { text: "You have a right to perform your duty, but not to the fruits of action.", author: "Bhagavad Gita", ref: "2.47", tag: "gita" },
  { text: "Perform your duty with balance, abandoning attachment to success and failure.", author: "Bhagavad Gita", ref: "2.48", tag: "gita" },
  { text: "The mind acts as an enemy for those who do not control it.", author: "Bhagavad Gita", ref: "6.6", tag: "gita" },
  { text: "A person is what their deep desire is.", author: "Bhagavad Gita", ref: "17.3", tag: "gita" },
  { text: "Set your heart upon your work, but never on its reward.", author: "Bhagavad Gita", ref: "2.47", tag: "gita" },
  { text: "When meditation is mastered, the mind is unwavering like a flame in a windless place.", author: "Bhagavad Gita", ref: "6.19", tag: "gita" },
  { text: "The soul is neither born, nor does it ever die.", author: "Bhagavad Gita", ref: "2.20", tag: "gita" },
  { text: "As a person sheds worn-out garments, the soul takes on new bodies.", author: "Bhagavad Gita", ref: "2.22", tag: "gita" },
  { text: "One who has conquered the mind is tranquil in heat and cold, pleasure and pain.", author: "Bhagavad Gita", ref: "6.7", tag: "gita" },
  { text: "Detached from the outcome, act with full focus.", author: "Bhagavad Gita", ref: "2.x", tag: "gita" },
  { text: "Self-control leads to inner strength and peace.", author: "Bhagavad Gita", ref: "6.x", tag: "gita" },
  { text: "Those who are steady in mind remain undisturbed in sorrow and joy.", author: "Bhagavad Gita", ref: "2.15", tag: "gita" },
  { text: "The disciplined mind brings happiness.", author: "Bhagavad Gita", ref: "6.x", tag: "gita" },
  { text: "Action is better than inaction.", author: "Bhagavad Gita", ref: "3.8", tag: "gita" },
  { text: "Control your senses before they control you.", author: "Bhagavad Gita", ref: "2.x", tag: "gita" },

  // --- Stoic ---
  { text: "We suffer more often in imagination than in reality.", author: "Seneca", tag: "stoic" },
  { text: "He who fears death will never do anything worth living.", author: "Seneca", tag: "stoic" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca", tag: "stoic" },
  { text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca", tag: "stoic" },
  { text: "No man is more unhappy than he who never faces adversity.", author: "Seneca", tag: "stoic" },
  { text: "You have power over your mind—not outside events.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "If it is not right, do not do it; if it is not true, do not say it.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "Do not act as if you will live forever.", author: "Marcus Aurelius", tag: "stoic" },
  { text: "He suffers more than necessary, who suffers before it is necessary.", author: "Seneca", tag: "stoic" },
  { text: "It is not what happens to you, but how you react to it that matters.", author: "Epictetus", tag: "stoic" },
  { text: "First say to yourself what you would be; then do what you have to do.", author: "Epictetus", tag: "stoic" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus", tag: "stoic" },

  // --- Modern / Minimal ---
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln (attributed)", tag: "modern" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear", tag: "modern" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", tag: "modern" },
  { text: "Small steps every day lead to big results.", author: "Unknown", tag: "modern" },
  { text: "Consistency beats intensity.", author: "Unknown", tag: "modern" },
  { text: "Focus on the process, not the outcome.", author: "Unknown", tag: "modern" },
  { text: "Clarity comes from action.", author: "Unknown", tag: "modern" },
  { text: "Energy flows where attention goes.", author: "Unknown", tag: "modern" },
  { text: "What you do daily shapes who you become.", author: "Unknown", tag: "modern" },
  { text: "Silence is a source of great strength.", author: "Lao Tzu", tag: "modern" },
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass", tag: "modern" },
  { text: "Act without expectation.", author: "Unknown", tag: "modern" },
  { text: "Master yourself, master your life.", author: "Unknown", tag: "modern" },
  { text: "Calm mind. Strong life.", author: "Unknown", tag: "modern" },
  { text: "Less noise, more focus.", author: "Unknown", tag: "modern" }
];

export const DynamicQuote = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const quoteIndex = dayIndex % quotes.length;
    
    setQuote(quotes[quoteIndex]);
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111111] p-8 md:p-10 w-full transition-colors duration-300 mb-8 mt-12">
      <div className="absolute -top-6 -left-4 text-zinc-100 dark:text-zinc-800/40 transition-colors duration-300 pointer-events-none">
        <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col gap-6">
        <p className="font-mono text-base md:text-lg text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
          "{quote.text}"
        </p>
        <p className="font-mono text-sm text-zinc-500 dark:text-zinc-500 self-end">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};
