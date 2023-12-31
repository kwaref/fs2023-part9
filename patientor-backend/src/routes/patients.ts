import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId, NewPatient } from '../types';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    res.send(patientService.getPatient(id));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(404).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(
      newPatient
    );
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // const id = req.params.id;
    const newEntry: EntryWithoutId = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(
      newEntry
    );
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;