import { Diagnosis, Entry } from "../../types";
import HospitalEntryDetails from './HospitalEntryDetails.tsx';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails.tsx';
import HealthCheckEntryDetails from './HealthCheckEntryDetails.tsx';
import { assertNever } from '../../utils';

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/>;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
    }
  };

export default EntryDetails;