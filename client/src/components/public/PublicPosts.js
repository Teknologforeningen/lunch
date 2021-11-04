import { useEffect, useState } from "react";
import RequestService from '../../scripts/RequestService';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import tfLogo from '../../assets/taffa_logo_white.png';
import i18n from '../../i18n';

const PublicPosts = () => {
    const { t, i18n } = useTranslation();
    const [Posts, setPosts] = useState([]);
    const [currLang, setCurrLang] = useState(i18n.language);
    const url = RequestService.getUrl();
    
    useEffect(() => {
        RequestService.getDataRequest("posts/" + currLang).then(postList => {
            setPosts(postList.reverse());
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    return (
        Posts.length !== 0?
            <div className="splitter-box">
            <h1>{t('posts')}</h1>
                {Posts.map(post => {
                return (
                    <Card key={post._id} className="">
                        <CardActionArea>
                            <CardMedia
                            className=""
                            component="img"
                            height="140"
                            style={{
                                backgroundColor: post.image !== undefined? 'white' : 'red',
                            }}
                            image={post.image !== undefined? url + 'posts/images/' + post._id : tfLogo}
                            title={post.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {post.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
            </div>
        : null
    )
}

export default PublicPosts;