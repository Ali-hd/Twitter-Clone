import React, { Suspense, lazy } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { StoreProvider } from './store/store'
import 'dotenv/config'
import './App.scss'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Login from './components/Login'
import Signup from './components/Signup'
import Tweet from './components/Tweet'

const Home = lazy(() => import('./components/Home'))
const Profile = lazy(() => import('./components/Profile'))

const DefaultContainer = () => {
  return (<div className="body-wrap">
    <header className="header">
      <Nav />
    </header>
    <main className="main">
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/profile/:username" exact>
        <Profile />
      </Route>
      <Route path="/profile/:username/:id" exact>
        <Tweet />
      </Route>
    </main>
  </div>)
}

function App() {
  return (
    <div>
      <StoreProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <Signup />
              </Route>
              <Route component={DefaultContainer} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </StoreProvider>
    </div>
  )
}

export default App
