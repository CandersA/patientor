import { HealthCheckEntry } from "../../../types";

interface props {
    entry: HealthCheckEntry;
}

const HealthCheckEntryType = ({entry}: props) => {
  return (
    <div>
        <h4>{`Health check rating: ${entry.healthCheckRating}`}</h4>
    </div>
  );
};

export default HealthCheckEntryType;