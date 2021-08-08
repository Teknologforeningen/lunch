import { useState } from "react";
import AdminLogin from './AdminLogin';
import AdminLanguageSelector from './AdminLanguageSelector';
import AdminMessage from './AdminMessage';
import AdminOpeningHours from './AdminOpeningHours';
import AdminPosts from './AdminPosts';
import AdminPrices from './AdminPrices';
import RequestService from '../../scripts/RequestService';

import './AdminApp.scss';

const AdminApp = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const handleLogin = (username, password) => {
        console.log("Loging in with: " + username, password);
        RequestService.login(username, password).then(loginStatus => {
            setLoggedIn(loginStatus);
        })
    }

    return (
        isLoggedIn?
        <div className="admin-container">
            <div className="admin-content">
                <h1>Admin</h1>
                < AdminLanguageSelector/>
                < AdminMessage/>
                < AdminOpeningHours/>
                < AdminPosts/>
                < AdminPrices/>
            </div>
        </div>
        :
        < AdminLogin loginIn={handleLogin}/>
    );
}

export default AdminApp;