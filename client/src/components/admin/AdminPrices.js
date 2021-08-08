import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import RequestService from '../../scripts/RequestService';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

const AdminPrices = () => {
    const { t, i18n } = useTranslation();
    const [Prices, setPrices] = useState([]);
    const [PricesObj, setPricesObj] = useState({});
    const [currLang, setCurrLang] = useState(i18n.language);
    const [DeleteId, setDeleteId] = useState("");

    const [OpenAdd, setOpenAdd] = useState(false);
    const [OpenDelete, setOpenDelete] = useState(false);
    
    useEffect(() => {
        RequestService.getDataRequest("prices/" + currLang).then(priceList => {
            console.log(priceList);
            setPrices(priceList);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    const refreshPrices = () => {
        RequestService.getDataRequest("prices/" + currLang).then(priceList => {
            console.log(priceList);
            setPrices(priceList);
        });
    }

    const handleAddClick = () => {
        const newPrice = {
            description: "",
            priceStudent: null,
            priceNormal: null,
            language: currLang
        }
        setPricesObj(newPrice);
        setOpenAdd(true);
    };

    const handleAddClose = () => {
        setOpenAdd(false);
    };

    const handleAddSave = () => {
        setOpenAdd(false);
        console.log(PricesObj);
        RequestService.sendRequest("prices/", PricesObj)
        .then(() => {
            refreshPrices();
        });
    }

    const onDescriptionChange = (e) => {
        setPricesObj({...PricesObj,
            description: e.target.value
        });
    }

    const onStudentPriceChange = (e) => {
        setPricesObj({...PricesObj,
            priceStudent: e.target.value
        });
    }

    const onNormalPriceChange = (e) => {
        setPricesObj({...PricesObj,
            priceNormal: e.target.value
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
        RequestService.deleteRequest("prices", DeleteId)
        .then(() => {
            refreshPrices();
        })
    }

    return (
        <>
        <h1>{'Prices' + ":"}</h1>
        {Prices.length > 0?
            <>
            <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>{t('description')}</TableCell>
                    <TableCell align="left">{t('studentprice')}&nbsp;(€)</TableCell>
                    <TableCell align="left">{t('normalprice')}&nbsp;(€)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {Prices.map((price) => (
                    <TableRow key={price._id}>
                    <TableCell component="th" scope="row">
                        {price.description}
                    </TableCell>
                    <TableCell align="left">{price.priceStudent}</TableCell>
                    <TableCell align="left">{price.priceNormal}</TableCell>
                    <TableCell align="right">
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(price._id)}>
                            <i className="material-icons">delete</i>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </>
        : null}
        <Button
            className="table-add-button"
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
            <DialogTitle id="form-dialog-title">Add Price</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Description"
                fullWidth
                value={PricesObj.description}
                onChange={(e) => onDescriptionChange(e)}
            />
            <TextField
                margin="dense"
                label="Student Price"
                fullWidth
                type="number"
                value={PricesObj.priceStudent}
                onChange={(e) => onStudentPriceChange(e)}
            />
            <TextField
                margin="dense"
                label="Normal Price"
                fullWidth
                type="number"
                value={PricesObj.priceNormal}
                onChange={(e) => onNormalPriceChange(e)}
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
            <DialogTitle id="form-dialog-title">Delete Price?</DialogTitle>
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

export default AdminPrices;