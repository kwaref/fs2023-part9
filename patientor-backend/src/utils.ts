/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Diagnosis, Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatient, SickLeave } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param as string);
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v.toString()).includes(param as string);
};


const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error('Incorrect or missing date: ' + object);
    }
    return object as Discharge;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
        throw new Error('Incorrect or missing date: ' + object);
    }
    return object as SickLeave;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('date' in object && 'description' in object && 'specialist' in object && 'type' in object) {
        switch (object.type) {
            case 'Hospital':
                if ('discharge' in object) {
                    return {
                        date: parseDateOfBirth(object.date),
                        description: parseName(object.description),
                        specialist: parseName(object.specialist),
                        diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
                        type: 'Hospital',
                        discharge: parseDischarge(object.discharge)
                    };
                }
                break;
            case 'HealthCheck':
                if ('healthcheckRating' in object) {
                    return {
                        date: parseDateOfBirth(object.date),
                        description: parseName(object.description),
                        specialist: parseName(object.specialist),
                        diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
                        type: 'HealthCheck',
                        healthCheckRating: parseHealthCheckRating(object.healthcheckRating)
                    };
                }
                break;
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    return {
                        date: parseDateOfBirth(object.date),
                        description: parseName(object.description),
                        specialist: parseName(object.specialist),
                        diagnosisCodes: 'diagnosisCodes' in object ? parseDiagnosisCodes(object.diagnosisCodes) : undefined,
                        type: 'OccupationalHealthcare',
                        employerName: parseName(object.employerName),
                        sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined
                    };
                }
                break;
            default:
                break;
        }
    }
    throw new Error('Incorrect data: some fields are missing');
}; 