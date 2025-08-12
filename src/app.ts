
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bodyParser from 'body-parser';
import aboutRouter from './routes/about';
import authRouter, { users } from './routes/auth';
import bcrypt from 'bcrypt';


const app = express();
const PORT = process.env.PORT || 3000;


// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy.Strategy(
  async (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  }
));
passport.serializeUser((user: any, done) => done(null, user.id));
passport.deserializeUser((id: number, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});


// Root route
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});


// About route
app.use('/', aboutRouter);

// Auth routes
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
