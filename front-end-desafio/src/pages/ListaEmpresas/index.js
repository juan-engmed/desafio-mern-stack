import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './lista.css';
import api_db from '../../services/api_mongo'

//Variáveis Material UI
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    paper: {

        textAlign: 'center',
    },
    table: {
        minWidth: 450,
    },
});



export default function Lista() {
    const classes = useStyles();

    const [companies, setCompanies] = useState([]);

    //Hook para renderizar a tabela
    useEffect(() => {
        async function loadCompanies() {
            const response = await api_db.get('api/companies');
            setCompanies(response.data);
        }
        loadCompanies()
    }, [])


    return (
        <div className='containerTable'>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className='cel'>CNPJ</TableCell>
                            <TableCell align="center">Nome Fantasia</TableCell>
                            <TableCell align="center">Razão Social</TableCell>
                            <TableCell align="center">Atividade Primária</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.company_cnpj}
                                </TableCell>
                                <TableCell align="center">{row.company_name}</TableCell>
                                <TableCell align="center">{row.company_corporateName}</TableCell>
                                <TableCell align="center">{row.company_mainActivity}</TableCell>
                                <TableCell align="center">{row.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}