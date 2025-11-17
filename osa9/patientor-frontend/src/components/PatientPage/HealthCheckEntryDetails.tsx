import { MedicalServices, Favorite } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, Stack } from '@mui/material';

import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const getHeartColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "gold";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return "grey";
  }
};

const HealthCheckEntryDetails = ({ entry, diagnoses } : Props) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">{entry.date}</Typography>
          <MedicalServices color="primary" />
        </Stack>

        <Typography>
          <i>{entry.description}</i>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">Health check rating</Typography>
          <Favorite sx={{ color: getHeartColor(entry.healthCheckRating) }} />
        </Stack>

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

        <Typography>
          Diagnose by {entry.specialist}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryDetails;