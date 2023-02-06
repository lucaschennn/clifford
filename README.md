# Clifford
*Project Skeleton*
## Frontend
The frontend boilerplate was initialized using Vite. Everything is rendered in as a single-page application. There is an index.html skeleton populated with React components. The structure goes main.jsx -> App.jsx -> the rest of the componenents. The home (/) route and the /about routes are available and are all served from the frontend. The /about route is showing an API response from the backend. The frontend is running by default on port 127.0.0.1:5173.

## Backend
The backend uses Express.js to expose API endpoints. index.js is ran first which initializes the app and uses the /api route defined in api.js. api.js uses cors to allow requests from outside sources. Currently the frontend default port is hardcoded as the only available origin.

## Usage
You will need to run a development server for both ends. Have two terminals open and cd into the respective directories. Type 'npm run dev' in both terminals. Navigate to port 127.0.0.1:5173 in your browser.

## Changes
Many files are not relevant for our purposes. Frontend changes will usually happen in frontend > src with the only exception being index.html. Most 'html' will be React components anyway. Backend changes will almost always occur in api.js until a server gets connected.