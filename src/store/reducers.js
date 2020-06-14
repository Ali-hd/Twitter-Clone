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
        case type.ERROR:
            // message.error(action.payload.msg? action.payload.msg : action.payload == 'Unauthorized' ? 'You need to sign in' : 'error');
            console.log(action.payload)
            return {...state, loading: false, error: true, msg: action.payload.msg}
        case type.LOGIN:
            localStorage.setItem("token", action.payload.token)
            console.log('login success')
            console.log(action.payload)
            return {...state, ...action.payload, loading: false, error: false}
        case type.REGISTER:
            alert('registreed')
            return {...state, ...action.payload, loading: false, error: false}
        default:
            return state
    }
  }

export { initialState, reducer }