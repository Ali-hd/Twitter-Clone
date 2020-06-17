import React, { useContext } from 'react'
import './style.scss'
import moment from 'moment'
import { StoreContext } from '../../store/store'
import { Link, withRouter } from 'react-router-dom'
import { ICON_REPLY, ICON_RETWEET,
    ICON_HEART, ICON_SHARE, ICON_BOOKMARK, ICON_HEARTFULL, ICON_BOOKMARKFILL, ICON_DELETE } from '../../Icons'
const TweetCard = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {account, user} = state

    let info
    const likeTweet = (id) => {
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.likeTweet(info)
    }

    const bookmarkTweet = (id) => {
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.bookmarkTweet(info)
    }

    const retweet = (id) => {
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.retweet(info)
    }

    const deleteTweet = (id) => {
        actions.deleteTweet(id)
    }

    return (
        <div key={props.id} className="Tweet-card-wrapper">
            <div className="card-userPic-wrapper">
                <Link to={`/profile/${props.user.username}`}>
                    <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={props.user.profileImg}/>
                </Link>
            </div>
            <div className="card-content-wrapper">
                <div className="card-content-header">
                    <div className="card-header-detail">
                        <span className="card-header-user">
                            <Link to={`/profile/${props.user.username}`}>{props.user.name}</Link>     
                        </span>
                        <span className="card-header-username">
                            <Link to={`/profile/${props.user.username}`}>{'@'+ props.user.username}</Link>
                        </span>
                        <span className="card-header-dot">·</span>
                        <span className="card-header-date">
                            {/* <Link to={`/profile/${props.user.username}`}> */}
                                    {moment(props.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')}
                            {/* </Link> */}
                        </span>
                    </div>
                    <div className="card-header-more">
                    
                    </div>
                </div>
                <div className="card-content-info">
                {props.description}
                </div>
                {props.images[0] && 
                <div className="card-content-images">
                    <div className="card-image-link">
                        <img src={props.images[0]}/>
                    </div>
                </div> }
                <div className="card-buttons-wrapper">
                    <div className="card-button-wrap reply-wrap">
                        <div className="card-icon reply-icon">
                            <ICON_REPLY styles={{fill:'rgb(101, 119, 134)'}}/>
                        </div>
                        <div className="card-icon-value">
                            {props.replies.length > 0 && props.replies.length}
                        </div>
                    </div>
                    <div onClick={()=>retweet(props.id)} className="card-button-wrap retweet-wrap">
                        <div className="card-icon retweet-icon">
                            <ICON_RETWEET styles={account.retweets.includes(props.id) ? {stroke: 'rgb(23, 191, 99)'} : {fill:'rgb(101, 119, 134)'}}/>
                        </div>
                        <div style={{color: account.retweets.includes(props.id) && 'rgb(23, 191, 99)', opacity: props.retweets.length > 0 ? '1':'0'}} className="card-icon-value">
                            {props.retweets.length}
                        </div>
                    </div>
                    <div onClick={()=>likeTweet(props.id)} className="card-button-wrap heart-wrap">
                        <div className="card-icon heart-icon">
                            {state.account.likes.includes(props.id) ? 
                            <ICON_HEARTFULL styles={{fill:'rgb(224, 36, 94)'}}/> :
                            <ICON_HEART styles={{fill:'rgb(101, 119, 134)'}}/>}
                        </div>
                        <div style={{color: state.account.likes.includes(props.id) && 'rgb(224, 36, 94)', opacity: props.likes.length > 0 ? '1':'0'}} className="card-icon-value">
                            {props.likes.length}  
                        </div>
                    </div>
                    <div onClick={()=>state.account.username === props.user.username ? deleteTweet(props.id): bookmarkTweet(props.id)} className="card-button-wrap">
                        <div className={state.account && state.account.username === props.user.username ? "card-icon delete-icon" :"card-icon share-icon"}>
                            {state.account && state.account.username === props.user.username ? 
                            <ICON_DELETE styles={{fill:'rgb(101, 119, 134)'}} /> : state.account.bookmarks.includes(props.id) ?
                            <ICON_BOOKMARKFILL styles={{fill:'rgb(10, 113, 176)'}}/> :
                            <ICON_BOOKMARK styles={{fill:'rgb(101, 119, 134)'}}/>}
                            {/* <ICON_SHARE /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default withRouter(TweetCard)