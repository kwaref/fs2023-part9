import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HospitalEntryProps {
    entry: HospitalEntry;
}

const entryStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
};

const HospitalEntryView = (props: HospitalEntryProps) => {

    return <div style={entryStyle}>
        <p>{props.entry.date} <MedicalServicesIcon /></p>
        <p><em>{props.entry.description}</em></p>
        <p>{props.entry.discharge.criteria}</p>
    </div>;
};

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryView = (props: OccupationalHealthcareEntryProps) => {
    return <div style={entryStyle}>
        <p>{props.entry.date} <WorkIcon /> {props.entry.employerName}</p>
        <p><em>{props.entry.description}</em></p>
        <p>diagnosed by: {props.entry.specialist}</p>
    </div>;
};

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
}

const HealthCheckEntryView = (props: HealthCheckEntryProps) => {
    return <div style={entryStyle}>
        <p>{props.entry.date} <MedicalServicesIcon /></p>
        <p><em>{props.entry.description}</em></p>
        <p>{props.entry.healthCheckRating === 0
            ? <FavoriteIcon color="success" />
            : props.entry.healthCheckRating === 1
                ? <FavoriteIcon color="info" />
                : props.entry.healthCheckRating === 2
                    ? <FavoriteIcon color="warning" />
                    : <FavoriteIcon color="error" />}</p>
        <p>diagnosed by: {props.entry.specialist}</p>
    </div>;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const EntryDetails: React.FC<{ entry: Entry; }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryView entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryView entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryView entry={entry} />;
        default:
            return assertNever(entry);
    }
};