import { useTranslation } from 'react-i18next';
import './PublicApp.scss';

const PublicFooter = () => {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className="footer-content">
                {t('ContactUs')}: lunch@tf.fi
            </div>
        </div>
    )
}

export default PublicFooter;