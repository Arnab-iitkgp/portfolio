import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why I Switched to Better Auth',
    excerpt: 'After years of wrestling with authentication libraries, I found Better Auth. Here\'s why it changed everything about how I build secure applications.',
    date: 'Feb 5, 2026',
    readTime: '6 min read',
    slug: 'why-better-auth',
    content: [
      { type: 'text', content: 'Authentication is one of those things that seems simple until you actually have to implement it. For years, I bounced between NextAuth, Clerk, and rolling my own solutions with Passport.js. Each had its strengths, but they all left me wanting more.' },
      { type: 'text', content: 'The problem with most auth libraries is that they force you into their way of thinking. NextAuth is great for OAuth flows but becomes unwieldy when you need custom session management. Clerk is polished but locks you into their ecosystem. And building from scratch? That\'s a security nightmare waiting to happen.' },
      { type: 'text', content: 'Enter Better Auth. What caught my attention wasn\'t the marketing it was the philosophy. Better Auth is built on the principle that authentication should be flexible without being fragile. It gives you sensible defaults but doesn\'t fight you when you need to customize.' },
      { type: 'text', content: 'The developer experience is phenomenal. Setting up email/password auth took me less than 10 minutes. Here\'s all the code you need:' },
      {
        type: 'code',
        language: 'typescript',
        caption: 'Basic Better Auth setup',
        code: `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day
  }
});`
      },
      { type: 'text', content: 'That\'s it. No complex configuration files, no wrestling with callbacks. Adding OAuth providers? Another 5 minutes per provider. The documentation is clear, the TypeScript support is first-class, and the API feels intuitive.' },
      { type: 'text', content: 'But here\'s what really sold me: session management. Better Auth uses a hybrid approach that combines the security of server-side sessions with the performance of JWTs. You get the best of both worlds without the usual tradeoffs.' },
      { type: 'text', content: 'I recently used Better Auth in my CodeLens project an AI-powered code review tool. The integration was seamless. I needed role-based access control, subscription tiers, and GitHub OAuth. Better Auth handled all of it without breaking a sweat.' },
      { type: 'text', content: 'The middleware system is particularly elegant. You can compose authentication checks, rate limiting, and custom authorization logic in a way that feels natural:' },
      {
        type: 'code',
        language: 'typescript',
        caption: 'Composable middleware for protected routes',
        code: `import { auth } from "./auth";

export const protectedRoute = async (req: Request) => {
  const session = await auth.api.getSession({ 
    headers: req.headers 
  });
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Check subscription tier
  if (session.user.tier !== "premium") {
    return new Response("Upgrade required", { status: 403 });
  }
  
  // Your protected logic here
  return new Response("Success");
};`
      },
      { type: 'text', content: 'No more scattered auth logic across your codebase. Everything is centralized, type-safe, and easy to test.' },
      { type: 'text', content: 'Of course, no library is perfect. Better Auth is relatively new, so the ecosystem isn\'t as mature as NextAuth. But the core is solid, the maintainers are responsive, and the community is growing fast.' },
      { type: 'text', content: 'If you\'re building a new project or considering migrating your auth system, give Better Auth a serious look. It might just change how you think about authentication like it did for me.' }
    ]
  },
  {
    id: '2',
    title: 'Genetic Algorithms for the Rest of Us',
    excerpt: 'You don\'t need a PhD to understand genetic algorithms. Let me show you how nature-inspired computing can solve real-world optimization problems.',
    date: 'Jan 28, 2026',
    readTime: '8 min read',
    slug: 'genetic-algorithms-explained',
    content: [
      { type: 'text', content: 'Genetic algorithms sound intimidating. The name conjures images of complex biology and advanced mathematics. But here\'s the truth: they\'re one of the most intuitive optimization techniques you\'ll ever learn.' },
      { type: 'text', content: 'Think about how evolution works in nature. Organisms with better traits survive and reproduce. Over generations, the population gets better at thriving in its environment. Genetic algorithms apply this same principle to problem-solving.' },
      {
        type: 'mermaid',
        caption: 'The Genetic Algorithm Process',
        diagram: `graph TD
    A[Initialize Random Population] --> B[Evaluate Fitness]
    B --> C{Termination Criteria Met?}
    C -->|No| D[Selection]
    D --> E[Crossover]
    E --> F[Mutation]
    F --> B
    C -->|Yes| G[Return Best Solution]
    
    style A fill:#e1f5ff
    style G fill:#d4edda
    style C fill:#fff3cd`
      },
      { type: 'text', content: 'I first encountered genetic algorithms while building CargoRoute, a delivery route optimizer. I needed to find the best path through 50+ stops a classic "traveling salesman problem." Traditional algorithms would take forever. Genetic algorithms? They found near-optimal solutions in under 5 seconds.' },
      { type: 'text', content: 'Here\'s how it works. Start with a population of random solutions (routes, in my case). Each solution is like a "chromosome" in biology:' },
      {
        type: 'code',
        language: 'javascript',
        caption: 'Creating an initial population',
        code: `function createRandomRoute(cities) {
  // Shuffle cities to create a random route
  return cities
    .map(city => ({ city, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ city }) => city);
}

function initializePopulation(cities, populationSize = 100) {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(createRandomRoute(cities));
  }
  return population;
}`
      },
      { type: 'text', content: 'You evaluate how good each solution is using a fitness function for routes, that\'s total distance traveled:' },
      {
        type: 'code',
        language: 'javascript',
        caption: 'Fitness function for route optimization',
        code: `function calculateDistance(cityA, cityB) {
  const dx = cityA.x - cityB.x;
  const dy = cityA.y - cityB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function fitness(route) {
  let totalDistance = 0;
  
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(route[i], route[i + 1]);
  }
  
  // Add distance back to start
  totalDistance += calculateDistance(
    route[route.length - 1], 
    route[0]
  );
  
  // Return inverse (lower distance = higher fitness)
  return 1 / totalDistance;
}`
      },
      { type: 'text', content: 'Next comes selection. Just like in nature, the best solutions get to "reproduce." You pick pairs of high-performing solutions and combine them to create offspring. This is called crossover:' },
      {
        type: 'code',
        language: 'javascript',
        caption: 'Crossover operation - combining two parent routes',
        code: `function crossover(parent1, parent2) {
  const start = Math.floor(Math.random() * parent1.length);
  const end = Math.floor(Math.random() * parent1.length);
  
  const [startIdx, endIdx] = start < end 
    ? [start, end] 
    : [end, start];
  
  // Take a segment from parent1
  const child = parent1.slice(startIdx, endIdx);
  
  // Fill remaining cities from parent2 in order
  parent2.forEach(city => {
    if (!child.includes(city)) {
      child.push(city);
    }
  });
  
  return child;
}`
      },
      { type: 'text', content: 'But here\'s the clever part: mutation. Occasionally, you randomly swap two stops in a route. This prevents the algorithm from getting stuck in local optima. It\'s like genetic diversity in nature sometimes random changes lead to breakthroughs:' },
      {
        type: 'code',
        language: 'javascript',
        caption: 'Mutation - introducing random variation',
        code: `function mutate(route, mutationRate = 0.01) {
  for (let i = 0; i < route.length; i++) {
    if (Math.random() < mutationRate) {
      // Swap with a random position
      const j = Math.floor(Math.random() * route.length);
      [route[i], route[j]] = [route[j], route[i]];
    }
  }
  return route;
}`
      },
      { type: 'text', content: 'Repeat this process for dozens or hundreds of generations. The population evolves. Bad solutions die out. Good solutions proliferate. And eventually, you converge on a solution that\'s remarkably good.' },
      { type: 'text', content: 'The beauty of genetic algorithms is their versatility. I\'ve used them for route optimization, but they work for scheduling problems, neural network training, game AI, and even creative tasks like generating music or art.' },
      { type: 'text', content: 'They\'re not always the right tool. If you have a small, well-defined problem, exact algorithms are better. But for complex, multi-dimensional optimization where "good enough" beats "perfect," genetic algorithms shine.' },
      { type: 'text', content: 'Want to try it yourself? Start with a simple problem: optimizing a string to match a target phrase. Create random strings, score them by how many characters match, breed the best ones, add mutations, and watch evolution happen in real-time.' },
      { type: 'text', content: 'Genetic algorithms taught me that sometimes the best solutions come from embracing randomness and iteration rather than trying to calculate perfection upfront. Nature figured this out billions of years ago. We\'re just catching up.' }
    ]
  }
];