import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import Details from "./pages/details/Details"

import Createmd from "./components/create/Createmd"
import Authorize from "./authorize/Authorize"
import ReactGA from 'react-ga4'
const App = () => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Regsiter} />
          <Route exact path='/details/:id' component={Details} />
          <Route exact path='/account' component={Account} />
         
          <Authorize>
          <Route exact path='/create' component={Create} />
          </Authorize>
         
       
        <Route exact path='/createmde' component={Createmd} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}
export default App
