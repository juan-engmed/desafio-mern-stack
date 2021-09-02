import './header.css';
import { Link } from 'react-router-dom';
import logoCnpj from '../../assets/logoCnpj.png'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


export default function Header() {
  return (
    <header className='links'><Link to="/"><img src={logoCnpj} className='img' /></Link>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" className="links">
          <Typography color="textSecondary" variant="h6">Busca</Typography>
        </Link>
        <Link to="/lista" className="links">
          <Typography color="textSecondary" variant="h6">Empresas Cadastradas</Typography>
        </Link>
      </Breadcrumbs>
    </header>
  )
}