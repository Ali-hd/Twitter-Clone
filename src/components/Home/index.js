import React , { useEffect, useState, useContext }  from 'react'
import './style.scss'
import { Icon_ImgUpload, Icon_Reply, Icon_Retweet,
Icon_Heart, Icon_Share } from '../../Icons'

const Home = () => {
    // const [activeColor, setActiveColor] = useState('rgb(134, 120, 101)')

    // const changeColor = (color) => {
    //     setActiveColor(color)
    // }

    return(
        <div className="Home-wrapper">
            <div className="Home-header-wrapper">
                <h2 className="Home-header">
                    Latest Tweets
                </h2>
            </div>
            <div className="Tweet-input-wrapper">
                <div className="Tweet-profile-wrapper">
                    <a href="#">
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                    </a>
                </div>
                <div className="Tweet-input-side">
                    <div className="inner-input-box">
                        What's happening?
                    </div>
                    <div className="inner-input-links">
                        <div className="input-links-side">
                            <div style={{marginLeft:'-10px'}} className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div>
                            <div className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div>
                            <div className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div>
                        </div>
                        <div className="tweet-btn-side">
                            Tweet
                        </div>
                    </div>
                </div>
            </div>
            <div className="Tweet-input-divider"></div>
            <div className="Tweet-card-wrapper">
                <div className="card-userPic-wrapper">
                    <a href="#">
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                    </a>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                         eXtra Stores
                            </span>
                            <span className="card-header-username">
                                        @eXtraStores
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                        1h
                            </span>
                        </div>
                        <div className="card-header-more">
                        
                        </div>
                    </div>
                    <div className="card-content-info">
                    Like my new glasses? Lol I asked you guys the Patreon Patrons which country you wanted to see for filler week and this was your choice. It was diffic
                    </div>
                    <div className="card-content-images">
                        <div className="card-image-link">
                            <img src="https://i.imgur.com/vYQYRmp.jpg"/>
                        </div>
                    </div>
                    <div className="card-buttons-wrapper">
                        <div className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <Icon_Reply styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                1
                            </div>
                        </div>
                        <div className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <Icon_Retweet styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                7
                            </div>
                        </div>
                        <div className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                <Icon_Heart styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                12  
                            </div>
                        </div>
                        <div className="card-button-wrap">
                            <div className="card-icon share-icon">
                                <Icon_Share styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Tweet-card-wrapper">
                <div className="card-userPic-wrapper">
                    <a href="#">
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                    </a>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                         eXtra Stores
                            </span>
                            <span className="card-header-username">
                                        @eXtraStores
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                        1h
                            </span>
                        </div>
                        <div className="card-header-more">
                        
                        </div>
                    </div>
                    <div className="card-content-info">
                    Like my new glasses? Lol I asked you guys the Patreon Patrons which country you wanted to see for filler week and this was your choice. It was diffic
                    </div>
                    <div className="card-content-images">
                        <div className="card-image-link">
                            <img src="https://i.imgur.com/vYQYRmp.jpg"/>
                        </div>
                    </div>
                    <div className="card-buttons-wrapper">
                        <div className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <Icon_Reply styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                1
                            </div>
                        </div>
                        <div className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <Icon_Retweet styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                7
                            </div>
                        </div>
                        <div className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                <Icon_Heart styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                12  
                            </div>
                        </div>
                        <div className="card-button-wrap">
                            <div className="card-icon share-icon">
                                <Icon_Share styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Tweet-card-wrapper">
                <div className="card-userPic-wrapper">
                    <a href="#">
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src="https://i.imgur.com/vYQYRmp.jpg"/>
                    </a>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                         eXtra Stores
                            </span>
                            <span className="card-header-username">
                                        @eXtraStores
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                        1h
                            </span>
                        </div>
                        <div className="card-header-more">
                        
                        </div>
                    </div>
                    <div className="card-content-info">
                    Like my new glasses? Lol I asked you guys the Patreon Patrons which country you wanted to see for filler week and this was your choice. It was diffic
                    </div>
                    <div className="card-content-images">
                        <div className="card-image-link">
                            <img src="https://i.imgur.com/vYQYRmp.jpg"/>
                        </div>
                    </div>
                    <div className="card-buttons-wrapper">
                        <div className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <Icon_Reply styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                1
                            </div>
                        </div>
                        <div className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <Icon_Retweet styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                7
                            </div>
                        </div>
                        <div className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                <Icon_Heart styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                12  
                            </div>
                        </div>
                        <div className="card-button-wrap">
                            <div className="card-icon share-icon">
                                <Icon_Share styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home