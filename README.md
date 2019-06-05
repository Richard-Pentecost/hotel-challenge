Hotel Challenge

Your challenge is to create a database and web API for a hotel booking system, which implements the following requirements

Requirements:
  1.  Users should be able to sign up to the systme with a name and email address
  2.  Hotels should be able to register witha name, address and email address
  3.  Users should be able to make bookings at hotels
  4.  Bookings have a start date and an end date
  5.  Bookings must be accepted by the hotel
  6.  To prevent overbooking, hotels should specify the number of rooms that they have
  7.  If a booking is requested and all the rooms in a hotel are booked on any of the requested nights, do not allow the booking to be made
  8.  Hotels can set exceptions for days when they have more or less rooms available than usual
  9.  The above should only account for confirmed bookings

Project Setup

  Repo Setup

  1.  Create a new directory for the project on your computer
  2.  Create the README
  3.  Initialize a git repository in the new directory (git init - initializes an empty git repository on local machine)
  4.  Create .gitignore file
  5.  Create repo on github
  6.  Sync local directory to remote Github repo (... or push an existing repository from the command line)
  7.  Initialize a new NPM project in project directory (npm inint)
  8.  Add node_modules to .gitignore file
  9.  Install eslint-config-mcr-codes as a dev dependency, and configure a .eslintrc file according to documentation
      - Documentation found at www.npmjs.com/package/eslint-config-mcr-codes?activeTab=readme
      - Basically install a couple of eslint npm packages
      - Create an .eslintrc and fill out as documentation says 

  Application Setup

  1.  Install express and mongoose, saving them as dependencies (npm install express mongoose --save)
  2.  Setup basic src/app.js and index.js files
      - app.js should configure and export a basic Express application 
              
              /*  const express = require('express'); 
                  const app = express();
                  module.exports = app; 
              */

      - index.js should connect to a MongoDB database, using Mongoose and a DATABASE_CONN environment variable, and the start (listen) the application defined in src/app.js

              /*  const mongoose = require('mongoose');
                  const app = require('./src/app');
                  mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
                    app.listen(3000);
                  });
              */
  3.  Install dotenv and nodemon as dev dependencies (npm install dotenv nodemom --save-dev)
  4.  Add a start script to the package.json - nodemon -r dotenv/config index.js
      - This uses nodemon to execute the index.js file with environment variable from a .env file
  5.  Create .env file with a DATABASE_CONN value set to a MongoDB database (mongodb://127.0.0.1:27017/library-api, for local database)
      - Either a local database, or one from MLab
  6.  Add .env file to the .gitignore

  Test Environement Setup

  1.  Install mocha, chai and chai-http as dev dependencies
      - npm install mocha chai chai-http --save-dev
  2.  Copy accross .mocha.opts and mocha.config.js files from music api project
  3.  Create a .env.test file with a DATABASE_CONN value that is different to the other .env file
  4.  Add the .env.test file to .gitignore
  5.  In the package.json add 'mocha tests/**/*.test.js --opts .mocha.opts' to the test script
  6.  Need to update eslintrc with a load of overrides (look at the eslintrc file)
