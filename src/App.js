import React, { Suspense, lazy} from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {StoreProvider} from './store/store'
import 'dotenv/config'
import './App.scss'
import Loader from './components/Loader'
import Nav from './components/Nav'

const Home = lazy(()=> import('./components/Home'))
// const Login = lazy(()=> import('./components/Login'))


function App(){
  return (
    <div>
    <StoreProvider>
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
        <div className="body-wrap">
          <header className="header">
            <Nav/>
          </header>
          <main className="main">
          <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
              {/* <Route path="/messages/:id" exact>
                <Chat />
              </Route> */}
          </Switch>
          </main>
        </div>
        </Suspense>
    </BrowserRouter>
    </StoreProvider>
    </div>
  )
}

export default App
