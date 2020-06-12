import React from 'react'
import './style.scss'
import { Icon_ImgUpload } from '../../Icons'

const Home = () => {
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
        </div>
    )
}

export default Home