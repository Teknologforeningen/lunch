import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import RequestService from '../../scripts/RequestService';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AdminMessages = () => {
    const { t, i18n } = useTranslation();
    const [MsgObj, setMsgObj] = useState({});
    const [Message, setMessage] = useState("");
    const [MessageEdit, setMessageEdit] = useState("");
    const [currLang, setCurrLang] = useState(i18n.language);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        RequestService.getDataRequest("messages/" + currLang).then(msgObj => {
            console.log(msgObj);
            setMessage(msgObj.message);
            setMessageEdit(msgObj.message);
            setMsgObj(msgObj);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    const onMessageChange = (e) => {
        setMessageEdit(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        const tmpObj = MsgObj;
        tmpObj.message = MessageEdit;
        console.log(tmpObj);
        RequestService.sendRequest("messages/" + currLang, tmpObj).then(() => {
            console.log("Message saved");
        })
        setMessage(MessageEdit);
    }

    return (
        <>
        <h1>{"Announcements" + ":"}</h1>
        {Message !== ""?
            <>
            <h3>{Message}</h3>
            </>
        : null}
        <Button
            variant="contained"
            color={"primary"}
            onClick={() => handleClickOpen()}
            >{t('edit')}</Button>
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth='sm'
            fullWidth={true}
        >
            <DialogTitle id="form-dialog-title">Edit Announcements</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                fullWidth
                multiline
                rows={4}
                value={MessageEdit}
                onChange={(e) => onMessageChange(e)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
                Cancel
            </Button>
            <Button onClick={() => handleSave()} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default AdminMessages;