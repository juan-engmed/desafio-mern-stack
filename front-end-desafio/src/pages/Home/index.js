import React, { useState, useEffect } from 'react';
import './style.css';
import logoCnpj from '../../assets/logoCnpj.png'
import axios from 'axios';
import api_db from '../../services/api_mongo'
import InputMask from "react-input-mask";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

//Variáveis Material UI
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Home() {

    const classes = useStyles();

    //Hooks para Informações Gerais - Empresa - API ReceitaWS
    const [cnpjOrigin, setCnpjOrigin] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [atividade, setAtividade] = useState('');

    //Hooks para Endereço - Empresa - API ReceitaWS
    const [logradouro, setLogradouro] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');

    //Hook para input - Tela Cadastro
    const [cnpj, setCpnj] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    //Hook para Loading
    const [loading, setLoading] = useState(false);



    function searchCnpj() {
        if (!cnpj == '') {
            

            axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj.replace(/\D+/g, '')}`)
                .then(res => {
                    if (res.data.status === 'ERROR') {
                        alert('CNPJ Inválido')
                    } else {
                        setCnpjOrigin(res.data.cnpj);
                        setNomeFantasia(res.data.fantasia);
                        setRazaoSocial(res.data.nome);
                        setAtividade(res.data.atividade_principal[0].text);
                        setLogradouro(res.data.logradouro);
                        setMunicipio(res.data.municipio);
                        setNumero(res.data.numero);
                        setCep(res.data.cep);
                        setIsSearch(true);
                    }
                })
        } else {
            alert('Digite o CNPJ')
        }setLoading(false)
    }

    function loadSave(){
        setLoading(true);
        setTimeout(
            () => searchCnpj(),1000
        )
    }

    async function saveCnpj() {
        const data = {
            company_cnpj: cnpjOrigin,
            company_name: nomeFantasia,
            company_corporateName: razaoSocial,
            company_mainActivity: atividade
        }
        try {
            const res = await api_db.post('/api/companies', data);

            alert('Cadastrado com sucesso!');
        } catch (error) {
            alert(`Empresa já esta cadastrada na Base de Dados`);
        }
    }

    return (
        <div className='container'>
            <main>
                <Typography color="textSecondary" variant="h4">Busca CNPJ</Typography>
                <InputMask mask="99.999.999/9999-99" value={cnpj} onChange={e => setCpnj(e.target.value)} className='inputC' />
                <Button type="button" onClick={loadSave} variant="contained" m={0.5} disabled={loading}>
                    {loading ? <CircularProgress />: 'Buscar'}</Button>
            </main>

            {(isSearch && (
                <div>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h6" component="h3" color="textSecondary">
                                Nome Fantasia
                            </Typography>
                            <Typography variant="h6" component="p">
                                {nomeFantasia}
                            </Typography>
                            <Typography variant="h6" component="h3" color="textSecondary">
                                Razão Social
                            </Typography>
                            <Typography variant="h6" component="p">
                                {razaoSocial}
                            </Typography>
                            <Typography variant="h6" component="h3" color="textSecondary">
                                Atividade Primária
                            </Typography>
                            <Typography variant="h6" component="p">
                                {atividade}
                            </Typography>
                            <Typography variant="h6" component="h3" color="textSecondary">
                                Endereço
                            </Typography>
                            <Typography variant="h6" component="p">
                                Logradouro: {logradouro} / nº: {numero} / CEP: {cep} / Cidade: {municipio}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={saveCnpj} color="primary">SALVAR</Button>
                        </CardActions>
                    </Card>
                </div>))}
        </div>
    );
}

export default Home;