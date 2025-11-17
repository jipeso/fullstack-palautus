import { Female, Male, Transgender } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

import patientService from '../../services/patients';
import { Patient, Diagnosis, EntryFormValues } from '../../types';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';


interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses } : Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

  const match = useMatch('/patients/:id');
  const id = match?.params.id;

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>no matching patient found</div>;
  }

  const getGenderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <Male />;
      case 'female':
        return <Female />;
      case 'other':
        return <Transgender />;
      default:
        return null;
    }
  };

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return;

    try {
      const addedEntry = await patientService.createEntry(patient.id, values);
      setPatient({
        ...patient,
        entries: [...patient.entries, addedEntry]
      });
      setModalOpen(false);
    } catch (e: unknown) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError("Something went wrong");
      }
    }
};

  return (
    <div>
      <div>
        <h2>{patient.name} {getGenderIcon()}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>

      <Button variant="contained" onClick={openModal}>
        Add new entry
      </Button>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
        diagnoses={diagnoses}
      />

      <div>
        <h3>entries</h3>
          {patient.entries.map(entry => (
            <EntryDetails
              key={entry.id}
              entry={entry}
              diagnoses={diagnoses}
            />
          ))}
      </div> 

    </div>

  );
};
export default PatientPage;