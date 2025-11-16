import { z } from 'zod';
import { NewPatientSchema, EntrySchema, NewEntrySchema, DiagnosisSchema, HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema } from './utils';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;


export interface Patient extends NewPatient {
  id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

