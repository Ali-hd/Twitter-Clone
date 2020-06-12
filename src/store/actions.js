import types from './typeActions'
import jwt from 'jsonwebtoken'

export const useActions = (state, dispatch) => ({
    loginUser: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.LOGIN, payload: data})
    },
    // logout: data => {
    //     localStorage.removeItem("token")
    //     sessionStorage.removeItem("token")
    //     window.location.reload()
    // },
    // verifyToken: data => {
    //     jwt.verify(localStorage.getItem('token') || sessionStorage.getItem('token'), process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
    //         if (err) { dispatch({type: types.SET_STATE, payload: {session: false, decoded: decoded }})  }
    //         else {  
    //             if(data == 'get account'){ dispatch({type: types.GET_ACCOUNT}) }
    //             console.log('verifying token')
    //             dispatch({type: types.SET_STATE, payload: {session: true, decoded: decoded}})  }
    //     });
    // }
})
