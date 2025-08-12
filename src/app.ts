import express from 'express';
import path from 'path';
import aboutRouter from './routes/about';

const app = express();
const PORT = process.env.PORT || 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// About route
app.use('/', aboutRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
