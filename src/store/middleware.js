import types from './typeActions'
import axios from 'axios'
import {API_URL} from '../config'

export const applyMiddleware = dispatch => action => {
    switch (action.type){
        case types.LOGIN:
            return axios.post(`${API_URL}/auth/login`, action.payload)
            .then(res=>dispatch({
                type: types.LOGIN,
                payload: res.data, rememberMe: action.payload.remember }))
            .catch(err=>dispatch({
                type: types.ERROR,
                payload: err.response.data
            }))
        case types.REGISTER:
            return axios.post(`${API_URL}/auth/register`, action.payload)
            .then(res=>dispatch({
                type: types.REGISTER,
                payload: res.data }))
            .catch(err=>dispatch({
                type: types.ERROR,
                payload: err.response.data
            }))
        default: dispatch(action)
    }
}