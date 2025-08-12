import { Router } from 'express';

const router = Router();

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', message: 'This is the About page.' });
});

export default router;
