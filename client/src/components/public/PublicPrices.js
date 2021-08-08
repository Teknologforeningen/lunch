import { useEffect, useState } from "react";
import RequestService from '../../scripts/RequestService';
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import i18n from '../../i18n';

const PublicPrices = () => {
    const { t, i18n } = useTranslation();
    const [Prices, setPrices] = useState([]);
    const [currLang, setCurrLang] = useState(i18n.language);
    
    useEffect(() => {
        RequestService.getDataRequest("prices/" + currLang).then(priceList => {
            console.log(priceList);
            setPrices(priceList);
        });

        i18n.on('languageChanged', () => {
            setCurrLang(i18n.language)
        });
    }, [i18n, currLang]);

    return (
        Prices.length !== 0?
            <>
            <h1>{t('prices') + ":"}</h1>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </>
        : null 
    )
}

export default PublicPrices;