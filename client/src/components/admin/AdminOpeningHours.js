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

const AdminOpeningHours = () => {
    const { t, i18n } = useTranslation();
    const [HourObj, setHourObj] = useState({});
    const [Hours, setHours] = useState("");
    const [HoursEdit, setHoursEdit] = useState("");
    const [currLang, setCurrLang] = useState(i18n.language);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        RequestService.getDataRequest("hours/" + currLang).then(hourObj => {
            console.log(hourObj);
            setHours(hourObj.hours);
            setHoursEdit(hourObj.hours);
            setHourObj(hourObj);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    const onMessageChange = (e) => {
        setHoursEdit(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        const tmpObj = HourObj;
        tmpObj.hours = HoursEdit;
        console.log(tmpObj);
        RequestService.sendRequest("hours/" + currLang, tmpObj).then(() => {
            console.log("Hours saved");
        })
        setHours(HoursEdit);
    }

    return (
        <>
        <h1>{t('Opening Hours') + ":"}</h1>
        {Hours !== ""?
            <>
            <pre>{Hours}</pre>
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
            <DialogTitle id="form-dialog-title">Edit Hours</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                fullWidth
                multiline
                rows={4}
                value={HoursEdit}
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

export default AdminOpeningHours;