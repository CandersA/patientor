import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import HealthEntries from "./HealthEntries";

const SinglePatientPage = () => {

  const [patient, setPatient] = useState<Patient>();

  const {id} = useParams();

  useEffect(() => {
    const fetchPatientList = async () => {
      const patient = await patientService.getOne(id || "no-id");
      setPatient(patient);
    };

    void fetchPatientList();

  }, [id]);

  if (patient) {
    return (
      <>
        <div>
          <h2>{patient.name}</h2>
          <p>{patient.gender}</p>
          <p>{`ssn: ${patient.ssn}`}</p>
          <p>{`occupation: ${patient.occupation}`}</p>
        </div>
        <HealthEntries entries={patient.entries} />
      </>
    );
  } else {
    return (
      <div>
        <p>This patient isn't available at the moment</p>
      </div>
    );
  }
};

export default SinglePatientPage;