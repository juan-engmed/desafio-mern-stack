import './footer.css';
import Typography from '@material-ui/core/Typography';
import githubLogo from '../../assets/githubLogo.png'
import linkedinLogo from '../../assets/linkedinLogo.png'

export default function Footer() {
    return (
        <footer>
            <Typography color="textSecondary" variant="subtitle1">Desenvolvido por Juan Oliveira</Typography>
            <div className='footerLogos'>
                <a href="https://github.com/juan-engmed" target='_blank'><img src={githubLogo} className='imgLogo' /></a>
                <a href="https://br.linkedin.com/in/juanengmed" target='_blank'><img src={linkedinLogo} className='imgLogo' /></a>
            </div>
        </footer>
    )
}