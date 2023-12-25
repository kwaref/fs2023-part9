/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients';
import { NewPatient, UnsecuredPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): UnsecuredPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: NewPatient): UnsecuredPatient => {
  const newPatient = {
    id: uuid(), ...patient
  };

  return newPatient;
};

export default {
  getPatients,
  addPatient
};