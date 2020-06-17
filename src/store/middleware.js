import types from './typeActions'
import axios from 'axios'
import {API_URL} from '../config'

export const token = () => {
    if(localStorage.getItem('Twittertoken')){
        return localStorage.getItem('Twittertoken')
    } 
    return null
}

export const applyMiddleware = dispatch => action => {
    let headers = { headers: { Authorization: `Bearer ${token()}` } }
    switch (action.type){
        case types.LOGIN:
            return axios.post(`${API_URL}/auth/login`, action.payload)
            .then(res=>dispatch({ type: types.LOGIN, payload: res.data, rememberMe: action.payload.remember }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.REGISTER:
            return axios.post(`${API_URL}/auth/register`, action.payload)
            .then(res=>dispatch({ type: types.REGISTER, payload: res.data })) 
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.TWEET:
            return axios.post(`${API_URL}/tweet/create`, action.payload, headers)
            .then(res=>dispatch({ type: types.TWEET, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.LIKE_TWEET:
            return axios.post(`${API_URL}/tweet/${action.payload.id}/like`, action.payload, headers)
            .then(res=>dispatch({ type: types.LIKE_TWEET, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_TWEETS:
            return axios.get(`${API_URL}/tweet`, action.payload)
            .then(res=>dispatch({ type: types.GET_TWEETS, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
            
        case types.GET_TWEET:
            return axios.get(`${API_URL}/tweet/${action.payload}`, action.payload)
            .then(res=>dispatch({ type: types.GET_TWEET, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
            
        case types.GET_ACCOUNT:
            return axios.get(`${API_URL}/auth/user`, headers)
            .then(res=>dispatch({ type: types.GET_ACCOUNT, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
        case types.BOOKMARK:
            return axios.post(`${API_URL}/tweet/${action.payload.id}/bookmark`, action.payload, headers)
            .then(res=>dispatch({ type: types.BOOKMARK, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
        case types.GET_USER:
            return axios.get(`${API_URL}/user/${action.payload}/tweets`, headers)
            .then(res=>dispatch({ type: types.GET_USER, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_BOOKMARKS:
            return axios.get(`${API_URL}/user/i/bookmarks`, headers)
            .then(res=>dispatch({ type: types.GET_BOOKMARKS, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.UPDATE_USER:
            return axios.put(`${API_URL}/user/i`, action.payload, headers)
            .then(res=>dispatch({ type: types.UPDATE_USER, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.RETWEET:
            return axios.post(`${API_URL}/tweet/${action.payload.id}/retweet`, action.payload, headers)
            .then(res=>dispatch({ type: types.RETWEET, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
        
        case types.DELETE_TWEET:
            return axios.delete(`${API_URL}/tweet/${action.payload}/delete`, headers)
            .then(res=>dispatch({ type: types.DELETE_TWEET, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.FOLLOW_USER:
            return axios.post(`${API_URL}/user/${action.payload}/follow`, action.payload, headers)
            .then(res=>dispatch({ type: types.FOLLOW_USER, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        default: dispatch(action)
    }
}