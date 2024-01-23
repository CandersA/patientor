import { useState, SyntheticEvent } from "react";
import { EntryWithoutId } from "../../../types";
import patientService from "../../../services/patients";
import axios from "axios";
import { Patient, Diagnosis, Discharge, SickLeave } from "../../../types";
import {  TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

interface props {
    id: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const EntryForm = ({ id, setPatient }: props) => {

    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [diagnosesCodesString, setDiagnosesCodesString] = useState('');
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

    const convertCodesToArray = (diagnosesCodes: string): Array<Diagnosis['code']> | undefined => {
        if (diagnosesCodes !== '') {
            return diagnosesCodes.split(", ");
        }

        return;
    };

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

        const diagnosesCodes = convertCodesToArray(diagnosesCodesString);

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
            <h4>New HealthCheck Form</h4>
            <p>{error}</p>

            <TextField
                label="Description"
                fullWidth 
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
                label="Date"
                placeholder="YYYY-MM-DD"
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
            <TextField
                label="Diagnoses Codes"
                fullWidth
                value={diagnosesCodesString}
                onChange={({ target }) => setDiagnosesCodesString(target.value)}
            />

            <FormControl fullWidth>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="Type"
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>OccupationalHealthcare</MenuItem>
                </Select>
            </FormControl>

            {
                type == "HealthCheck" ?
                <TextField
                    label="Health Check Rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                />
                : type == "Hospital" ?
                <>
                    <h4>Discharge</h4>
                    <TextField
                        label="Date"
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
                    <TextField
                        label="Start Date"
                        fullWidth
                        value={sickLeave.startDate}
                        onChange={({ target }) => setSickLeave({
                            ...sickLeave,
                            startDate: target.value
                        })}
                    />
                    <TextField
                        label="End Date"
                        fullWidth
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