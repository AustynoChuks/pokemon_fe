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
git clone https://github.com/AustynoChuks/pokemon_fe.git
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
VITE_POKEMON_API_BASE_URL=<local_api_base_path/api>


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
| `VITE_POKEMON_API_BASE_URL` | Base URL for the Pokemon API | `<local api service url/api> i.e http://localhost:8080/api` |


## API Configuration


### Custom API Setup

If you want to use a different Pokemon API:

1. Update `VITE_POKEMON_API_BASE_URL` in your `.env` file

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

![image](https://github.com/user-attachments/assets/f7b0bd40-ed2a-4b04-ae28-ae47ff462962)
![image](https://github.com/user-attachments/assets/f7b0bd40-ed2a-4b04-ae28-ae47ff462962)

![image](https://github.com/user-attachments/assets/2166036b-88d6-4bbc-b570-cb84bcf97254)
![image](https://github.com/user-attachments/assets/2166036b-88d6-4bbc-b570-cb84bcf97254)

![image](https://github.com/user-attachments/assets/3d4df683-0c6c-4539-8a77-cc106e399758)
![image](https://github.com/user-attachments/assets/3d4df683-0c6c-4539-8a77-cc106e399758)

### Add New Team
![image](https://github.com/user-attachments/assets/d4db0f64-8e40-4d64-8543-63a15da4f23b)
![image](https://github.com/user-attachments/assets/d4db0f64-8e40-4d64-8543-63a15da4f23b)

### Add pokemon to new team
![image](https://github.com/user-attachments/assets/7d644167-b97d-4ec6-8b85-27a3525b2596)
![image](https://github.com/user-attachments/assets/7d644167-b97d-4ec6-8b85-27a3525b2596)
