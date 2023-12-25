export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type UnsecuredPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<UnsecuredPatient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}