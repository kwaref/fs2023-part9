import { useState, SyntheticEvent } from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, OutlinedInput, Card, CardContent, Typography, styled, Rating } from '@mui/material';

import { Diagnosis, EntryFormValues } from "../../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const entryTypes = [
  { name: 'Hospital', value: 'Hospital' },
  { name: 'Health Check', value: 'HealthCheck' },
  { name: 'Occupational Healthcare', value: 'OccupationalHealthcare' }
];

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses?: Diagnosis[];
}

interface TypeOption {
  value: string;
  label: string;
}

const typeOptions: TypeOption[] = entryTypes.map(v => ({
  value: v.value, label: v.name
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState('Hospital');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [rating, setRating] = useState(3);



  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entryT = entryTypes.find(g => g.value === value);
      if (entryT) {
        setEntryType(entryT.value);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entryType) {
      case 'Hospital':
        onSubmit({
          description,
          date,
          diagnosisCodes,
          specialist,
          type: 'Hospital',
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        });
        break;
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          diagnosisCodes,
          specialist,
          type: 'HealthCheck',
          healthCheckRating: rating
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          description,
          date,
          diagnosisCodes,
          specialist,
          employerName,
          type: 'OccupationalHealthcare',
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>
        <TextField
          label="Description"
          fullWidth
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          placeholder="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {diagnoses && diagnoses.map((d) => (
            <MenuItem
              key={d.code}
              value={d.code}
            >
              {d.code}
            </MenuItem>
          ))}
        </Select>

        {entryType === 'Hospital'
          ? <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
              <TextField
                type="date"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                label="Discharge Criteria"
                fullWidth
                placeholder="Discharge Criteria"
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </CardContent>
          </Card>
          : entryType === 'OccupationalHealthcare'
            ? <Card sx={{ minWidth: 275, marginTop: 2 }}>
              <CardContent>
                <TextField
                  label="Employer Name"
                  placeholder="Employer Name"
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
                <InputLabel style={{ marginTop: 20 }}>Start Date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>End Date</InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                />
              </CardContent>
            </Card>
            : <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography component="legend">Health Check Rating</Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={0}
                  value={rating + 1}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={1}
                  max={4}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  onChange={({ target }) => setRating(Number((target as HTMLInputElement).value) - 1)}
                />
              </CardContent>
            </Card>}

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