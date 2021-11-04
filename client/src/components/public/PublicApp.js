import PublicNavbar from './PublicNavbar';
import PublicMessage from './PublicMessage';
import PublicAnnouncement from './PublicAnnouncement';
import PublicHours from './PublicHours';
import PublicMenu from './PublicMenu';
import PublicPosts from './PublicPosts';
import PublicPrices from './PublicPrices';
import PublicFooter from './PublicFooter';
import {Helmet} from "react-helmet";
import './PublicApp.scss';

const PublicApp = () => {
    return (
        <div id="app">
            <PublicNavbar />
            <div className="public-container">
                <div className="public-content">
                    < PublicMessage/>
                    < PublicAnnouncement/>
                    < PublicHours/>
                    < PublicMenu/>
                    < PublicPosts/>
                    < PublicPrices/>
                    {/* <div className="ig-container">
                        <div className="taggbox-container">
                            <div className="taggbox-socialwall" data-wall-id="76051" view-url="https://widget.taggbox.com/76051">
                            </div>
                            <Helmet>
                            <script src="https://widget.taggbox.com/embed.min.js" type="text/javascript"></script>
                            </Helmet>
                        </div>
                    </div> */}
                    
                </div>
            < PublicFooter/>
            </div>
        </div>
    );
}

export default PublicApp;