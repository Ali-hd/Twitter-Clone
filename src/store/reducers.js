import type from './typeActions'

const initialState = {
    session: true,
    loggedin: false,
    tweets: [],
    tweet: null,
    account: null,
    user: null,
    bookmarks: [],
    recent_tweets: [],
    lists: [],
    list: null,
    trends: [],
    result: [],
    tagTweets: [],
    followers: [],
    following: [],
    resultUsers: [],
    suggestions: [],
    top: '-100px',
    msg: '',
    conversations: null,
    conversation: null,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_STATE:
            return {...state, ...action.payload }

        case type.ERROR:
            // message.error(action.payload.msg? action.payload.msg : action.payload == 'Unauthorized' ? 'You need to sign in' : 'error');
            return {...state, loading: false, error: true, msg: action.payload.msg}

        case type.LOGIN:
            localStorage.setItem("Twittertoken", action.payload.token)
            return {...state, ...action.payload, loggedin: true, loading: false, error: false}

        case type.REGISTER:
            setTimeout(()=>{action.data.func()},250)
            return {...state, ...action.payload, loading: false, error: false}

        case type.TWEET:
            let recentT = state.tweets
            let s_tweet = state.tweet
            recentT.unshift(action.payload.tweet)
            if(s_tweet && s_tweet._id === action.data.parent){
                s_tweet.replies.unshift(action.payload.tweet)
            }
            return {...state, loading: false, error: false}

        case type.LIKE_TWEET:
            let account_likes = state.account
            let tweet_likes = state.tweets
            let user_likes = state.user
            let Stweet_likes = state.tweet
            if(action.payload.msg === "liked"){

                if(Stweet_likes){
                    Stweet_likes.likes.push(action.data.id)
                }

                account_likes.likes.push(action.data.id)
                tweet_likes.length && tweet_likes.find(x=>x._id === action.data.id).likes.push(account_likes._id)

                if(action.data.dest === 'profile'){
                    user_likes.tweets.find(x=>x._id === action.data.id).likes.push(action.data.id)
                    user_likes.likes = user_likes.tweets.filter(x=>x._id === action.data.id).concat(user_likes.likes)
                }
            
            }else if(action.payload.msg === "unliked"){ 

                if(Stweet_likes){
                    Stweet_likes.likes = Stweet_likes.likes.filter((x)=>{
                        return x !== action.data.id
                     });
                }

                tweet_likes.length && tweet_likes.find(x=>x._id === action.data.id).likes.pop()
                let likeIndex = account_likes.likes.indexOf(action.data.id)
                likeIndex > -1 && account_likes.likes.splice(likeIndex, 1)

                if(action.data.dest === 'profile'){
                    user_likes.tweets.find(x=>x._id === action.data.id).likes.pop()
                    user_likes.likes = user_likes.likes.filter((x)=>{
                       return x._id !== action.data.id
                    });
                }
            }
            return {...state, ...{account:account_likes}, ...{tweets:tweet_likes}, ...{user: user_likes}, ...{tweet: Stweet_likes}}

        case type.GET_TWEETS:
            return {...state, ...action.payload, loading: false, error: false}

        case type.GET_TWEET:
            return {...state, ...action.payload, loading: false, error: false}

        case type.GET_ACCOUNT:
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
            let updateUser = {...state.user, ...action.data}
            return {...state, ...{user:updateUser}}

        case type.RETWEET: 
            let user_retweets = state.user
            let acc_retweets = state.account
            let t_retweets = state.tweets
            let Stweet_retweets = state.tweet
            if(action.payload.msg === "retweeted"){
                if(Stweet_retweets){ Stweet_retweets.retweets.push(action.data.id) }
                acc_retweets.retweets.push(action.data.id)
                for(let i = 0; i < t_retweets.length; i++){
                    if(t_retweets[i]._id === action.data.id){
                        t_retweets[i].retweets.push(state.account._id)
                    }
                }
            }else if(action.payload.msg === "undo retweet"){ 
                if(Stweet_retweets){
                    Stweet_retweets.retweets = Stweet_retweets.retweets.filter((x)=>{
                        return x !== action.data.id
                     });
                }
                let accRe_Index = acc_retweets.retweets.indexOf(action.data.id)
                accRe_Index > -1 && acc_retweets.retweets.splice(accRe_Index, 1)
                if(user_retweets){
                    user_retweets.tweets = user_retweets.tweets.filter((x)=>{
                        return x._id !== action.data.id})
                }
                for(let i = 0; i < t_retweets.length; i++){
                    if(t_retweets[i]._id === action.data.id){
                        t_retweets[i].retweets = t_retweets[i].retweets.filter((x)=>{
                            return x !== state.account._id})
                        }
                    }
                }
            return {...state, ...{user:user_retweets}, ...{account: acc_retweets}, ...{tweets: t_retweets}, ...{tweet: Stweet_retweets}}

        case type.DELETE_TWEET:
            let userTweetsD = state.user
            let homeTweetsD = state.tweets
            let singleTweet = state.tweet
            if(userTweetsD){
                userTweetsD.tweets = userTweetsD && userTweetsD.tweets.filter((x=>{
                    return x._id !== action.data })) 
            }
            if(singleTweet && action.data === singleTweet._id){
                window.location.replace('/home')
                singleTweet = null
            }
            homeTweetsD = homeTweetsD.filter((x)=>{
                return x._id !== action.data
            })
            return {...state, ...{user: userTweetsD}, ...{tweets: homeTweetsD}, ...{tweet: singleTweet}}

        case type.FOLLOW_USER: 
            let accountF = state.account
            let user_followers = state.followers
            if(action.payload.msg === 'follow'){
                accountF.following.push(action.data)
            }else if(action.payload.msg === 'unfollow'){
                accountF.following = accountF.following.filter(f=>{
                    return f !== action.data })
                user_followers = user_followers.filter(f=>{
                    return f._id !== action.data })
            }
            return {...state, ...{account: accountF}, ...{followers: user_followers}}

        case type.GET_LIST: 
            return {...state, ...action.payload}

        case type.EDIT_LIST: 
            ////
            return state

        case type.CREATE_LIST: 
            let add_list = state.lists
            add_list.unshift(action.payload.list)
            return {...state, ...{lists: add_list}}

        case type.DELETE_LIST: 
            ////
            return state

        case type.GET_LISTS: 
            return {...state, ...action.payload}

        case type.GET_TREND: 
            return {...state, ...action.payload}

        case type.SEARCH: 
            return {...state, ...action.payload}

        case type.TREND_TWEETS: 
        let t_tweets = action.payload.tagTweets.tweets
            return {...state, ...{tagTweets: t_tweets}}

        case type.ADD_TO_LIST: 
            let added_list = state.list
            if(action.payload.msg === 'user removed'){
                added_list.users = added_list.users.filter(x=>{ return x._id !== action.data.userId })
            }else{
                added_list.users.push({username: action.data.username , _id: action.data.userId, name: action.data.name, profileImg: action.data.profileImg})
            }
            return {...state, ...{list: added_list}}
        
        case type.GET_FOLLOWERS: 
            return {...state, ...action.payload}

        case type.GET_FOLLOWING: 
            return {...state, ...action.payload}

        case type.SEARCH_USERS: 
            return {...state, ...action.payload}

        case type.WHO_TO_FOLLOW:
            return {...state, ...action.payload}

        case type.GET_CONVERSATIONS:
            return {...state, ...action.payload}
        case type.START_CHAT:
            setTimeout(()=>{action.data.func()},250)
            return {...state, ...action.payload}
        case type.GET_SINGLE_CONVERSATION:
            setTimeout(()=>{action.data.func(action.payload.conversation.messages)},250)
            return {...state, ...action.payload}

        default:
            return state
    }
  }

export { initialState, reducer }