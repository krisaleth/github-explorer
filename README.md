# 🚀 GitHub Explorer

A modern, high-performance GitHub discovery tool built with React 18, TypeScript, and Tailwind CSS. This application provides a seamless interface to search for repositories and explore detailed developer profiles using the GitHub REST API.

🔗 Live Demo: https://kris-github-explorer.vercel.app/
## ✨ Key Features
  Advanced Repository Search: Search millions of repos with real-time results.

  Dynamic Sorting: Filter by Stars, Forks, or Help-wanted issues, with support for ascending/descending order.

  Detailed Profile Viewer: View user bios, organizations, and social statistics (Followers/Following) in a sleek glassmorphism card.

  Smart Pagination: Efficiently browse through results with an optimized pagination system.

  Robust Error Handling: Custom error boundaries and user-friendly messages for API rate limits and failed fetches.

  Responsive Design: Fully optimized for all screen sizes using Tailwind's utility-first framework.

## 🛠️ Technical Stack

  Frontend: React (Hooks, Functional Components)

  Type Safety: TypeScript (Strict interfaces for API responses)

  Styling: Tailwind CSS (featuring dark mode and custom gradients)

  Icons: React Icons (Font Awesome)

  Deployment: Vercel (Continuous Deployment)

## 📂 Project Structure
```
  src/
  ├── components/     # Reusable UI parts (RepoCard, SearchForm, Pagination, etc.)
  ├── services/       # GitHub API integration & response handling logic
  ├── models/         # TypeScript interfaces (SearchResponse, GithubRepo, GitHubProfile)
  ├── utils/          # Utility functions (date formatting, etc.)
  └── App.tsx         # Root component and layout management
```

## 📦 Local Installation
  Clone the Repo:

  ```bash
  git clone https://github.com/krisaleth/github-explorer.git
  cd github-explorer
  ```

  Install Dependencies:

  ```bash
  npm install
  ```

  Launch Development Server:

  ```bash
  npm run dev
  ```

## 📝 GitHub API Rate Limit Note

This app uses the public GitHub API. Unauthenticated requests are limited to 60 per hour.

  If you encounter a 403 error, the rate limit has likely been reached.

  To fix this, you can configure a Personal Access Token in your environment variables.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

Built with ❤️ by krisaleth