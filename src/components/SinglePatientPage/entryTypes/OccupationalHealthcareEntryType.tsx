import { OccupationalHealthcareEntry } from "../../../types";

interface props {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryType = ({entry}: props) => {
  return (
    <>
        <h4>{`Employer name: ${entry.employerName}`}</h4>
        <div>
            {
                entry.sickLeave ?
                <>
                    <h4>Sickleave:</h4>
                    <p>{`Start date: ${entry.sickLeave.startDate}`}</p>
                    <p>{`End date: ${entry.sickLeave.endDate}`}</p>
                </>
                : null      
            }
        </div>
    </>
  );
};

export default OccupationalHealthcareEntryType;