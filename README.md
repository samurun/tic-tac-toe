# Tic-Tac-Toe Project User Guide

## Demo
[View Demo](https://tic-tac-toe-pied-iota.vercel.app/)

## Installation

1. Ensure you have Node.js installed on your machine
2. Clone the project from the repository (if available) or create a new project folder
3. Open Terminal and navigate to the project folder
4. Run the following command to install dependencies:

```bash
npm install
```

## Development

To start development, use the command:

```bash
npm run dev
```

This command will start the Vite development server

## Building

When you're ready to build the project for production, use the command:

```Bash
npm run build
```

## Preview

After building, you can preview the build using the command:

```bash
npm run preview
```

## Technologies Used

This project uses the following main technologies:

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/en/main)
- [Clerk](https://clerk.com/)
- [shadcn](https://ui.shadcn.com/)

## Important Notes

- This project uses TypeScript, so make sure you write code in TypeScript (.ts or .tsx files)
- Tailwind CSS is used for styling, so you can use Tailwind classes in your JSX code
- React Query is used for state management and data fetching
- Clerk is used for user authentication management. Check Clerk's documentation for additional setup

## Requirement

- [x] Players must log in before starting the game
- [x] Login must be developed according to OAuth 2.0 standards
- [x] The game rules are the same as regular Tic-Tac-Toe (Player vs Bot)
- [x] There is a scoring system
- [x] When a player defeats the bot, they receive 1 point (if they lose, they lose 1 point)
- [x] If a player defeats the bot 3 times in a row, they will receive an additional bonus point, and the consecutive win count will be reset
