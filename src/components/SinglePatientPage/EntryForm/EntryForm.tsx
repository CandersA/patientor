import { useState, SyntheticEvent } from "react";
import { EntryWithoutId } from "../../../types";
import patientService from "../../../services/patients";
import axios from "axios";
import { Patient, Diagnosis, Discharge, SickLeave } from "../../../types";
import {  TextField, Button, FormControl, Select, MenuItem, InputLabel, Input } from '@mui/material';

interface props {
    id: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const codes = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "L60.1",
    "Z74.3",
    "L20",
    "F43.2",
    "S62.5",
    "H35.29"
];

const EntryForm = ({ id, setPatient }: props) => {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [diagnosesCodes, setDiagnosesCodes] = useState<Array<Diagnosis['code']>>([]);
    const [type, setType] = useState("HealthCheck");
    const [employerName, setEmployerName] = useState('');
    const [discharge, setDischarge] = useState<Discharge>({
        date: '',
        criteria: ''
    });
    const [sickLeave, setSickLeave] = useState<SickLeave>({
        startDate: '',
        endDate: ''
    });

    const [error, setError] = useState('');

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            const patientWithNewEntry = await patientService.createEntry(values, id);
            setPatient(
                patientWithNewEntry
            );
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

    const addEntry = (event: SyntheticEvent) => {

        event.preventDefault();

        const baseEntry = {
            description,
            date,
            specialist,
            diagnosesCodes
        };

        if (type == "HealthCheck") {
            submitNewEntry({
                ...baseEntry,
                type,
                healthCheckRating,
            });
        } else if (type == "Hospital") {
            submitNewEntry({
                ...baseEntry,
                type,
                discharge
            });
        } else if (type == "OccupationalHealthcare") {
            submitNewEntry({
                ...baseEntry,
                type,
                employerName,
                sickLeave
            });
        }
    };

    return (
        <form onSubmit={addEntry}>
            <h4>New Patient Entry</h4>
            <p>{error}</p>

            <TextField
                label="Description"
                fullWidth 
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />

            <InputLabel id="date">Date</InputLabel>
            <Input
                id="date"
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />

            <TextField
                label="Specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />

            <FormControl fullWidth>
                <InputLabel id="code-select-label">Diagnoses Codes</InputLabel>
                <Select
                        labelId="code-select-label"
                        id="code-select"
                        value={diagnosesCodes}
                        multiple
                        onChange={({ target }) => setDiagnosesCodes(
                            typeof target.value === 'string' ? target.value.split(',') : target.value
                        )}
                >
                    {codes.map((code) => (
                        <MenuItem
                            key={code}
                            value={code}
                        >
                            {code}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>OccupationalHealthcare</MenuItem>
                </Select>
            </FormControl>

            {
                type == "HealthCheck" ?
                <>
                    <TextField
                        label="Health Check Rating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                    />
                </>
                : type == "Hospital" ?
                <>
                    <h4>Discharge</h4>

                    <InputLabel id="discharge-date">Discharge date</InputLabel>
                    <Input
                        id="discharge-date"
                        type="date"
                        fullWidth
                        value={discharge.date}
                        onChange={({ target }) => setDischarge({
                            ...discharge,
                            date: target.value
                        })}
                    />

                    <TextField
                        label="Criteria"
                        fullWidth
                        value={discharge.criteria}
                        onChange={({ target }) => setDischarge({
                            ...discharge,
                            criteria: target.value
                        })}
                    />
                </>
                : type == "OccupationalHealthcare" ?
                <>
                    <TextField
                        label="Employer Name"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />

                    <h4>Sick Leave</h4>

                    <InputLabel id="start-date">Start date</InputLabel>
                    <Input
                        id="start-date"
                        type="date"
                        fullWidth
                        value={sickLeave.startDate}
                        onChange={({ target }) => setSickLeave({
                            ...sickLeave,
                            startDate: target.value
                        })}
                    />

                    <InputLabel id="end-date">End date</InputLabel>
                    <Input
                        id="end-date"
                        type="date"
                        value={sickLeave.endDate}
                        onChange={({ target }) => setSickLeave({
                            ...sickLeave,
                            endDate: target.value
                        })}
                    />
                </>
                : null
            }

            <Button
                style={{
                    float: "right",
                }}
                type="submit"
                variant="contained"
            >
                Add
            </Button>
        </form>
    );
};

export default EntryForm;