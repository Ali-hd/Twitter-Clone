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
import Bookmarks from './components/Bookmarks'
import Lists from './components/Lists'
import ListPage from './components/ListPage'
import Explore from './components/Explore'
import Feed from './components/Feed'
import Notifications from './components/Notifications'
import Messages from './components/Messages'

const Home = lazy(() => import('./components/Home'))
const Profile = lazy(() => import('./components/Profile'))

const DefaultContainer = () => {
  return (<div className="body-wrap">
    <header className="header">
      <Nav />
    </header>
    <main className="main">
      <div className="middle-section">
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/profile/:username" exact>
          <Profile />
        </Route>
        <Route path="/tweet/:username/:id" exact>
          <Tweet />
        </Route>
        <Route path="/bookmarks" exact>
          <Bookmarks />
        </Route>
        <Route path="/lists" exact>
          <Lists />
        </Route>
        <Route path="/lists/:id" exact>
          <ListPage />
        </Route>
        <Route path="/explore" exact>
          <Explore/>
        </Route>
        <Route path="/notifications" exact>
          <Notifications/>
        </Route>
        <Route path="/messages" exact>
          <Messages/>
        </Route>
      </div>
      <div className="right-section">
        <Feed/>
      </div>
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
