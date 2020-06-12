import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './reducers'
import { useActions } from './actions'
import { applyMiddleware } from './middleware'


const StoreContext = createContext()
const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const actions = useActions(state, applyMiddleware(dispatch))
    return (
        <StoreContext.Provider value={{state, actions}}>
            {children}
        </StoreContext.Provider>
    )
}

export { StoreContext, StoreProvider}