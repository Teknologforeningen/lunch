import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

const AdminLanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const [currLang, setCurrLang] = useState(i18n.language);

    const toggleLang = (lang) => {
        i18n.changeLanguage(lang);
        setCurrLang(lang);
    }

    return (
        <div className="menu-button-container">
            <Button
                variant="contained"
                color={currLang === "eng"? "primary" : "default"}
                onClick={() => toggleLang("eng")}
                >ENG</Button>
            <Button
                variant="contained"
                color={currLang === "swe"? "primary" : "default"}
                onClick={() => toggleLang("swe")}
                >SWE</Button>
            <Button
                variant="contained"
                color={currLang === "fin"? "primary" : "default"}
                onClick={() => toggleLang("fin")}
                >FIN</Button>
        </div>
    )
}

export default AdminLanguageSelector;