import { Button, Typography } from "@mui/material";
import { Diagnosis, EntryFormValues, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { EntryDetails } from "../Entry";
import AddEntryModal from "../AddEntryModal";
import { useState } from "react";
import axios from "axios";
import patientService from '../../services/patients';

interface PatientProps {
  patient: Patient;
  diagnoses: Diagnosis[];
}
export const PatientDetailsPage = (props: PatientProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const newEntry = await patientService.addEntry(values, props.patient.id);
      // setPatients(patients.concat(patient));
      props.patient.entries.push(newEntry);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={props.diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        entries
      </Typography>
      {
        props.patient.entries.map(
          entry => <EntryDetails key={entry.id} entry={entry} />
        )
      }
    </div>
  );
};
