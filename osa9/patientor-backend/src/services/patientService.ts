import { v4 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import patients from '../../data/patients';

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientById = (patientId: string) => {
  return patients.find(p => p.id === patientId);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatientById,
    getNonSensitivePatients,
    addPatient
};