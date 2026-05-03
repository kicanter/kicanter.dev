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
    project: 'Filebender',
    githubURL: 'https://github.com/kicanter/filebender',
    description: `Native and feature-rich file explorer for Linux. 'Tis but a pipedream currently.`,
    technologies: ['TBD'],
    wip: true,
  },
  {
    project: 'Clipbender',
    githubURL: 'https://github.com/kierancanter/clipbender',
    description: `Linux clipboard manager modeled after Neovim registers.`,
    technologies: ['Odin?'],
    wip: true,
  },
  {
    project: 'huey',
    githubURL: 'https://github.com/kicanter/huey',
    description: `Small and fast TUI tool for color selection and conversion directly from your
      terminal. Proof-of-concept project for <span class='inline-code'>libchroma</span>. Perhaps a neovim plugin to accompany it?
        Written in Rust btw.`,
    technologies: ['Rust'],
    wip: true,
  },
  {
    project: 'libchroma',
    githubURL: 'https://github.com/kicanter/libchroma',
    description: `Zero-dependency library for color conversion across various color spaces and color
      models. Compatible with your favorite language as a stable C lib. Written in Zig.`,
    technologies: ['Zig', 'C'],
    wip: false,
  },
  {
    project: 'candela.nvim',
    githubURL: 'https://github.com/kicanter/candela.nvim',
    description: `Neovim plugin for efficient log analysis. Allows users to manage regex patterns,
      highlight matched lines, filter out non-matches, and rapidly navigate through matches.
      Customizable user configuration and support for multiple regex search engines. Written in
    Lua.`,
    technologies: ['Lua'],
    wip: false,
  },
  {
    project: 'kicanter.dev',
    githubURL: 'https://github.com/kicanter/kicanter.dev',
    projectURL: 'https://kicanter.dev',
    description: `The website you're viewing. Heavily focused on responsive design, accessibility,
    and pixel-perfect attention to detail. Roughly designed in Figma. Component prototypes tested in
    CodePen. Coded and developed in Cursor. Hosted on AWS and deployed with Vercel. Analytics
    tracked with Umami and stored through a PostgreSQL database on Supabase.`,
    technologies: ['TypeScript', 'HTML5/CSS3', 'React', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    wip: false,
  },
  {
    project: 'UFC Win Factors Model',
    githubURL: 'https://github.com/kicanter/ufcwinfactors',
    description: `A statistical analysis performed on UFC fighter and event stats to determine the
    qualities and attributes most related to winning fights. The data science pipeline is displayed
    through a Jupyter Notebook as a tutorial-style modeling. Written in Python, leveraging many
    popular data science libraries.`,
    technologies: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    wip: false,
  },
  {
    project: 'FlipReady',
    githubURL: 'https://github.com/kicanter/flipready',
    projectURL: 'https://bakkesplugins.com/plugin/401',
    description: `Actively maintained plugin for the popular Rocket League mod, BakkesMod. Highly
      customizable text indicator with decaying gauge bar to visualize the status of your air
    roll/double jump (for training purposes). Written in C++ using the Bakkesmod SDK. Over 10000
        downloads.`,
    technologies: ['C++'],
    wip: false,
  },
];
