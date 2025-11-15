import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const match = useMatch('/patients/:id');
  const id = match?.params.id;

  useEffect(() => {
    if (!id) return;

    patientService.getById(id)
      .then((patient: Patient) => setPatient(patient))
      .catch((error) => console.error(error));
  }, [id]);

  if (!patient) {
    return <div>loading ...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};
export default PatientPage;