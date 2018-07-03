# Scrapp(e) Mango
A Reddit Webscrapper that can dynamically scrape subreddit listings.
## Instructions
The app runs on the mern Stack, so the installation of Node.js, NPM and MongoDB are required in order to run. To run locally, clone this repo, ensure that the mongoDB daemon process is running, navigate to the scrappy-mango directory, run the command `npm install`, and then run any of the npm start scripts below.
```shell
#normal server start > localhost:8080 
$ npm run server

#nodemon server start > localhost:8080
$ npm run server

#nodemon and webpack dev server > webpack(react): localhost:3000/, express: localhost:8080/api
$ npm run dev
```
## Details
Scrappy mango uses cherio to scrape old reddit pages and stores the information in mango db. on server start the app scrapes the subreddit listings to be used on the client side as a directory of sorts. Currently due to the limitations of deploying web applications on heroku for free, the subreddit scrape caps off at 600 subreddit listings. This eases the load time of the deployed app since heroku puts dynos to sleep after a period of activity and the database plugin does not store information indefinitely. The 'popular' subreddit is scraped by default. Other subreddits are scraped upon request and stored in the database. Needless to say, the second load of a subreddit is much faster then the initial load.
## known Issues 
  - the app currently has no way of tracking new posts in a subreddit save from a database reset.
  - certain large packets of data should be lazy loaded to improve the initial client load. Currently this is not implemented.
  - Client currently waits for the initial subreddit scrape to complete before displaying any data. This is an issue since the app is deployed on heroku. Heroku deployed apps are not always running, making initial requests after a period of inactivity very slow.
## dependencies
  - node
  - mongoDB
  - mongoose
  - cheerio
  - redux/redux-thunk/react-redux
  - node-sass/sass-loader/svg-loader/...
  - bootstrap/react-bootstrap
  - react
  - axios
  - babel
  - express
  - body-parser
See package.json for more info.
