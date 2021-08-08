import tfLogo from '../../assets/taffa_logo_white.png';
import PublicLanguageDropdown from './PublicLanguageDropdown';
import './PublicApp.scss';

const PublicNavbar = () => {
    return (
        <div id="nav">
            <div className="nav-flex">
                <div className="nav-logo-container">
                    <img className="nav-logo" src={tfLogo} alt=""/>
                </div>
                
            </div>
            <div className="language-dropdown">
                < PublicLanguageDropdown/>
            </div>
        </div>
    )
}

export default PublicNavbar;