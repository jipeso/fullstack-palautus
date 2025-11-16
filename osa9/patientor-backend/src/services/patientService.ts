import { v4 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, NewEntry, Entry } from '../types';
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

const addEntry = ( patientId: string, entry: NewEntry ): Entry => {
  const patient = patients.find(p => p.id === patientId);

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient?.entries.push(newEntry);

  return newEntry;

};

export default {
    getPatients,
    getPatientById,
    addEntry,
    getNonSensitivePatients,
    addPatient
};