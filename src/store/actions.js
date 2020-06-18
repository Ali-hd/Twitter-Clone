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
        console.log('like tweet', data)
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
        console.log(data)
        dispatch({type: types.SET_STATE, payload: {loading: true}})
        dispatch({type: types.GET_TWEET, payload: data})
    },
    verifyToken: data => {
        jwt.verify(localStorage.getItem('Twittertoken'), process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
            if (err) { dispatch({type: types.SET_STATE, payload: {session: false, decoded: decoded }})  }
            else {  
                if(data == 'get account'){ dispatch({type: types.GET_ACCOUNT}) }
                console.log('verifying token')
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
    logout: data => {
        localStorage.removeItem("Twittertoken")
        window.location.reload()
    }
    // logout: data => {
    //     localStorage.removeItem("Twittertoken")
    //     sessionStorage.removeItem("Twittertoken")
    //     window.location.reload()
    // },
    // verifyToken: data => {
    //     jwt.verify(localStorage.getItem('Twittertoken') || sessionStorage.getItem('Twittertoken'), process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
    //         if (err) { dispatch({type: types.SET_STATE, payload: {session: false, decoded: decoded }})  }
    //         else {  
    //             if(data == 'get account'){ dispatch({type: types.GET_ACCOUNT}) }
    //             console.log('verifying Twittertoken')
    //             dispatch({type: types.SET_STATE, payload: {session: true, decoded: decoded}})  }
    //     });
    // }
})
