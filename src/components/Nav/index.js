import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { Link, withRouter } from 'react-router-dom'
import './style.scss'
import { Icon_Logo, Icon_Home, Icon_Hash, Icon_Bell, Icon_Inbox
,Icon_Bookmark, Icon_List, Icon_User, Icon_Settings } from '../../Icons'

const Nav = ({history}) => {
    const { state, actions } = useContext(StoreContext)

    useEffect(()=>{  
        let ran = false
        history.listen((location, action) => {
          state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
        });
        !ran && state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
      }, [])

    return(
        <div className="Nav-width">
            <div className="Nav">
            <div className="Nav-Content">
                <div className="logo-wrapper">
                    <Icon_Logo styles={{fill:"rgb(29,161,242)", width:'47px', height:"30px"}}/>
                </div>
                <nav className="Nav-wrapper">
                    <Link className="Nav-link" to={`/home`}>
                        <div className="Nav-item-hover">
                            <Icon_Home styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Home</div>
                        </div>
                    </Link>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_Hash styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Explore</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_Bell styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Notifications</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_Inbox styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Messages</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_Bookmark styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Bookmarks</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_List styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Lists</div>
                        </div>
                    </a>
                    <Link className="Nav-link" to={`/profile/ALIMKHD`}>
                        <div className="Nav-item-hover">
                            <Icon_User styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Profile</div>
                        </div>
                    </Link>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <Icon_Settings styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">More</div>
                        </div>
                    </a>
                    <div className="Nav-tweet">   
                        <a className="Nav-tweet-link">
                            <div className="Nav-tweet-btn">
                                Tweet
                            </div>
                        </a>
                    </div>
                </nav>
                <div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(Nav)