import { useState, useEffect } from 'react';
import { useHistory  } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import RequestService from '../../scripts/RequestService';

const AdminLogout = () => {
    const { t, i18n } = useTranslation();
    const [currLang, setCurrLang] = useState(i18n.language);
    const history = useHistory ();

    useEffect(() => {
        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language);
        });
    }, [i18n, currLang]);


    const handleLogout = () => {
        window.localStorage.clear();
        RequestService.setToken(null);
        history.push('/');
    }

    return (
        <div>
        <Button
            variant="contained"
            color={"primary"}
            onClick={() => handleLogout()}
            style={{ marginTop: '1rem' }}
            >{t('logout')}</Button>
        </div>
    )
}

export default AdminLogout;