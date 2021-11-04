import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import RequestService from '../../scripts/RequestService';

const PublicHours = () => {
    const { t, i18n } = useTranslation();
    const [Hours, setHours] = useState("");
    const [currLang, setCurrLang] = useState(i18n.language);
    
    useEffect(() => {
        RequestService.getDataRequest("hours/" + currLang).then(hourObj => {
            setHours(hourObj.hours);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });

    }, [i18n, currLang]);

    return (
        Hours !== ""?
            <div className="splitter-box">
                <h1>{t('OpenHours')}</h1>
                <pre>{Hours}</pre>           
            </div>
        : null 
    )
}

export default PublicHours;