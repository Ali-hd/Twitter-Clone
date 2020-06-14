import React from 'react'
import './style.scss'
import { Icon_ArrowBack, Icon_Heart, Icon_Reply, Icon_Retweet, Icon_Share } from '../../Icons'

const TweetPage = () => {
    return(
        <div className="tweet-wrapper">
            <div className="tweet-header-wrapper">
                <div className="profile-header-back">
                    <div onClick={()=>window.history.back()} className="header-back-wrapper">
                        <Icon_ArrowBack/>
                    </div>
                </div>
                <div className="tweet-header-content"> Tweet </div>
            </div>
            <div className="tweet-body-wrapper">
                <div className="tweet-header-content">
                    <div className="tweet-user-pic">
                        <a href="#">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                        </a>
                    </div>
                    <div className="tweet-user-wrap">
                        <div className="tweet-user-name">
                            Ali HD
                        </div>
                        <div className="tweet-username">
                            @ALIMKHD
                        </div>     
                    </div>
                </div>
                <div className="tweet-content">
                    Not trying to brag but I totally just fixed my toilet and I don't know anything about toilet repair. I literally just guessed on everything. It's not that hard.
                </div>
                <div className="tweet-date">
                    2:06 AM · Jun 12, 2020
                </div>
                <div className="tweet-stats">
                    <div className="int-num"> 7 </div>
                    <div className="int-text"> Retweets </div>
                    <div className="int-num"> 245 </div>
                    <div className="int-text"> Likes </div>
                </div>
                <div className="tweet-interactions">
                    <div className="tweet-int-icon">
                        <div className="card-icon reply-icon"> <Icon_Reply /> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon retweet-icon"> <Icon_Retweet/> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon heart-icon"> <Icon_Heart/> </div>
                    </div>
                    <div className="tweet-int-icon">
                        <div className="card-icon share-icon"> <Icon_Share/> </div>
                    </div>
                </div>
            </div>
            <div className="tweet-replies-wrapper">
                    <div className="reply-user-pic">
                        <a href="#">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                        </a>
                    </div>
                    <div className="reply-tweet-body">
                        <div>
                            <span className="tweet-user-name">
                                         eXtra Stores
                            </span>
                            <span className="reply-header-username">
                                        @eXtraStores
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
                                @ALIMKHD
                            </span>
                        </div>
                        <div className="reply-tweet-content">
                            I hope the Olympics in japan go ahead. Maybe do an episode on the venues in japan for the OLympics
                        </div>
                        <div className="reply-tweet-interactions">
                            <div className="reply-int-icon">
                                <div className="card-icon reply-int reply-icon"> <Icon_Reply /> </div>
                            </div>
                            <div className="reply-int-icon retweet-int">
                                <div className="card-icon reply-int retweet-icon"> <Icon_Retweet/> </div>
                                <div className="card-icon-value">
                                    1
                                </div>
                            </div>
                            <div className="reply-int-icon heart-int">
                                <div className="card-icon reply-int heart-icon"> <Icon_Heart/> </div>
                                <div className="card-icon-value">
                                    7
                                </div>
                            </div>
                            <div className="reply-int-icon">
                                <div className="card-icon reply-int share-icon"> <Icon_Share/> </div>
                            </div>           
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default TweetPage