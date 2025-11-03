/**
 * Portfolio projects configuration
 * Defines personal and professional projects
 * @property {string} project - Project name
 * @property {string} githubURL - Link to GitHub repository
 * @property {string} [projectURL] - Optional link to live project
 * @property {string} description - HTML-formatted project description
 * @property {string[]} technologies - List of technologies used
 * @property {boolean} wip - Whether project is work in progress
 */
export const worksContent = [
  {
    project: 'candela.nvim',
    githubURL: 'https://github.com/kierancanter/candela.nvim',
    description: "Neovim plugin for efficient log analysis. Allows users to manage regex patterns, highlight matched lines, filter out non-matches, and rapidly navigate through matches. Customizable user configuration and support for multiple regex search engines. Written in Lua.",
    technologies: ['Lua'],
    wip: false,
  },
  {
    project: 'RocketOdds',
    githubURL: 'https://github.com/kierancanter/rocketodds',
    description: "Plugin for the popular Rocket League mod, BakkesMod. Real-time moneyline win odds. Dynamically calculates win probabilities by analyzing in-game metrics like goals, shots, and possession. Uses historical datasets to predictively model accurate probabilities. Written in C++ using the Bakkesmod SDK.",
    technologies: ['Python', 'Go', 'C++', 'PyTorch', 'Polars', 'Plotly', 'AWS S3', 'Docker'],
    wip: true,
  },
  {
    project: 'kierancanter.dev',
    githubURL: 'https://github.com/kierancanter/kierancanter.dev',
    projectURL: 'https://kierancanter.dev',
    description: "The website you're viewing. Heavily focused on responsive design, accessibility, and pixel-perfect attention to detail. Roughly designed in Figma. Component prototypes tested in CodePen. Coded and developed in Cursor. Hosted on AWS and deployed with Vercel. Analytics tracked with Umami and stored through a PostgreSQL database on Supabase.",
    technologies: ['TypeScript', 'HTML5/CSS3', 'React', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    wip: false,
  },
  {
    project: 'UFC Win Factors Model',
    githubURL: 'https://github.com/kierancanter/ufcwinfactors',
    description: "A statistical analysis performed on UFC fighter and event stats to determine the qualities and attributes most related to winning fights. The data science pipeline is displayed through a Jupyter Notebook as a tutorial-style modeling. Written in Python, leveraging many popular data science libraries.",
    technologies: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    wip: false,
  },
  {
    project: 'FlipReady',
    githubURL: 'https://github.com/kierancanter/flipready',
    projectURL: 'https://bakkesplugins.com/plugins/view/401',
    description: "Actively maintained plugin for the popular Rocket League mod, BakkesMod. Highly customizable text indicator with decaying gauge bar to visualize the status of your air roll/double jump (for training purposes). Written in C++ using the Bakkesmod SDK. Currently amassed 9000+ downloads.",
    technologies: ['C++'],
    wip: false,
  },
  {
    project: 'Simple Blackjack',
    githubURL: 'https://github.com/KieranCanter/SimpleBlackjack',
    description: "Simple, collaborative blackjack mobile application written for Android using Android Studio. Utilizes a Model-View-Controller architectural pattern. Automated builds and dependency management using Gradle.",
    technologies: ['Kotlin'],
    wip: false,
  },
];
