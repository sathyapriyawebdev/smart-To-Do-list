# Smart To-Do List

A modern React + Vite task manager with AI-powered suggestion support.

## Features

- React 18 app bootstrapped with Vite
- Tailwind CSS styling
- AI suggestion component powered by Gemini API
- Task list, task item, and task form components
- Environment variable support for secure API keys

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Start the development server:

```bash
npm start
```

4. Open the URL shown in the terminal (example: `http://localhost:5173/` or `http://localhost:5174/`).

## Available scripts

- `npm start` - start Vite development server
- `npm run build` - create production build
- `npm run preview` - serve production build locally

## Notes

- The project uses `src/index.jsx` as the React entry point.
- `.env` is ignored by Git by default, so your API key stays safe.
- If the Vite server auto-switches ports because `5173` is taken, open the alternative port printed in the terminal.

## Troubleshooting

- If HMR fails with a websocket error, check the port in the browser URL and the port shown by Vite.
- If AI suggestions fall back to the default message, confirm `VITE_GEMINI_API_KEY` is set and valid.

