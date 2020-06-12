import types from './typeActions'

export const applyMiddleware = dispatch => action => {
    switch (action.type){
        case types.LOGIN:
            // return axios.post(`${API_URL}/auth/login`, action.payload)
            // .then(res=>dispatch({
            //     type: types.LOGIN_SUCCESS,
            //     payload: res.data, rememberMe: action.payload.remember }))
            // .catch(err=>dispatch({
            //     type: types.ERROR,
            //     payload: err.response.data
            // }))
        default: dispatch(action)
    }
}