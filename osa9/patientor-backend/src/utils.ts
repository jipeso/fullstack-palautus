import { z } from "zod";
import { Gender, NewPatient } from "./types";

export const NewPatientSchema = z.object({
      name: z.string(),
      dateOfBirth: z.string(),
      ssn: z.string(),
      gender: z.enum(Gender),
      occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};
