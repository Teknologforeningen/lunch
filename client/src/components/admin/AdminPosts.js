import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import RequestService from '../../scripts/RequestService';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

const AdminPosts = () => {
    const { t, i18n } = useTranslation();
    const [Posts, setPosts] = useState([]);
    const [PostObj, setPostObj] = useState({});
    const [currLang, setCurrLang] = useState(i18n.language);
    const [DeleteId, setDeleteId] = useState("");

    const [OpenAdd, setOpenAdd] = useState(false);
    const [OpenDelete, setOpenDelete] = useState(false);
    
    useEffect(() => {
        RequestService.getDataRequest("posts/" + currLang).then(postList => {
            console.log(postList);
            const tmp = postList.reverse();
            setPosts(tmp);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    const refreshPosts = () => {
        RequestService.getDataRequest("posts/" + currLang).then(postList => {
            console.log(postList);
            const tmp = postList.reverse();
            setPosts(tmp);
        });
    }

    const handleAddClick = () => {
        const newPost = {
            title: "",
            content: "",
            language: currLang,
            visible: true,
            image: null
        }
        setPostObj(newPost);
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
    };

    const handleAddSave = () => {
        setOpenAdd(false);
        console.log(PostObj);
        const formData  = new FormData();
        formData.append("title", PostObj.title);
        formData.append("content", PostObj.content);
        formData.append("language", PostObj.language);
        formData.append("image", PostObj.image);
        RequestService.sendDataRequest("posts/" + currLang, formData)
        .then(() => {
            refreshPosts();
        });
    }

    const onTitleChange = (e) => {
        setPostObj({...PostObj,
            title: e.target.value
        });
    }

    const onContentChange = (e) => {
        setPostObj({...PostObj,
            content: e.target.value
        });
    }

    const handleImage = (e) => {
        setPostObj({...PostObj,
            image: e.target.files[0]
        });
    }

    const handleDeleteClick = (id) => {
        setOpenDelete(true);
        setDeleteId(id);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false);
    }

    const handleDelete = () => {
        setOpenDelete(false);
        console.log(DeleteId);
        RequestService.deleteRequest("posts", DeleteId)
        .then(() => {
            refreshPosts();
        })
    }

    return (
        <>
        <h1>{t('Posts') + ":"}</h1>
        {Posts.length > 0?
            <>
            <List dense={false}>
                {Posts.map(post => {
                    return (
                        <ListItem key={post._id}>
                            <ListItemText
                                primary={post.title}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(post._id)}>
                                    <i className="material-icons">delete</i>
                                </IconButton>
                                {/* <IconButton edge="end" aria-label="delete" onClick={() => handleVisibilityClick(post._id)}>
                                    <i className="material-icons">{post.visible? 'visibility' : 'visibility_off'}</i>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <i className="material-icons">edit</i>
                                </IconButton> */}
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
                
            </List>
            </>
        : null}
        <Button
            variant="contained"
            color={"primary"}
            onClick={() => handleAddClick()}
            >{t('Add')}</Button>

        {/* Add dialog */}
        <Dialog
            open={OpenAdd}
            aria-labelledby="form-dialog-title"
            maxWidth='sm'
            fullWidth={true}
        >
            <DialogTitle id="form-dialog-title">Add Post</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Title"
                fullWidth
                value={PostObj.title}
                onChange={(e) => onTitleChange(e)}
            />
            <TextField
                margin="dense"
                label="Content"
                fullWidth
                multiline
                rows={4}
                value={PostObj.content}
                onChange={(e) => onContentChange(e)}
            />
            <input
                className="file-upload"
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handleImage}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleAddClose()} color="primary">
                Cancel
            </Button>
            <Button onClick={() => handleAddSave()} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>

        {/* Delete dialog */}
        <Dialog
            open={OpenDelete}
            onClose={() => handleDeleteClose()}
            aria-labelledby="form-dialog-title"
            maxWidth='sm'
            fullWidth={true}
        >
            <DialogTitle id="form-dialog-title">Delete Post?</DialogTitle>
            <DialogActions>
            <Button onClick={() => handleDeleteClose()} color="secondary">
                Cancel
            </Button>
            <Button onClick={() => handleDelete()} color="primary">
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default AdminPosts;