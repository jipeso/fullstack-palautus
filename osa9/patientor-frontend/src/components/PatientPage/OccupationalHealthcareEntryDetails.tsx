import { Work } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, Stack } from '@mui/material';

import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses } : Props) => {
   return (
    <Card variant="outlined" sx={{ mb: 2, p: 2}}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">{entry.date}</Typography>
          <Work color="primary" />
          <Typography variant="h6">{entry.employerName}</Typography>
        </Stack>

        <Typography variant="body1" sx={{ mt: 1, fontStyle: "italic" }}>
          {entry.description}
        </Typography>

        {entry.diagnosisCodes && (
          <List dense sx={{ mt: 1}}>
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
          <Typography variant="body2" sx={{ mt: 1 }}>
            Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        )}
        
        <Typography variant="body2" sx={{ mt: 1 }}>
          Diagnose by {entry.specialist}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;