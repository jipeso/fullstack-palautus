import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, Typography } from '@mui/material';

import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const healthCheckRatingOptions = Object.values(HealthCheckRating)
  .filter(v => typeof v === "number") as number[];


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState('HealthCheck');

  const [date, setDate] = useState('');
  const [description, setDescrption] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');


  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const defaultFields = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(',')
        : undefined
    };

    switch (type) {
      case "HealthCheck":
        return onSubmit({
          ...defaultFields,
          type: "HealthCheck",
          healthCheckRating
        });

      case "OccupationalHealthcare":
        return onSubmit({
          ...defaultFields,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd
                }
              : undefined
        });
      
      case "Hospital":
        return onSubmit({
          ...defaultFields,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        });

      default:
        return;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Type</InputLabel>
        <Select fullWidth value={type} onChange={e => setType(e.target.value)}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescrption(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

      {type === "HealthCheck" && (
        <>
          <InputLabel sx={{ mt: 2 }}>Health Check Rating</InputLabel>
          <Select
            fullWidth
            value={healthCheckRating}
            onChange={e => setHealthCheckRating(Number(e.target.value))}
          >
            {healthCheckRatingOptions.map(value => (
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      {type === "Hospital" && (
        <>
          <Typography sx={{ mt: 2 }}>Discharge</Typography>
          <TextField
            fullWidth
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            value={dischargeDate}
            onChange={e => setDischargeDate(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            label="Discharge criteria"
            value={dischargeCriteria}
            onChange={e => setDischargeCriteria(e.target.value)}
            sx={{ mt: 1 }}
          />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            fullWidth
            label="Employer name"
            value={employerName}
            onChange={e => setEmployerName(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Typography sx={{ mt: 2 }}>Sick Leave</Typography>
          <TextField
            fullWidth
            label="Start date"
            placeholder="YYYY-MM-DD"
            value={sickLeaveStart}
            onChange={e => setSickLeaveStart(e.target.value)}
            sx={{ mt: 1 }}
          />
          <TextField
            fullWidth
            label="End date"
            placeholder="YYYY-MM-DD"
            value={sickLeaveEnd}
            onChange={e => setSickLeaveEnd(e.target.value)}
            sx={{ mt: 1 }}
          />
        </>
      )}        

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;