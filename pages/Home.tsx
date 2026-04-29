import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, Badge } from "../components/ui";
import {
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  FileText,
  ArrowUpRight,
  FileUser,
  Medal,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../content";
import { useContact } from "../context/ContactContext";
import { SpotifyNowPlaying } from "../components/SpotifyNowPlaying";

const experiences = [
  {
    company: "Developers' Society",
    role: "Developer Subhead",
    period: "2023 - 2024",
    description:
      "Led frontend design and deployment of the society website within 7 days, ensuring a responsive UI. Organized web development workshops for 30+ students.",
    logo: "https://ui-avatars.com/api/?name=DS&background=random",
  },
  {
    company: "TAdS, IIT Kharagpur",
    role: "Member",
    period: "2023 - 2024",
    description:
      "Organized cycle trips outside the campus and conducted technical workshops for first-year students. Participated in National & International Adventure Programs.",
    logo: "https://ui-avatars.com/api/?name=IIT&background=random",
  },
];
// from iconscout website
const stack = [
  { name: "C++", icon: "/tech/cpp.svg" },
  { name: "Python", icon: "/tech/python.svg" },
  { name: "Javascript", icon: "/tech/javascript.svg" },
  { name: "React", icon: "/tech/react.svg" },
  { name: "Next.js", icon: "/tech/nextjs.svg" },
  { name: "Node.js", icon: "/tech/node-js.svg" },
  { name: "Express js", icon: "/tech/express.png" },

  { name: "MongoDB", icon: "/tech/mongodb.svg" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
  { name: "Git", icon: "/tech/git.svg" },
  { name: "Tailwind", icon: "/tech/tailwind.svg" },
];

const achievements = [
  {
    title: "Meta Hacker Cup 2025",
    rank: "Global Rank 2825",
    date: "2025",
    category: "Round 1",
    icon: Trophy,
  },
  {
    title: "Competitive Programming",
    rank: "LeetCode 1707 | CodeForces 1340 | Codechef 1639",
    date: "2025",
    category: "Global",
    icon: Medal,
  },
  {
    title: "JEE Main 2023",
    rank: "Top 0.4% (12L candidates)",
    date: "2023",
    category: "National",
    icon: Award,
  },
  {
    title: "JEE Advanced 2023",
    rank: "Top 4% (2L candidates)",
    date: "2023",
    category: "National",
    icon: Award,
  },
  {
    title: "IITGN Dakshana Leadership",
    rank: "1st Place Capstone Project",
    date: "2023",
    category: "Program",
    icon: Award,
  },
];

const Education = [
  {
    degree: "B.Tech. in Chemical Engineering",
    institution: "Indian Institute of Technology, Kharagpur",
    period: "2023 - 2027",
    gpa: "8.36/10",
  },
  {
    degree: "Class 12th",
    institution: "Jawahar Navodaya Vidyalaya, Bankura",
    period: "2015-2022",
    cgpa: "95.2%",
  },
];
const RotatingText = () => {
  const words = ["AI and Backend Engineer", "Competitive Programmer"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-9 overflow-hidden relative inline-block align-bottom w-full max-w-[400px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-0 top-0 block text-zinc-400 dark:text-zinc-500 font-light tracking-wide"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 bg-zinc-100/80 border border-zinc-200/50 dark:bg-zinc-800/50 dark:border-zinc-800 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 dark:hover:border-zinc-700 rounded-full transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export const Home = () => {
  const recentPosts = blogPosts.slice(0, 2);
  const { openContact } = useContact();

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 md:gap-12"
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-4"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Looking for Internships and projects
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
                Hi, I'm Arnab.
              </h1>

              <div className="text-xl md:text-2xl h-9 flex items-center">
                <RotatingText />
              </div>
            </div>

            <p className="font-serif font-medium text-lg tracking-tight text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
              Pre-final year at IIT Kharagpur. Building high-performance backends, RAG systems, and optimized algorithms.
            </p>

            {/* Redesigned Intro Actions - Unified Bar */}
            <div className="pt-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group flex items-center gap-1 p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
              >
                <Link
                  to="/projects"
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  View Work <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="px-5 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors flex items-center gap-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <FileUser className="w-4 h-4" /> Resume
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 pl-2"
              >
                <span className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block mx-1"></span>
                <div className="flex gap-2.5 ml-1">
                  <SocialLink
                    href="https://github.com/Arnab-iitkgp"
                    icon={Github}
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/arnab-dev/"
                    icon={Linkedin}
                  />
                  <SocialLink
                    href="mailto:arnabchakraborty7574@gmail.com"
                    icon={Mail}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              {/* Profile picture */}
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      {/* Spotify Now Playing */}
      <SpotifyNowPlaying />

      {/* Tech Stack */}
      <section>
        <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-6">
          Technologies
        </h3>
        <div className="flex flex-wrap gap-3">
          {stack.map((item, idx) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Removed specific backgroundColor/borderColor from Framer Motion to let Tailwind handle hover states properly in dark mode
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: idx * 0.03 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-5 h-5 object-contain"
              />
              <span>{item.name}</span>
            </motion.button>
          ))}
        </div>

      </section>

      {/* Education - Separated Row */}
      <section>
        <SectionHeading title="Education" icon={GraduationCap} />
        <div className="grid grid-cols-1 gap-6">
          {Education.map((item, idx) => (
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-start gap-6 p-6 border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shadow-sm shrink-0">
                <GraduationCap className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {item.degree}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                    {item.institution}
                  </p>
                  <span className="text-zinc-300 dark:text-zinc-600">•</span>
                  <p className="text-zinc-500 dark:text-zinc-500">
                    {item.period}
                  </p>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-sm leading-relaxed">
                  {item.gpa ? `CGPA: ${item.gpa}` : `Score: ${item.cgpa}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements - List View */}
      <section>
        <SectionHeading title="Achievements" icon={Award} />
        <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y divide-zinc-100 dark:divide-zinc-800">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              // Rely on Tailwind CSS hover state for colors instead of Framer Motion
              className="flex items-start sm:items-center gap-4 p-5 transition-colors group cursor-default hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              {/* Icon */}
              <div className="shrink-0 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base truncate pr-4">
                  {item.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <span>{item.rank}</span>
                  <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">
                    |
                  </span>
                  <span>{item.date}</span>
                  <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline">
                    |
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-500 dark:text-zinc-400">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Selected Projects */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4 mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">
            Selected Work
          </h2>
          <Link
            to="/projects"
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 group transition-colors"
          >
            View All Projects{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "CodeLens",
              description:
                "AI-powered code review tool that automatically analyzes pull requests line-by-line using Google Gemini.",
              tags: ["Next.js", "Gemini AI", "RAG", "GitHub"],
              link: "https://codelens-app.vercel.app/",
              github: "https://github.com/Arnab-iitkgp/codelens",
              image: "/projects/codelens.png",
              featured: true,
            },
            {
              title: "CargoRoute",
              description:
                "VRP optimizer using Genetic Algorithms for multi-stop delivery routes. Interactive React frontend.",
              tags: [
                "Node.js",
                "React",
                "Leaflet.js",
                "OpenRouteService",
                "Genetic Algorithm",
              ],
              link: "https://cargoroute-frontend.vercel.app/",
              github: "https://github.com/Arnab-iitkgp/CargoRoute",
              image: "/projects/cargoroute.png",
              size: "large",
              featured: true,
            },
          ].map((project, index) => (
            <a
              href={project.link || project.github}
              key={index}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-900 dark:hover:border-zinc-100 transition-all shadow-sm hover:shadow-md flex flex-col h-full"
              >
                {/* Uniform Image Container */}
                <div className="w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative border-b border-zinc-100 dark:border-zinc-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay/Action */}
                  <div className="absolute top-3 right-3">
                    <div className="p-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-full transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-full transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {!project.link && (
                        <div className="p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full text-zinc-900 dark:text-zinc-100">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Uniform Content Area */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </section>
      {/* Recent Writing */}
      <section>
        <div className="flex justify-between items-end mb-6 mt-12">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">
              Recent Writing
            </h2>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-12 ml-4" />
          </div>
          <Link
            to="/writing"
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 group transition-colors"
          >
            All Posts{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post) => (
            <Link key={post.id} to={`/writing/${post.slug}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all h-full"
              >
                <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-3">
                  {post.date}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">
                  {post.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                  Read Article{" "}
                  <ArrowUpRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <SectionHeading title="Leadership & Activities" icon={Briefcase} />
        <div className="space-y-10">
          {experiences.map((job, index) => (
            <div
              key={index}
              className="group relative pl-8 border-l border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors duration-500"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 transition-colors" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg group-hover:translate-x-1 transition-transform">
                    {job.role}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                    {job.company}
                  </p>
                </div>
                <Badge className="self-start bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 font-mono">
                  {job.period}
                </Badge>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About Me Section - Added at the bottom */}
      <section className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-serif mb-2">
                Arnab Chakraborty
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                I build full-stack applications and enjoy solving the small
                real-life problems that everyone ignores until they break.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                Key Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {["C++", "React", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "AWS", "Docker", "CI/CD"].map(
                  (skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{
                        scale: 1.1,
                        borderColor: "#a1a1aa",
                        color: "#18181b",
                      }}
                      className="inline-flex items-center justify-center px-4 h-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-600 dark:text-zinc-300 transition-colors cursor-default"
                    >
                      <span className="text-xs font-bold">{skill}</span>
                    </motion.span>
                  ),
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={openContact}
                className="inline-flex items-center text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-900 dark:border-zinc-100 hover:border-zinc-500 dark:hover:border-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors pb-1"
              >
                Get in touch <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
