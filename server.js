// path is a node module that provides utilities for working with file and directory paths
const path = require('path');
// require express node module for structuring and handling multiple requests at specified URLs
const express = require('express');
// require express sessions node modules for storing user data with cookies
const session = require('express-session');
// require express handlebars node modules to create a handlebars engine
const exphbs = require('express-handlebars');
// require connect-session-sequelize to store SQL sessions using sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import routes from controller file
const routes = require('./controllers');
// import connection details from connection file
const sequelize = require('./config/connection');
// import custom helpers - not yet used
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// session information
const sess = {
  // secret required to sign the session ID 
  secret: 'Willy Wonka',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// setup handlebars.js engine with custom (currently unused) helpers
const hbs = exphbs.create({ helpers });

// tell express to use the handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT: $(PORT)`));
});