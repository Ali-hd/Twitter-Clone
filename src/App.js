import React, { Suspense, lazy} from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import {StoreProvider} from './store/store'
import 'dotenv/config'

// const Home = lazy(()=> import('./components/Home'))
// const Login = lazy(()=> import('./components/Login'))


function App(){
  return (
    <div>
    <StoreProvider>
    <BrowserRouter>
        {/* <Suspense fallback={<Loader />}> */}
        {/* <NavBar/> */}
        <Switch>
            {/* <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route> */}
            
            {/* <Route path="/messages/:id" exact>
              <Chat />
            </Route> */}
        </Switch>
        {/* </Suspense> */}
    </BrowserRouter>
    </StoreProvider>
    </div>
  )
}

export default App
