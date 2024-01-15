import { Entry } from "../../types";
import Diagnose from "./Diagnose";

interface props {
    entry: Entry;
}

const SingleEntry = ({entry}: props) => {
  return (
    <div>
        <span>{entry.date} </span>
        <span>{entry.description}</span>
        <ul>
            {
                entry.diagnosisCodes ?
                    entry.diagnosisCodes.map((code, index) => {


                        return (
                            <Diagnose code={code} key={index} />
                        );
                    })
                : null
            }
        </ul>
    </div>
  );
};

export default SingleEntry;