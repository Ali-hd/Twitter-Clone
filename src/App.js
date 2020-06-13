import React, { Suspense, lazy} from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {StoreProvider} from './store/store'
import 'dotenv/config'
import './App.scss'
import Loader from './components/Loader'
import Nav from './components/Nav'

const Home = lazy(()=> import('./components/Home'))
const Profile = lazy(()=> import('./components/Profile'))


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
              <Route path="/profile" exact>
                <Profile />
              </Route>
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
