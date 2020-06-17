import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { Link, withRouter } from 'react-router-dom'
import './style.scss'
import { ICON_LOGO, ICON_HOME, ICON_HASH, ICON_BELL, ICON_INBOX
,ICON_BOOKMARK, ICON_LIST, ICON_USER, ICON_SETTINGS } from '../../Icons'

const Nav = ({history}) => {
    const { state, actions } = useContext(StoreContext)

    const { account } = state

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
                    <ICON_LOGO styles={{fill:"rgb(29,161,242)", width:'47px', height:"30px"}}/>
                </div>
                <nav className="Nav-wrapper">
                    <Link className="Nav-link" to={`/home`}>
                        <div className="Nav-item-hover">
                            <ICON_HOME styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Home</div>
                        </div>
                    </Link>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <ICON_HASH styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Explore</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <ICON_BELL styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Notifications</div>
                        </div>
                    </a>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <ICON_INBOX styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Messages</div>
                        </div>
                    </a>
                    <Link className="Nav-link" to={`/bookmarks`}>
                        <div className="Nav-item-hover">
                            <ICON_BOOKMARK styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Bookmarks</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/lists`}>
                        <div className="Nav-item-hover">
                            <ICON_LIST styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Lists</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/profile/${account && account.username}`}>
                        <div className="Nav-item-hover">
                            <ICON_USER styles={{ width:'26.25px', height:"26.25px"}} />
                            <div className="Nav-item">Profile</div>
                        </div>
                    </Link>
                    <a href="#" className="Nav-link">
                        <div className="Nav-item-hover">
                            <ICON_SETTINGS styles={{ width:'26.25px', height:"26.25px"}} />
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