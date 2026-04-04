import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when modal opens/closes
  useEffect(() => {
      if (!isOpen) {
          const timer = setTimeout(() => {
             setStatus('idle');
             setFormState({ name: '', email: '', message: '' });
          }, 300);
          return () => clearTimeout(timer);
      }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setTimeout(() => {
          onClose();
      }, 2500);
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-[60]"
           />
           
           {/* Modal Container */}
           <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
                 transition={{ type: "spring", duration: 0.5 }}
                 className="pointer-events-auto w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden"
               >
                 <div className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Get in touch</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">I'm always open to new oppurtunities.</p>
                        </div>
                        <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {status === 'success' ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="py-16 flex flex-col items-center justify-center text-center"
                        >
                            <CheckCircle className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mb-5" strokeWidth={1.5} />
                            <h3 className="text-xl font-serif text-zinc-900 dark:text-zinc-100 mb-2">Message sent.</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Thank you for reaching out. I'll get back to you shortly.
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {status === 'error' && (
                                <div className="p-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={e => setFormState({...formState, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:bg-white dark:focus:bg-zinc-800 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:bg-white dark:focus:bg-zinc-800 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Message</label>
                                <textarea 
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={e => setFormState({...formState, message: e.target.value})}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:bg-white dark:focus:bg-zinc-800 transition-all resize-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                    placeholder="How can I help you?"
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full mt-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium py-3.5 rounded-lg hover:bg-black dark:hover:bg-white transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-zinc-900/10"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                 </div>
               </motion.div>
           </div>
        </>
      )}
    </AnimatePresence>
  );
};