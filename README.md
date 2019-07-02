# AKS-Notes

[https://aks-notes.herokuapp.com/](https://aks-notes.herokuapp.com/)

An app for storing various notes.

## Installation

To use program:

1. This app requires mongoDB to run. If running locally install mongoDB on computer before continuing.

2. Clone or download zip file to computer.

3. In command prompt cd to root of folder and install npm dependencies needed to run app.

 ```
npm install
```

4. From root, cd into client and install react dependencies.

 ```
npm install
```

5. Create a .env file in the root folder.

6. Add these three variables to the .env file, PORT, JWT\_SECRET, and MONGODB\_URL.

 ```
PORT=5000
```
 
 The JWT_SECRET can be any random letters and numbers, for example the letters and numbers in the bracket.
```
JWT_SECRET={klsdjhfr83648sedjuy82}
```

 You can change the name of the database to any name you like, in my example it is call 'azure-notes-api'.
```
MONGODB_URL=mongodb://127.0.0.1:27017/azure-notes-api
```

7. Cd into the root of the folder and start up the backend development express server.
 
 ```
npm run dev
```
8. In a different command prompt, Cd into the client folder and start up the React server.

 ```
npm start
```

9. When you get the servers running go to `http://localhost:3000` to see the application.

## Features

* Lets you save notes whether signed in or not.

* If not signed in notes are just saved locally.

* if signed in you can access your notes from any device you sign into.

* Choose from various colors for note.

* Mobile responsiveness to look good on any screen size.

## Dependencies

* HTML
* Javascript
* Reactjs
* Nodejs
* Expressjs
* MongoDB
* Mongoosejs
