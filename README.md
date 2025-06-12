# Pokemon Team Builder

A React-based web application for building and managing Pokemon teams. Built with TypeScript, Vite, and Tailwind CSS.

## Features

- 🔍 Search and add Pokemon to your teams
- 👥 Create and manage multiple teams (up to 6 Pokemon per team)
- 💾 Local storage persistence
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pokemon_fe
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file and configure the following variables:

```env
# API Configuration
VITE_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
VITE_API_TIMEOUT=10000

# Application Configuration
VITE_APP_NAME=Pokemon Team Builder
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=true
VITE_ENABLE_LOGGING=true

# Local Storage Configuration
VITE_STORAGE_PREFIX=pokemon_teams_

# Feature Flags
VITE_ENABLE_TEAM_SHARING=false
VITE_MAX_TEAM_SIZE=6
VITE_MAX_TEAMS_PER_USER=10

# UI Configuration
VITE_DEFAULT_THEME=light
VITE_ENABLE_DARK_MODE=true
```

### 4. Start the Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

### Required Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_POKEMON_API_BASE_URL` | Base URL for the Pokemon API | `https://pokeapi.co/api/v2` |

### Optional Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_TIMEOUT` | API request timeout in milliseconds | `10000` |
| `VITE_APP_NAME` | Application name | `Pokemon Team Builder` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_MAX_TEAM_SIZE` | Maximum Pokemon per team | `6` |
| `VITE_MAX_TEAMS_PER_USER` | Maximum teams per user | `10` |
| `VITE_STORAGE_PREFIX` | Local storage key prefix | `pokemon_teams_` |
| `VITE_ENABLE_TEAM_SHARING` | Enable team sharing feature | `false` |
| `VITE_DEFAULT_THEME` | Default UI theme | `light` |
| `VITE_ENABLE_DARK_MODE` | Enable dark mode toggle | `true` |

## API Configuration

This project uses the [PokéAPI](https://pokeapi.co/) to fetch Pokemon data. The API is free and doesn't require authentication.

### Custom API Setup

If you want to use a different Pokemon API:

1. Update `VITE_POKEMON_API_BASE_URL` in your `.env` file
2. Modify the `PokemonClient` service in `src/service/` to match your API's response format
3. Update any TypeScript interfaces if the data structure differs

## Project Structure

```
src/
├── components/          # React components
│   ├── NewTeam.tsx     # Team creation component
│   └── Teams.tsx       # Teams listing component
|   └── Team.tsx       # Teams Details component (see team score here)
├── service/            # API and storage services
│   └── storage.ts      # Local storage service
|   └── pokemon.ts      # Api service for the backend
└── .env          # Environment variables config (Create this once you clone and set VITE_POKEMON_API_BASE_URL to the api endpoint of the backend service)
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint 

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Common Issues

1. **Port already in use**: If port 5173 is busy, Vite will automatically use the next available port.

2. **Environment variables not working**: Make sure all custom environment variables are prefixed with `VITE_`.

3. **API requests failing**: Check that `VITE_POKEMON_API_BASE_URL` is correctly set and the API is accessible.

4. **Build errors**: Run `npm run type-check` to identify TypeScript issues.

### Getting Help

- Check the browser console for error messages
- Verify your `.env` file configuration
- Ensure all dependencies are installed correctly
- Check that Node.js version is 16 or higher


## License

This project is licensed under the MIT License - see the LICENSE file for details.
