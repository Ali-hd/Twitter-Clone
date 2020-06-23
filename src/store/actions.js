import types from './typeActions'
import jwt from 'jsonwebtoken'

export const useActions = (state, dispatch) => ({
    login: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.LOGIN, payload: data})
    },
    signup: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.REGISTER, payload: data})
    },
    tweet: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.TWEET, payload: data})
    },
    likeTweet: data => {
        dispatch({type: types.LIKE_TWEET, payload: data})
    },
    getTweets: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.GET_TWEETS, payload: data})
    },
    bookmarkTweet: data => {
        dispatch({type: types.BOOKMARK, payload: data})
    },
    getTweet: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.GET_TWEET, payload: data})
    },
    verifyToken: data => {
        jwt.verify(localStorage.getItem('Twittertoken'), process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
            if (err) { dispatch({type: types.SET_STATE, payload: {session: false, decoded: decoded }})  }
            else {  
                if(data == 'get account'){ dispatch({type: types.GET_ACCOUNT}) }
                dispatch({type: types.SET_STATE, payload: {session: true, decoded: decoded}})  }
        });
    },
    getUser: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.GET_USER, payload: data})
    },
    getBookmarks: data => {
        dispatch({type: types.GET_BOOKMARKS})
    },
    updateUser: data => {
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.UPDATE_USER, payload: data})
    },
    retweet: data => {
        dispatch({type: types.RETWEET, payload: data})
    },
    deleteTweet: data => {
        dispatch({type: types.DELETE_TWEET, payload: data})
    },
    followUser: data => {
        dispatch({type: types.FOLLOW_USER, payload: data})
    },
    editList: data => {
        dispatch({type: types.EDIT_LIST, payload: data})
    },
    createList: data => {
        dispatch({type: types.CREATE_LIST, payload: data})
    },
    deleteList: data => {
        dispatch({type: types.DELETE_LIST, payload: data})
    },
    getLists: data => {
        dispatch({type: types.GET_LISTS, payload: data})
    },
    logout: () => {
        localStorage.removeItem("Twittertoken")
        window.location.reload()
    },
    getList: data => {
        dispatch({type: types.GET_LIST, payload: data})
    },
    getTrend: data => {
        dispatch({type: types.GET_TREND, payload: data})
    },
    search: data => {
        dispatch({type: types.SEARCH, payload: data})
    },
    getTrendTweets: data => {
        dispatch({type: types.TREND_TWEETS, payload: data})
    },
    addToList: data => {
        dispatch({type: types.ADD_TO_LIST, payload: data})
    },
    getFollowers: data => {
        dispatch({type: types.GET_FOLLOWERS, payload: data})
    },
    getFollowing: data => {
        dispatch({type: types.GET_FOLLOWING, payload: data})
    },
    searchUsers: data => {
        dispatch({type: types.SEARCH_USERS, payload: data})
    },
    whoToFollow: data => {
        dispatch({type: types.WHO_TO_FOLLOW, payload: data})
    },
    alert: data => {
        dispatch({type: types.SET_STATE, payload: {top: '16px', msg: data}})
        setTimeout(() => { dispatch({type: types.SET_STATE, payload: {top: '-100px'}}) }, 2700)
    },
    getConversations: data => {
        dispatch({type: types.GET_CONVERSATIONS, payload: data})
    },
    startChat: data => {
        dispatch({type: types.SET_STATE, payload: {startingChat: true}})
        dispatch({type: types.START_CHAT, payload: data})
    },
    getSingleConversation: data =>{
        dispatch({type: types.GET_SINGLE_CONVERSATION, payload: data})
    }
})
