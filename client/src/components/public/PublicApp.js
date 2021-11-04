import PublicNavbar from './PublicNavbar';
import PublicMessage from './PublicMessage';
import PublicAnnouncement from './PublicAnnouncement';
import PublicHours from './PublicHours';
import PublicMenu from './PublicMenu';
import PublicPosts from './PublicPosts';
import PublicPrices from './PublicPrices';
import PublicFooter from './PublicFooter';
import './PublicApp.scss';

const PublicApp = () => {
    return (
        <div id="app">
            <PublicNavbar />
            <div className="public-container">
                <div className="public-content">
                    < PublicMessage/>
                    < PublicAnnouncement/>
                    <div className="splitter-box">
                        < PublicHours/>
                    </div>
                    <div className="splitter-box">
                        < PublicMenu/>
                    </div>
                    <div className="splitter-box">
                        < PublicPosts/>
                    </div>
                    <div className="splitter-box">
                        < PublicPrices/>
                    </div>
                </div>
            < PublicFooter/>
            </div>
        </div>
    );
}

export default PublicApp;