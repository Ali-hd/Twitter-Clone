import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { withRouter } from 'react-router-dom'
import './style.scss'
import moment from 'moment'
import Loader from '../Loader'
import { ICON_ARROWBACK, ICON_HEART, ICON_REPLY, ICON_RETWEET, ICON_SHARE } from '../../Icons'

const TweetPage = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {tweet} = state

    useEffect(()=>{
        actions.getTweet(props.match.params.id)
    }, [])
    var image = new Image()
    return(
        <div>
            {tweet ? 
            <div className="tweet-wrapper">
            <div className="tweet-header-wrapper">
                <div className="profile-header-back">
                    <div onClick={()=>window.history.back()} className="header-back-wrapper">
                        <ICON_ARROWBACK/>
                    </div>
                </div>
                <div className="tweet-header-content"> Tweet </div>
            </div>
            <div className="tweet-body-wrapper">
                <div className="tweet-header-content">
                    <div className="tweet-user-pic">
                        <a href="#">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={tweet.user.profileImg}/>
                        </a>
                    </div>
                    <div className="tweet-user-wrap">
                        <div className="tweet-user-name">
                            {tweet.user.name}
                        </div>
                        <div className="tweet-username">
                            @{tweet.user.username}
                        </div>     
                    </div>
                </div>
                <div className="tweet-content">
                    {tweet.description}
                </div>
                <div className="tweet-image-wrapper">
                    <div style={{backgroundImage: `url(${tweet.images[0]})`,
                     paddingBottom: `${image.src = tweet.images[0], 100/(image.width/image.height)}%`}}></div>
                </div>
                <div className="tweet-date">
                    {moment(tweet.createdAt).format("h:mm A · MMM D, YYYY")}
                </div>
                <div className="tweet-stats">
                    <div className="int-num"> {tweet.retweets.length} </div>
                    <div className="int-text"> Retweets </div>
                    <div className="int-num"> {tweet.likes.length} </div>
                    <div className="int-text"> Likes </div>
                </div>
                <div className="tweet-interactions">
                    <div className="tweet-int-icon">
                        <div className="card-icon reply-icon"> <ICON_REPLY /> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon retweet-icon"> <ICON_RETWEET/> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon heart-icon"> <ICON_HEART/> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon share-icon"> <ICON_SHARE/> </div>
                    </div>
                </div>
            </div>
            {tweet.replies.map(r=>{
                return <div key={r._id} className="tweet-replies-wrapper">
                    <div className="reply-user-pic">
                        <a href="#">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={r.user.profileImg}/>
                        </a>
                    </div>
                    <div className="reply-tweet-body">
                        <div>
                            <span className="tweet-user-name">
                                        {r.user.name}
                            </span>
                            <span className="reply-header-username">
                                        @{r.user.username}
                            </span>
                            <span className="reply-header-dot">·</span>
                            <span className="reply-header-date">
                                        1h
                            </span>
                        </div>
                        <div>
                            <span className="reply-tweet-username">
                                Replying to 
                            </span>
                            <span className="main-tweet-user">
                                @{tweet.user.username}
                            </span>
                        </div>
                        <div className="reply-tweet-content">
                            {r.description}
                        </div>
                        <div className="reply-tweet-interactions">
                            <div className="reply-int-icon">
                                <div className="card-icon reply-int reply-icon"> <ICON_REPLY /> </div>
                            </div>
                            <div className="reply-int-icon retweet-int">
                                <div className="card-icon reply-int retweet-icon"> <ICON_RETWEET/> </div>
                                <div className="card-icon-value">
                                    1
                                </div>
                            </div>
                            <div className="reply-int-icon heart-int">
                                <div className="card-icon reply-int heart-icon"> <ICON_HEART/> </div>
                                <div className="card-icon-value">
                                    7
                                </div>
                            </div>
                            <div className="reply-int-icon">
                                <div className="card-icon reply-int share-icon"> <ICON_SHARE/> </div>
                            </div>           
                        </div>
                    </div>
            </div>
            })}
        </div>:<div className="tweet-wrapper"><Loader /></div>}
        </div>
    )
}

export default withRouter(TweetPage)