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
            .then(res=>dispatch({ type: types.REGISTER, payload: res.data, data: action.payload })) 
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.TWEET:
            return axios.post(`${API_URL}/tweet/create`, action.payload, headers)
            .then(res=>dispatch({ type: types.TWEET, payload: res.data, data: action.payload }))
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

        case types.EDIT_LIST:
            return axios.put(`${API_URL}/lists/${action.payload.id}/edit`, action.payload, headers)
            .then(res=>dispatch({ type: types.EDIT_LIST, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.CREATE_LIST:
            return axios.post(`${API_URL}/lists/create`, action.payload, headers)
            .then(res=>dispatch({ type: types.CREATE_LIST, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.DELETE_LIST:
            return axios.delete(`${API_URL}/lists/${action.payload}/delete`, headers)
            .then(res=>dispatch({ type: types.DELETE_LIST, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_LISTS:
            return axios.get(`${API_URL}/user/i/lists`, headers)
            .then(res=>dispatch({ type: types.GET_LISTS, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_LIST:
            return axios.get(`${API_URL}/lists/${action.payload}`, headers )
            .then(res=>dispatch({ type: types.GET_LIST, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_TREND:
            return axios.get(`${API_URL}/trend`)
            .then(res=>dispatch({ type: types.GET_TREND, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.SEARCH:
            return axios.post(`${API_URL}/trend`, action.payload)
            .then(res=>dispatch({ type: types.SEARCH, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.SEARCH_USERS:
            return axios.post(`${API_URL}/user`, action.payload)
            .then(res=>dispatch({ type: types.SEARCH_USERS, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.TREND_TWEETS:
            return axios.get(`${API_URL}/trend/${action.payload}`)
            .then(res=>dispatch({ type: types.TREND_TWEETS, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.ADD_TO_LIST:
            return axios.post(`${API_URL}/lists/${action.payload.username}/${action.payload.id}`, action.payload, headers)
            .then(res=>dispatch({ type: types.ADD_TO_LIST, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_FOLLOWERS:
            return axios.get(`${API_URL}/user/${action.payload}/followers`, headers)
            .then(res=>dispatch({ type: types.GET_FOLLOWERS, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        // case types.GET_FOLLOWING:
        //     return axios.get(`${API_URL}/lists/i/following`, action.payload, headers)
        //     .then(res=>dispatch({ type: types.GET_FOLLOWING, payload: res.data, data: action.payload }))
        //     .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.WHO_TO_FOLLOW: 
            return axios.get(`${API_URL}/user/i/suggestions`, headers)
            .then(res=>dispatch({ type: types.WHO_TO_FOLLOW, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))
            
        
        case types.GET_CONVERSATIONS: 
            return axios.get(`${API_URL}/chat/conversations`, headers)
            .then(res=>dispatch({ type: types.GET_CONVERSATIONS, payload: res.data }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.START_CHAT: 
            return axios.post(`${API_URL}/chat/conversation`, action.payload, headers)
            .then(res=>dispatch({ type: types.START_CHAT, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        case types.GET_SINGLE_CONVERSATION: 
            return axios.get(`${API_URL}/chat/conversation?id=${action.payload.id}`, headers)
            .then(res=>dispatch({ type: types.GET_SINGLE_CONVERSATION, payload: res.data, data: action.payload }))
            .catch(err=>dispatch({ type: types.ERROR, payload: err.response.data }))

        default: dispatch(action)
    }
}