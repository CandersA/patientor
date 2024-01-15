import { HospitalEntry } from "../../../types";

interface props {
    entry: HospitalEntry;
}

const HospitalEntryType = ({entry}: props) => {
  return (
    <div>
        <h4>Discharge:</h4>
        <p>{`Date: ${entry.discharge.date}`}</p>
        <p>{`Criteria: ${entry.discharge.criteria}`}</p>
    </div>
  );
};

export default HospitalEntryType;