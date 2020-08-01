import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { Link, withRouter, Redirect } from 'react-router-dom'
import './style.scss'
import { ICON_LOGO, ICON_HOME, ICON_HASH, ICON_BELL, ICON_INBOX
,ICON_BOOKMARK, ICON_LIST, ICON_USER, ICON_SETTINGS, ICON_HOMEFILL, ICON_HASHFILL,
ICON_BELLFILL, ICON_BOOKMARKFILL, ICON_LISTFILL, ICON_USERFILL, ICON_FEATHER, 
ICON_CLOSE,ICON_IMGUPLOAD, ICON_INBOXFILL, ICON_LIGHT, ICON_DARK } from '../../Icons'
import axios from 'axios'
import {API_URL} from '../../config'
import ContentEditable from 'react-contenteditable'
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    setFetchMethod 
} from 'darkreader';

const Nav = ({history}) => {
    const { state, actions } = useContext(StoreContext)

    const { account, session } = state
    const [moreMenu, setMoreMenu] = useState(false)
    const [theme, setTheme] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [styleBody, setStyleBody] = useState(false)
    const [tweetText, setTweetText] = useState('')
    const [tweetImage, setTweetImage] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    const tweetT = useRef('');

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current){ isInitialMount.current = false }
        else { 
            document.getElementsByTagName("body")[0].style.cssText = styleBody && "overflow-y: hidden; margin-right: 17px"
        }
    }, [styleBody])

    useEffect( () => () => document.getElementsByTagName("body")[0].style.cssText = "", [] )

    useEffect(()=>{  
        let ran = false
        history.listen((location, action) => {
          state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
        });
        !ran && state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
        if(localStorage.getItem('Theme')=='dark'){
            setTheme('dark')
            setFetchMethod(window.fetch)
            enableDarkMode();
        }else if(!localStorage.getItem('Theme')){
            localStorage.setItem('Theme', 'light')
        }
      }, [])
      
      const path = history.location.pathname.slice(0,5)

      const openMore = () => { setMoreMenu(!moreMenu) }

      const handleMenuClick = (e) => { e.stopPropagation() }

    

    const uploadImage = (file) => {
        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
            .then(res=>{setTweetImage(res.data.imageUrl)})
            .catch(err=>alert('error uploading image'))
    }

    
    const onchangeImage = () => {
        let file = document.getElementById('image').files[0];
        uploadImage(file)
    }

    const removeImage = () => {
        document.getElementById('image').value = "";
        setTweetImage(null)
        setImageLoaded(false)
    }

    const toggleModal = (e, type) => {
        if(e){ e.stopPropagation() }
        setStyleBody(!styleBody)
        setTimeout(()=>{ setModalOpen(!modalOpen) },20)
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }


    const handleChange = evt => {
        if(tweetT.current.trim().length <= 280 
        && tweetT.current.split(/\r\n|\r|\n/).length <= 30){
            tweetT.current = evt.target.value; 
            setTweetText(tweetT.current)
        }
    };

    const submitTweet = (type) => {

        let hashtags = tweetText.match(/#(\w+)/g)
        toggleModal()
        if(!tweetText.length){return}
        const values = {
            description: tweetText,
            images: [tweetImage],
            hashtags
        }
        actions.tweet(values)
        tweetT.current = ''
        setTweetText('')
        setTweetImage(null)
    }

    const changeTheme = () => {
        if(localStorage.getItem('Theme') === 'dark'){
            disableDarkMode()
            localStorage.setItem('Theme', 'light')
        }else if(localStorage.getItem('Theme') === 'light'){
            localStorage.setItem('Theme', 'dark')
            setFetchMethod(window.fetch)
            enableDarkMode();
        }
    }

    return(
        <div className="Nav-component">
        <div className="Nav-width">
            <div className="Nav">
            <div className="Nav-Content">
                <nav className="Nav-wrapper">
                    <Link to={`/home`} className="logo-wrapper">
                        <ICON_LOGO styles={{fill:"rgb(29,161,242)", width:'47px', height:"30px"}}/>
                    </Link>
                    <Link className="Nav-link" to={`/home`}>
                        <div className={path === '/home' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/home' ? <ICON_HOMEFILL /> : <ICON_HOME />}
                            <div className="Nav-item">Home</div>
                        </div>
                    </Link>
                    <Link to="/explore" className="Nav-link">
                        <div className={path === '/expl' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/expl' ? <ICON_HASHFILL /> : <ICON_HASH />}
                            <div className="Nav-item">Explore</div>
                        </div>
                    </Link>
                    {session ? 
                    <> 
                    <Link to="/notifications" className="Nav-link">
                        <div className={path === '/noti' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/noti' ? <ICON_BELLFILL /> : <ICON_BELL />}
                            <div className="Nav-item">Notifications</div>
                        </div>
                    </Link>
                    <Link to="/messages" className="Nav-link">
                        <div className={path === '/mess' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/mess' ?   <ICON_INBOXFILL /> :<ICON_INBOX />}
                            <div className="Nav-item">Messages</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/bookmarks`}>
                        <div className={path === '/book' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/book' ? <ICON_BOOKMARKFILL /> : <ICON_BOOKMARK />}
                            <div className="Nav-item">Bookmarks</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/lists`}>
                        <div className={path === '/list' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/list' ? <ICON_LISTFILL /> : <ICON_LIST />}
                            <div className="Nav-item">Lists</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/profile/${account && account.username}`}>
                        <div className={path === '/prof' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/prof' ? <ICON_USERFILL /> : <ICON_USER />}
                            <div className="Nav-item">Profile</div>
                        </div>
                    </Link>
                    </> : null}
                    <div id="moremenu" onClick={openMore} className="Nav-link">
                        <div className={"Nav-item-hover"}>
                            <ICON_SETTINGS  />
                            <div className="Nav-item">More</div>
                        </div>
                        <div onClick={()=>openMore()} style={{display: moreMenu ? 'block' : 'none'}} className="more-menu-background">
                        <div className="more-modal-wrapper">
                            {moreMenu ? 
                            <div style={{top: `${document.getElementById('moremenu').getBoundingClientRect().top - 40}px`, left: `${document.getElementById('moremenu').getBoundingClientRect().left}px`, height: !session ? '104px' : null }} onClick={(e)=>handleMenuClick(e)} className="more-menu-content">
                                    <div onClick={changeTheme} className="more-menu-item">
                                        <span>Change Theme</span>
                                        <span>{theme ? <ICON_DARK/> : <ICON_LIGHT />}</span>
                                    </div>
                                    {session ?
                                    <Link to={`/bookmarks`} className="more-menu-item more-item">
                                        <span>Bookmarks</span>
                                        <span><ICON_BOOKMARK/></span>
                                    </Link> : null }
                                    {session ? 
                                    <div onClick={()=>actions.logout()} className="more-menu-item">
                                        Log out @{account && account.username}
                                    </div> : 
                                    <div onClick={()=>history.push('/login')} className="more-menu-item">
                                    Log in 
                                    </div>}
                            </div> : null }
                        </div>
                        </div>
                    </div>
                    {session ? 
                    <div className="Nav-tweet">   
                        <div onClick={()=>toggleModal()} className="Nav-tweet-link">
                            <div className="Nav-tweet-btn btn-hide">
                                Tweet
                            </div>
                            <div className="Nav-tweet-btn btn-show">
                                <span><ICON_FEATHER/></span>
                            </div>
                        </div>
                    </div> : null }
                </nav>
                <div>

                </div>
            </div>
            </div>
        </div>

        {account && 
        <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            <div style={{minHeight: '270px', height: 'initial'}} onClick={(e)=>handleModalClick(e)} className="modal-content">
                <div className="modal-header">
                    <div className="modal-closeIcon">
                        <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                            <ICON_CLOSE />
                        </div>
                    </div>
                    <p className="modal-title">Tweet</p>
                </div>
                <div style={{marginTop:'5px'}} className="modal-body">
                    <div style={{position: 'relative'}} className="Tweet-input-wrapper">
                        <div className="Tweet-profile-wrapper">
                            <div>
                                <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={account.profileImg}/>
                            </div>
                        </div>
                        <div onClick={()=>document.getElementById('tweetPop').focus()} className="Tweet-input-side">
                            <div className="inner-input-box">
                                <ContentEditable onKeyDown={(e)=>tweetT.current.length>279 ? e.keyCode !== 8 && e.preventDefault(): null} id="tweetPop" onPaste={(e)=>e.preventDefault()} style={{minHeight: '120px'}} className={tweetText.length ? 'tweet-input-active' : null} placeholder="What's happening" html={tweetT.current} onChange={handleChange} />
                            </div>
                            {tweetImage && <div className="inner-image-box">
                                <img onLoad={() => setImageLoaded(true)} className="tweet-upload-image" src={tweetImage} alt="tweet image" />
                                {imageLoaded && <span onClick={removeImage} className="cancel-image">x</span>}
                            </div>}
                            <div className="inner-input-links">
                                <div className="input-links-side">
                                    <div style={{marginLeft:'-10px'}} className="input-attach-wrapper">
                                        <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                                        <input title=" " id="image" style={{opacity:'0'}} type="file" onChange={()=>onchangeImage()} />
                                    </div>
                                </div>
                                <div className="tweet-btn-holder">
                                    <div style={{ fontSize: '13px', color: tweetText.length >= 280 ? 'red' : null }}>
                                        {tweetText.length > 0 && tweetText.length + '/280'}
                                    </div>
                                    <div onClick={()=>submitTweet('none')} className={tweetText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                                    Tweet
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
        </div>
    )
}

export default withRouter(Nav)