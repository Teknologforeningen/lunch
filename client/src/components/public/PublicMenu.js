import { useEffect, useState } from "react";
import RequestService from '../../scripts/RequestService';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';
import i18n from '../../i18n';
import './PublicApp.scss';

const PublicMenu = () => {
    const { t, i18n } = useTranslation();
    const [Menu, setMenu] = useState(null);
    const [MenuType, setMenuType] = useState("today/");
    const [currLang, setCurrLang] = useState(i18n.language);
    
    useEffect(() => {
        RequestService.getDataRequest("menu/" + MenuType + currLang).then(menuObj => {
            setMenu(menuObj);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language);
        })
    }, [currLang, MenuType, i18n]);

    const toggleMenu = (menuType) => {
        if (menuType !== MenuType) {
            setMenuType(menuType)
        }
    }

    return (
        <>
            <h1>{t('menu') + ":"}</h1>
            { MenuType === "today/" ?
                <pre>{Menu}</pre>
            :
            <div className="menu-week">
                {parse(Menu)}
            </div> 
            }
            <div className="menu-button-container">
                <Button
                    variant="contained"
                    color={MenuType === "today/"? "primary" : "default"}
                    onClick={() => toggleMenu("today/")}
                    >{t("today")}</Button>
                <Button
                    variant="contained"
                    color={MenuType === "week/"? "primary" : "default"}
                    onClick={() => toggleMenu("week/")}
                    >{t("week")}</Button>
            </div>
        </>
    )
}

export default PublicMenu;