import patientsData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatient = (id: string): Patient => {
  const patient = patientsData.find(p => p.id === id);
  console.log(patient);
  if (patient) {
    return patient;
  } else {
    throw new Error("Patient not found.");
  }
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(), ...patient
  };

  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient
};