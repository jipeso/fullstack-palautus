import { LocalHospital } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, Stack } from '@mui/material';

import { Diagnosis, HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses } : Props) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2}}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">{entry.date}</Typography>
          <LocalHospital color="primary" />
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

        {entry.discharge && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Discharged {entry.discharge.date}: <i>{entry.discharge.criteria}</i>
          </Typography>
        )}

        <Typography variant="body2" sx={{ mt: 1 }}>
          Diagnose by {entry.specialist}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default HospitalEntryDetails;