import { Typography } from "@mui/material";
import { Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientProps {
  patient: Patient;
}
export const PatientDetailsPage = (props: PatientProps) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        {props.patient.name}
        {props.patient.gender === 'male'
          ? <MaleIcon />
          : props.patient.gender === 'female'
            ? <FemaleIcon />
            : <TransgenderIcon />
        }
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
        SSN: {props.patient.ssn}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
        Occupation: {props.patient.occupation}
      </Typography>
    </div>
  );
};
