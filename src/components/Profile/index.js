import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Icon_ArrowBack, Icon_markDown, Icon_Date } from '../../Icons'
 
const Profile = () => {
    const [activeTab, setActiveTab] = useState('Tweets')

    const changeTab = (tab) => {
        setActiveTab(tab)
    }

    return(
        <div className="profile-wrapper">
            <div className="profile-header-wrapper">
                <div className="profile-header-back">
                    <div onClick={()=>window.history.back()} className="header-back-wrapper">
                        <Icon_ArrowBack/>
                    </div>
                </div>
                <div className="profile-header-content">
                    <div className="profile-header-name">
                            Ali HD
                    </div>
                    <div className="profile-header-tweets">
                            82 Tweets
                    </div>
                </div>
            </div>
            <div className="profile-banner-wrapper">
                <img src="https://i.imgur.com/ggD4Jta.jpg"/>
            </div>
            <div className="profile-details-wrapper">
                <div className="profile-options">
                    <div className="profile-image-wrapper">
                        <img src="https://i.imgur.com/vYQYRmp.jpg"/>
                    </div>
                    <div className="profile-edit-button">
                        <span>Edit profile</span>
                    </div>
                </div>
                <div className="profile-details-box">
                    <div className="profile-name">Ali HD</div>
                    <div className="profile-username">@AliMKHD</div>
                    <div className="profile-info-box">
                        <Icon_markDown/>
                        <div className="profile-location"> Kingdom of Saudi Arabia </div>
                        <Icon_Date/>
                        <div className="profile-date"> Joined April 2012 </div>
                    </div>
                </div>
                <div className="profile-social-box">
                        <div className="follow-num"> 26 </div>
                        <div className="follow-text"> Following </div>
                        <div className="follow-num"> 4 </div>
                        <div className="follow-text"> Followers </div>
                </div>
            </div>
            <div className="profile-nav-menu">
                <div onClick={()=>changeTab('Tweets')} className={activeTab =='Tweets' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Tweets
                </div>
                <div onClick={()=>changeTab('Media')} className={activeTab =='Media' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Media
                </div>
                <div onClick={()=>changeTab('Likes')} className={activeTab =='Likes' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Likes
                </div>
            </div>
        </div>
    )
}

export default Profile