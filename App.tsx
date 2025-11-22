import React from 'react';
import { HashRouter,BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Writing } from './pages/Writing';
import { BlogPost } from './pages/BlogPost';
import { ContactProvider } from './context/ContactContext';
import { ThemeProvider } from './context/ThemeContext';
import Resume from './components/Resume';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <ContactProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/writing" element={<Writing />} />
              <Route path="/writing/:slug" element={<BlogPost />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ContactProvider>
    </ThemeProvider>
  );
};

export default App;