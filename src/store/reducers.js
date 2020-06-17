import type from './typeActions'
import moment from 'moment' 

const initialState = {
    session: false,
    user: {
        _id: ""
    },
    account: null,
    tweets: [],
    tweet: null,
    account: null,
    user: null,
    bookmarks: [],
    recent_tweets: [],
    lists: []
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
            console.log(action.payload)
            return {...state, ...action.payload, loading: false, error: false}

        case type.REGISTER:
            alert('registreed')
            return {...state, ...action.payload, loading: false, error: false}

        case type.TWEET:
            console.log(action.payload)
            let recentT = state.tweets
            recentT.unshift(action.payload.tweet)
            return {...state, loading: false, error: false}

        case type.LIKE_TWEET:
            let account_likes = state.account
            let tweet_likes = state.tweets
            let user_likes = state.user
            if(action.payload.msg === "liked"){
                account_likes.likes.push(action.data.id)
                tweet_likes.length && tweet_likes.find(x=>x._id === action.data.id).likes.push(account_likes._id)
                if(action.data.dest == 'profile'){
                    user_likes.tweets.find(x=>x._id === action.data.id).likes.push(action.data.id)
                    user_likes.likes = user_likes.tweets.filter(x=>x._id === action.data.id).concat(user_likes.likes)
                    console.log(user_likes.likes, user_likes.tweets.find(x=>x._id === action.data.id))
                }
            }else if(action.payload.msg === "unliked"){ 
                tweet_likes.length && tweet_likes.find(x=>x._id === action.data.id).likes.pop()
                let likeIndex = account_likes.likes.indexOf(action.data.id)
                likeIndex > -1 && account_likes.likes.splice(likeIndex, 1)
                if(action.data.dest == 'profile'){
                    user_likes.tweets.find(x=>x._id === action.data.id).likes.pop()
                    user_likes.likes = user_likes.likes.filter((x)=>{
                       return x._id !== action.data.id
                    });
                }
            }
            return {...state, ...{account:account_likes}, ...{tweets:tweet_likes}, ...{user: user_likes}}

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
                account_bookmarks.bookmarks.push(action.data.id)
            }else if(action.payload.msg === "removed from bookmarks"){ 
                let bookIndex = account_bookmarks.bookmarks.indexOf(action.data.id)
                bookIndex > -1 && account_bookmarks.bookmarks.splice(bookIndex, 1)}
            return {...state, ...{account:account_bookmarks}}

        case type.GET_USER:    
            return {...state, ...action.payload}

        case type.GET_BOOKMARKS:
            return {...state, ...action.payload}
            
        case type.UPDATE_USER:
            Object.keys(action.data).forEach(key => action.data[key] === '' || action.data[key] === undefined ? delete action.data[key] : null)
            console.log(action.data)
            let updateUser = {...state.user, ...action.data}
            console.log(updateUser)
            return {...state, ...{user:updateUser}}

        case type.RETWEET: 
            let user_retweets = state.user
            let acc_retweets = state.account
            let t_retweets = state.tweets
            if(action.payload.msg === "retweeted"){
                acc_retweets.retweets.push(action.data.id)
                console.log(t_retweets.find(x=>x._id === action.data.id))
                for(let i = 0; i < t_retweets.length; i++){
                    if(t_retweets[i]._id == action.data.id){
                        t_retweets[i].retweets.push(state.account._id)
                    }
                }
            }else if(action.payload.msg === "undo retweet"){ 
                let accRe_Index = acc_retweets.retweets.indexOf(action.data.id)
                accRe_Index > -1 && acc_retweets.retweets.splice(accRe_Index, 1)
                if(user_retweets){
                    user_retweets.tweets = user_retweets.tweets.filter((x)=>{
                        return x._id !== action.data.id})
                }
                for(let i = 0; i < t_retweets.length; i++){
                    if(t_retweets[i]._id == action.data.id){
                        t_retweets[i].retweets = t_retweets[i].retweets.filter((x)=>{
                            return x !== state.account._id})
                        }
                    }
                }
            return {...state, ...{user:user_retweets}, ...{account: acc_retweets}, ...{tweets: t_retweets}}

        case type.DELETE_TWEET:
            let userTweetsD = state.user
            let homeTweetsD = state.tweets
            userTweetsD.tweets = userTweetsD && userTweetsD.tweets.filter((x=>{
                return x._id !== action.data })) 
            homeTweetsD = homeTweetsD.filter((x)=>{
                return x._id !== action.data
            })
            return {...state, ...{user: userTweetsD}, ...{tweets: homeTweetsD}}

        case type.FOLLOW_USER: 
            let accountF = state.account
            if(action.payload.msg === 'follow'){
                accountF.following.push(action.data)
            }else if(action.payload.msg === 'unfollow'){
                accountF.following = accountF.following.filter(f=>{
                    return f !== action.data })
            }
            return {...state, ...{account: accountF}}

        case type.EDIT_LIST: 
            ////
            return state

        case type.CREATE_LIST: 
            ////
            return state

        case type.DELETE_LIST: 
            ////
            return state

        case type.GET_LISTS: 
            return {...state, ...action.payload}
        default:
            return state
    }
  }

export { initialState, reducer }