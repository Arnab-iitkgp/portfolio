import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Grid, PenTool, Mail, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import { useTheme } from '../context/ThemeContext';
import { ContactModal } from './ContactModal';
import { FileText } from 'lucide-react'; // Import FileText icon
import { DynamicQuote } from './DynamicQuote';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className="relative px-5 py-2 flex items-center gap-2 transition-colors text-sm font-medium z-10 group">
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 border-b-2 border-zinc-900 dark:border-zinc-100"
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 transition-colors ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

const MobileNavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink to={to} className={({isActive}) => `flex flex-col items-center justify-center p-2 transition-colors rounded-md ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>
        <Icon className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
    </NavLink>
);

const FooterLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all rounded-full"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-all rounded-full"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}


export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isContactOpen, openContact, closeContact } = useContact();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center pb-24 md:pb-0 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

      {/* Mobile Top Bar - Branding */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center transition-colors duration-300">
          <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-zinc-900 overflow-hidden rounded-full ring-1 ring-zinc-100 dark:ring-zinc-800">
                 <img src="/pff.jpg" alt="User" className="w-full h-full object-cover" />
               </div>
               <span className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100 tracking-tight">Arnab | Web Developer</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          >
             {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
      </header>

      {/* Desktop Navbar - Sharp, Minimal, Rectangular */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pt-6 pointer-events-none">
        <nav className="pointer-events-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] flex items-center transition-colors duration-300">
            {/* Logo Area */}
            <div className="pl-3 pr-4 py-2 border-r border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
               <div className="w-8 h-8 bg-zinc-900 overflow-hidden ring-1 ring-zinc-100 dark:ring-zinc-800">
                 <img src="/pff.jpg" alt="User" className="w-full h-full object-cover" />
               </div>
            </div>
            
            <div className="flex">
              <NavItem to="/" icon={Home} label="Home" />
              <NavItem to="/projects" icon={Grid} label="Projects" />
              <NavItem to="/writing" icon={PenTool} label="Writing" />
            </div>
            
            <div className="pl-4 pr-3 border-l border-zinc-100 dark:border-zinc-800 py-2 flex items-center gap-2">
              <ThemeToggle />
              <button 
                onClick={openContact}
                className="px-4 py-1.5 text-xs uppercase tracking-widest font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                Connect
              </button>
            </div>
        </nav>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-6 py-2 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors duration-300">
          <MobileNavItem to="/" icon={Home} label="Home" />
          <MobileNavItem to="/projects" icon={Grid} label="Projects" />
          <MobileNavItem to="/writing" icon={PenTool} label="Writing" />
          <button onClick={openContact} className="flex flex-col items-center justify-center p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-md active:scale-95">
             <Mail className="w-5 h-5 mb-1" />
             <span className="text-[10px] font-medium uppercase tracking-wide">Contact</span>
          </button>
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl px-6 md:px-8 pt-24 md:pt-40 flex-1">
        <AnimatePresence mode="wait">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.4, ease: "easeOut" }}
           >
             {children}
           </motion.div>
        </AnimatePresence>

        <div className="mt-24 w-full">
          <DynamicQuote />
        </div>
      </main>

      <footer className="w-full max-w-3xl px-6 md:px-8 py-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400 dark:text-zinc-500 gap-4 transition-colors duration-300">
        <p className="font-mono text-xs">© {new Date().getFullYear()} Arnab Chakraborty.</p>
        <div className="flex gap-2">
          <FooterLink href="https://github.com/Arnab-iitkgp" icon={Github} />
          <FooterLink href="https://www.linkedin.com/in/arnab-dev/" icon={Linkedin} />
          <FooterLink href="mailto:arnabchakraborty7574@gmail.com" icon={Mail} />
        </div>
      </footer>
    </div>
  );
};