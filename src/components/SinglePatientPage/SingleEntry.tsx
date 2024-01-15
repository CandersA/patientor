import { Entry } from "../../types";
import Diagnose from "./Diagnose";
import HospitalEntryType from "./entryTypes/HospitalEntryType";
import OccupationalHealthcareEntryType from "./entryTypes/OccupationalHealthcareEntryType";
import HealthCheckEntryType from "./entryTypes/HealthCheckEntryType";

interface props {
    entry: Entry;
}

const SingleEntry = ({entry}: props) => {

    let details: JSX.Element;

    switch (entry.type) {
        case "Hospital":
            details = <HospitalEntryType entry={entry} />;
            break;
        case "HealthCheck":
            details = <HealthCheckEntryType entry={entry} />;
            break;
        case "OccupationalHealthcare":
            details = <OccupationalHealthcareEntryType entry={entry} />;
            break;
    }

  return (
    <div style={{
        padding: "10px", 
        border: "1px solid black",
        borderRadius: "10px",
        marginBottom: "10px"
    }}>
        <span>{entry.date} </span>
        <span>{entry.description}</span>
            {
                entry.diagnosisCodes ?
                <ul>
                    {
                        entry.diagnosisCodes.map((code, index) => {


                            return (
                                <Diagnose code={code} key={index} />
                            );
                        })
                    }
                </ul>
                : null
            }
        {
            details
        }
        <p><em>{entry.specialist}</em></p>
    </div>
  );
};

export default SingleEntry;