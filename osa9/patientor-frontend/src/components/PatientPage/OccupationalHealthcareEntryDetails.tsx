import { Work } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, Stack } from '@mui/material';

import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses } : Props) => {
   return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">{entry.date}</Typography>
          <Work color="primary" />
          <Typography variant="h6">{entry.employerName}</Typography>
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

        {entry.sickLeave && (
          <Typography>
            Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        )}
        
        <Typography>
          Diagnose by {entry.specialist}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;