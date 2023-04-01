# Clifford
*An eCommerce web app connecting customers and businesses in a more direct manner. Clifford seeks to provide small businesses with a platform and lens into their community as well as a repository of local businesses and products for consumesrs*
## Installation
### Prerequisities
Node.js v16.14.2
npm package manager
### Installation steps
1. cd into your desired directory
2. Using the git command line interface, write
```
git clone https://github.com/lucaschennn/clifford.git
```
3. When adding a feature, remember to ```git branch <new-branch-name>```
4. To run the app, you will need to run a development server for both the frontend and backend. Have two terminals open and cd into ./frontend and ./backend and type ```npm run dev``` for both.
5. Navigate to [127.0.0.1:5173](127.0.0.1:5173) in your web browser

### Project Structure
The project is divided into /frontend and /backend.
#### Frontend
If you are writing the skeleton component for a new page, create an appropriately named .jsx file in ./src/pages. To have a subpage link to that component, go to App.jsx and create a new instance of the Route component similar to the format of the others. The path attribute represents the subpage and the element attribute represents which component to render. Don't forget to import it!
All project css is written in main.css.
#### Backend
The backend consists of the Clifford API and the database which the Clifford API abstracts. The only potential thing you would change is api.js, which consists of all API routes that can be called by the frontend. It also connects to the database in this file.