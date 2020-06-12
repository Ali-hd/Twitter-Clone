import type from './typeActions'

const initialState = {
    session: false,
    user: {
        _id: ""
    },
    account: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_STATE:
            return {...state, ...action.payload }
        default:
            return state
    }
  }

export { initialState, reducer }