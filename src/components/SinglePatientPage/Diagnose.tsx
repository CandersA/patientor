import { useState, useEffect } from "react";
import diagnoseService from '../../services/diagnoses';

interface props {
    code: string;
}

const Diagnose = ({code}: props) => {

    const [diagnoseDescription, setDiagnoseDescription] = useState<string | undefined>('');

    useEffect(() => {

        const fetchDiagnoseDescription = async () => {
            const diagnose = await diagnoseService.getOne(code);
            if (diagnose) {
                setDiagnoseDescription(diagnose.name);
            }
        };
        void fetchDiagnoseDescription();
    }, [code]);

    return (
        <li>
            <span>{code} </span>
            <span>{diagnoseDescription}</span>
        </li>
    );
};

export default Diagnose;