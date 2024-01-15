import { Entry } from "../../types";
import SingleEntry from "./SingleEntry";

interface props {
    entries: Entry[];
}

const HealthEntries = ({entries}: props) => {
    if (entries.length > 0) {
        return (
            <>
            <h3>Entries</h3>
            {
                entries.map(entry => {
                    return (
                        <SingleEntry entry={entry} key={entry.id}/>
                    );
                })
            }
            </>
        );
    }
};

export default HealthEntries;