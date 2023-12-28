import express from 'express';
const app = express();
import cors from 'cors';
import patientRouter from './src/routes/patients';
import diagnosisRouter from './src/routes/diagnoses';

app.use(cors());
app.use(express.json());

app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});