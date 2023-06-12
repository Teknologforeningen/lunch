import { useState, useEffect } from "react";
import AdminLogin from './AdminLogin';
import AdminLogout from './AdminLogout';
import AdminLanguageSelector from './AdminLanguageSelector';
import AdminMessage from './AdminMessage';
import AdminOpeningHours from './AdminOpeningHours';
import AdminPosts from './AdminPosts';
import AdminPrices from './AdminPrices';
import AdminAnnouncements from './AdminAnnouncement';
import RequestService from '../../scripts/RequestService';

import './AdminApp.scss';

const AdminApp = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('lunchUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          RequestService.setToken(user.token);
          setLoggedIn(true);
        }
        }, [setLoggedIn])

    const handleLogin = (username, password) => {
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
                < AdminAnnouncements />
                < AdminOpeningHours/>
                < AdminPosts/>
                < AdminPrices/>
                < AdminLogout/>
            </div>
        </div>
        :
        < AdminLogin loginIn={handleLogin}/>
    );
}

export default AdminApp;