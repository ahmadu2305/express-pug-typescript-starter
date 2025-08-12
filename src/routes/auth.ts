import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';

const router = Router();

// In-memory user store (for demo only)
const users: { id: number; username: string; passwordHash: string }[] = [];

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, passwordHash });
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export { users };
export default router;
