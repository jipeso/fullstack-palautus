import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, Typography, Autocomplete, Chip } from '@mui/material';

import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const healthCheckRatingOptions = Object.values(HealthCheckRating)
  .filter(v => typeof v === "number") as number[];


const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState('HealthCheck');

  const [date, setDate] = useState('');
  const [description, setDescrption] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

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
      diagnosisCodes: diagnosisCodes.length > 0
        ? diagnosisCodes.map(d => d.code)
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
        <Select fullWidth value={type} sx={{ mb:2 }} onChange={e => setType(e.target.value)}>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
        </Select>

        <TextField
          label="Date"
          type="date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{
            shrink: true,
          }}          
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

        <Autocomplete
          multiple
          options={diagnoses}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          value={diagnosisCodes}
          onChange={(_, newValue) => setDiagnosisCodes(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Diagnosis Codes"
              placeholder="Select diagnoses"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.code}
                {...getTagProps({ index })}
                key={option.code}
              />
            ))
          }
        />

      {type === "HealthCheck" && (
        <>
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            fullWidth
            value={healthCheckRating}
            sx={{ mb: 2 }}
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
          <Typography sx={{ mb: 2 }}>Discharge</Typography>
          <TextField
            fullWidth
            label="Discharge date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={dischargeDate}
            onChange={e => setDischargeDate(e.target.value)}
          />
          <TextField
            fullWidth
            label="Discharge criteria"
            value={dischargeCriteria}
            sx={{ mb: 2 }}
            onChange={e => setDischargeCriteria(e.target.value)}
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
          />

          <Typography sx={{ mb:2 }}>Sick Leave</Typography>
          <TextField
            fullWidth
            label="Start date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={sickLeaveStart}
            onChange={e => setSickLeaveStart(e.target.value)}
          />
          <TextField
            fullWidth
            label="End date"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={sickLeaveEnd}
            sx={{ mb: 2 }}
            onChange={e => setSickLeaveEnd(e.target.value)}
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