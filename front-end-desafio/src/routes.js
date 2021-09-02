
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer'

import Home from './pages/Home';
import ListaEmpresas from './pages/ListaEmpresas';


const Routes = () => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lista" component={ListaEmpresas} />
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default Routes;