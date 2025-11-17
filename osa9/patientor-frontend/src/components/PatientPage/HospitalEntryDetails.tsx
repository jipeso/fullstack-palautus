import { LocalHospital } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, Stack } from '@mui/material';

import { Diagnosis, HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses } : Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">{entry.date}</Typography>
          <LocalHospital color="primary" />
        </Stack>

        <Typography>
          <i>{entry.description}</i>
        </Typography>

        {entry.diagnosisCodes && (
          <List>
            {entry.diagnosisCodes?.map(code => {
              const diagnosis = diagnoses.find(d => d.code === code);
              return (
                <ListItem key={code}>
                  {code} {diagnosis?.name}
                </ListItem>                      
              );
            })}
          </List>
        )}

        {entry.discharge && (
          <Typography>
            Discharged {entry.discharge.date}: <i>{entry.discharge.criteria}</i>
          </Typography>
        )}

        <Typography>
          Diagnose by {entry.specialist}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default HospitalEntryDetails;