# pursist
Purple Team client project - Stakeholder Input Synthesis Tool

## Set-up Local Database (on a Mac)
1) Install the [Postgres App](https://postgresapp.com/) and [pgAdmin](https://www.pgadmin.org/download/pgadmin-4-macos/)

2) Open the Postgres app and create a new server. Make sure to use port 5432. The name doesn't really matter. Make sure the directory you choose is empty, and then initialize the server.

## Run Instructions
```
npm install

npm start
```

Direct your browser to localhost:3000 to use the app.

## Pushing to the live app
1) Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)

2) Go into app directory

3) ```heroku login```

4) ```heroku git:remote -a pursist```

5) To deploy master branch, run ```git push heroku master```

## Resources
- [Express routing guide](https://expressjs.com/en/guide/routing.html)
- [Pug quick start](https://pugjs.org/api/getting-started.html)
- [HTML <=> Pug converter](https://pughtml.com/)