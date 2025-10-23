import express from 'express';
import querystring from 'node:querystring';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber, isNotArray } from './utils/helper';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Express with TypeScript');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const parsedUrl = querystring.parse(req.url.split('?')[1]);
  const height = Number(parsedUrl.height);
  const weight = Number(parsedUrl.weight);

  if (!height || !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises , target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (isNotArray(daily_exercises) || daily_exercises.some(isNotNumber) || isNotNumber(target)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(daily_exercises, target);

  res.send(result);

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
