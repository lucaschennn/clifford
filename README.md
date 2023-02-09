# Clifford
*Information*
## Frontend
The frontend boilerplate was initialized using Vite. Everything is rendered in as a single-page application. There is an index.html skeleton populated with React components. The structure goes main.jsx -> App.jsx -> the rest of the componenents. The home (/) route and the /about routes are available and are all served from the frontend. The /about route is showing an API response from the backend. The frontend is running by default on port 127.0.0.1:5173.

## Backend
The backend uses Express.js to expose API endpoints. index.js is ran first which initializes the app and uses the /api route defined in api.js. api.js uses cors to allow requests from outside sources. Currently the frontend default port 127.0.0.1:5173 is hardcoded as the only available origin. User registration/login is being outsourced to Auth0. It is also automatically updating the users table in the database. The database is being hosted on clever-cloud, a free database hosting server for up to something like 250MB. 

## Usage
You will need to run a development server for both ends. Have two terminals open and cd into the respective directories. 'npm install' to install dependencies. Type 'npm run dev' in both terminals. Navigate to port 127.0.0.1:5173 in your browser.

## Editing
Please read to understand the file structure if you are confused!!!
### Frontend
Editing the frontend means editing the client-facing page views. To edit the main home page, edit the .jsx files in src but NOT in src > pages. To edit the other pages, edit in src > pages. Create a new .jsx file and call it in the respective {pagename}.jsx file. If you are creating a component for the main page, put that file in src but NOT src > pages. Call it in App.jsx. If you would like to create a new route altogether (e.g. url.com/products), create a Products.jsx in src > pages. Import that component in App.jsx, and add it to the list of routes following the syntax of the others. Bootstrap is already installed, so you may use any Bootstrap class when you are writing components. There is no css yet besides Bootstrap, so feel free to make a folder for css files in src.
### Backend
Basically all changes should be made in api.js. The premise is to create new routes (following the structure of other examples or google Express routing) that the frontend can call and request data from the database. It uses the node mysql library, and allows you to create a connection (which is stored in the connection variable). You can then do SQL queries like so: connection.query({query}). Please be careful to not accidentally drop tables or the database. Using this, the frontend calls one of the api.js routes, and api.js returns the requested resource from the database using the SQL queries.