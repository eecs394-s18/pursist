# PurSIST

[PurSIST](http://pursist.herokuapp.com/) is currently hosted on Heroku!
PurSIST is a web application tool designed to improve lab meeting productivity by providing an interface for meeting attendees to submit problem statements such that the meeting organizers can then tag the cards with causal variables, leading to a better visualization and organization system for lab issues.

PurSIST was designed during Spring 2018 for EECS 394, as the Purple Team client project for Spencer Carlson (Delta Lab). The developers are no longer regularly active on this project but are happy to answer questions in the form of email (see Julia's email below) or Github issues.

Developer Team:
Julia Wilkins (juliawilkins2018@u.northwestern.edu), Ben Scharf (bscharf@u.northwestern.edu), Victoria Cabales, David Jung, Ilham Jardin, Daanish Khazi.

![Alt Text](https://media.giphy.com/media/1ynEvsZBPIljlqxhEa/giphy.gif)

Table of Contents
=================
<!--ts-->
	
   * [PurSIST](#pursist)
   * [Installation](#installation)
      * [Getting Started](#getting-started)
      * [Set up local database](#set-up-local-database)
      * [Set up session handling](#set-up-session-handling)
   * [Running the app locally](#running-the-app-locally)
   * [Deploying to live app](#deploying-to-live-app)
   * [Current platform and app constraints](#current-platform-and-app-constraints)
   * [Further resources](#further-resources)
<!--te-->

## Getting Started
There are two ways you can run the app - locally (on your own machine), or on [Heroku](http://pursist.herokuapp.com/). Heroku allows for a temporary live app - this will not stay forever sadly. To develop the app locally, start by going into Terminal (MacOSX), navigating to where you want to save the folder, and running the following command: 

```
git clone https://github.com/eecs394-s18/pursist.git

```
Now you will have a folder with all of the code in it. Follow typical Git practices to continue development such as those explained [here](https://guides.github.com/). Below we will include some startup tips for working on the app locally and pushing to heroku so others can access your app.

This is a webapp made using [Express](https://expressjs.com/), Posgres, and Redis. 

## Installation

### Set up local database

Note: This guide is for MacOSX only.

1) Install the [Postgres App](https://postgresapp.com/) and [pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/). Postgres is the actual database app, while pgAdmin is a tool for visually monitoring your database.

2) Open the Postgres app and create a new server. Make sure to use port 5432. The name doesn't really matter. Make sure the directory you choose is empty, and then initialize the server.

For more help/info on setting up Postgres, see [this link](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb#1-postico-httpseggerappsatpostico). **This includes a ton of information - way more than you need here. Follow 1 and 2 for the Postgres stuff, then skip to the second section titled "2. pgAdmin" for help on how to set this up. When you run the app (see "Running the app locally", the first run will actually initialize the database in the format we want, so you don't have to worry about the other stuff in this guide.**

Another useful tip for working with the DB locally is that if you ever want to delete the local database because you changed the structure of it, you can "drop" the pursist "cascade" from the pgAdmin window.

### Set up session handling 

1) Navigate to the pusist folder in terminal

2) Install redis using [Homebrew](https://brew.sh/) : ```brew install redis```

3) Start the redis server from the command line using ```redis-server```

4) Leave the Terminal window open and open a new tab or terminal window

5) Proceed to the "Running the app locally" section next

Extra: 
6) When done using the app, stop the redis server with ^C.



## Running the app locally
In terminal, navigate to the pursist folder and run:

```
npm install

npm start
```

(Note: make sure you have another Terminal window running after using the ```redis-server``` command)

Direct your browser to localhost:3000 to use the app locally!

## Deploying to live app
1) Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line), which will include creating a heroku app and a few other administrative tasks.

2) Navigate into the app directory in Terminal

3) In Terminal run: ```heroku login```

4) Then ```heroku git:remote -a pursist```

5) To deploy master branch after changing code in your folder, run ```git push heroku master```

6) Now you can access the app live on [Heroku](http://pursist.herokuapp.com/)! It might take a second to load.

## Current platform and app constraints
The app is available online (on any device where you can access Internet), but it is not optimized/made to look good on mobile at this time. Development has been done completely on MacOSX so far, however one could likely continue on PC (with different Postgres setup, etc.). At this time, we don't have actual diagram generation in the app, but you can export all of the problem statement cards to CSV.

## Further resources
- [Intense detailed guide on setting up Postgres and pgAdmin](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb#1-postico-httpseggerappsatpostico)
- [Express routing guide](https://expressjs.com/en/guide/routing.html)
- [Pug quick start](https://pugjs.org/api/getting-started.html)
- [HTML <=> Pug converter](https://pughtml.com/)
