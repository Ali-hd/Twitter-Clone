import type from './typeActions'

const initialState = {
    session: false,
    user: {
        _id: ""
    },
    account: null,
    tweets: [],
    tweet: null,
    account: null
}

const reducer = (state = initialState, action) => {
    console.log('running reducer')
    switch (action.type) {
        case type.SET_STATE:
            console.log('set state')
            return {...state, ...action.payload }
        case type.ERROR:
            // message.error(action.payload.msg? action.payload.msg : action.payload == 'Unauthorized' ? 'You need to sign in' : 'error');
            console.log(action.payload)
            return {...state, loading: false, error: true, msg: action.payload.msg}
        case type.LOGIN:
            localStorage.setItem("Twittertoken", action.payload.token)
            console.log('login success')
            console.log(action.payload)
            return {...state, ...action.payload, loading: false, error: false}
        case type.REGISTER:
            alert('registreed')
            return {...state, ...action.payload, loading: false, error: false}
        case type.TWEET:
            alert('tweeted')
            return {...state, loading: false, error: false}
        case type.LIKE_TWEET:
            console.log(action.data)
            let account_likes = state.account
            let tweet_likes = state.tweets
            console.log(tweet_likes.find(x=>x._id === action.data))
            if(action.payload.msg === "liked"){
                account_likes.likes.push(action.data)
                tweet_likes.find(x=>x._id === action.data).likes.push('user')
            }else if(action.payload.msg === "unliked"){ 
                tweet_likes.find(x=>x._id === action.data).likes.pop()
                let likeIndex = account_likes.likes.indexOf(action.data)
                likeIndex > -1 && account_likes.likes.splice(likeIndex, 1)}
            return {...state, ...{account:account_likes}, ...{tweets:tweet_likes}}
        case type.GET_TWEETS:
            console.log(action.payload)
            return {...state, ...action.payload, loading: false, error: false}
        case type.GET_TWEET:
            alert('got tweet')
            console.log(action.payload)
            return {...state, ...action.payload, loading: false, error: false}
        case type.GET_ACCOUNT:
            console.log(action.payload)
            return {...state, ...action.payload}
        case type.BOOKMARK: 
            let account_bookmarks = state.account
            if(action.payload.msg === "bookmarked"){
                account_bookmarks.bookmarks.push(action.data)
            }else if(action.payload.msg === "removed from bookmarks"){ 
                let bookIndex = account_bookmarks.bookmarks.indexOf(action.data)
                bookIndex > -1 && account_bookmarks.bookmarks.splice(bookIndex, 1)}
            return {...state, ...{account:account_bookmarks}}
        default:
            return state
    }
  }

export { initialState, reducer }