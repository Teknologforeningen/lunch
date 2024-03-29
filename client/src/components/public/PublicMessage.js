import { useEffect, useState } from "react";
import RequestService from '../../scripts/RequestService';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const PublicMessage = () => {
    const { t, i18n } = useTranslation();
    const [Message, setMessage] = useState("");
    const [currLang, setCurrLang] = useState(i18n.language);
    
    useEffect(() => {
        RequestService.getDataRequest("messages/" + currLang).then(msgObj => {
            setMessage(msgObj.message);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    return (
        Message !== ""?
            <div className="splitter-box">
                {Message}
            </div>
        : null 
    )
}

export default PublicMessage;