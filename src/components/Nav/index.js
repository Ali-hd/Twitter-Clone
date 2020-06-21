import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { Link, withRouter, Redirect } from 'react-router-dom'
import './style.scss'
import { ICON_LOGO, ICON_HOME, ICON_HASH, ICON_BELL, ICON_INBOX
,ICON_BOOKMARK, ICON_LIST, ICON_USER, ICON_SETTINGS, ICON_HOMEFILL, ICON_HASHFILL, ICON_BELLFILL, ICON_BOOKMARKFILL, ICON_LISTFILL, ICON_USERFILL, ICON_FEATHER, ICON_CLOSE,ICON_IMGUPLOAD, ICON_INBOXFILL } from '../../Icons'
import axios from 'axios'
import {API_URL} from '../../config'
import ContentEditable from 'react-contenteditable'

const Nav = ({history}) => {
    const { state, actions } = useContext(StoreContext)

    const { account, session } = state
    const [moreMenu, setMoreMenu] = useState(false)

    const [modalOpen, setModalOpen] = useState(false)
    const [tweetText, setTweetText] = useState('')
    const [tweetImage, setTweetImage] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    const tweetT = useRef('');



    useEffect(()=>{  
        let ran = false
        history.listen((location, action) => {
          state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
        });
        !ran && state.account == null ? actions.verifyToken('get account') : actions.verifyToken()
      }, [])

      if(!session){
         return <Redirect to="/login" />
      }
      
      let path = history.location.pathname

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
        // if(param === 'edit'){setSaved(false)}
        // if(type === 'parent'){setParent(true)}else{setParent(false)}
        setModalOpen(!modalOpen)
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }


    const handleChange = evt => {
        tweetT.current = evt.target.value; 
        setTweetText(tweetT.current)
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

    return(
        <div style={{position: 'relative'}}>
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
                        <div className={path === '/explore' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/explore' ? <ICON_HASHFILL /> : <ICON_HASH />}
                            <div className="Nav-item">Explore</div>
                        </div>
                    </Link>
                    <Link to="/notifications" className="Nav-link">
                        <div className={path === '/notifications' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/notifications' ? <ICON_BELLFILL /> : <ICON_BELL />}
                            <div className="Nav-item">Notifications</div>
                        </div>
                    </Link>
                    <Link to="/messages" className="Nav-link">
                        <div className={path === '/messages' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/messages' ?   <ICON_INBOXFILL /> :<ICON_INBOX />}
                            <div className="Nav-item">Messages</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/bookmarks`}>
                        <div className={path === '/bookmarks' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/bookmarks' ? <ICON_BOOKMARKFILL /> : <ICON_BOOKMARK />}
                            <div className="Nav-item">Bookmarks</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/lists`}>
                        <div className={path === '/lists' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path === '/lists' ? <ICON_LISTFILL /> : <ICON_LIST />}
                            <div className="Nav-item">Lists</div>
                        </div>
                    </Link>
                    <Link className="Nav-link" to={`/profile/${account && account.username}`}>
                        <div className={path.substring(0,8) === '/profile' ? "Nav-item-hover active-Nav" : "Nav-item-hover"}>
                            {path.substring(0,8) === '/profile' ? <ICON_USERFILL /> : <ICON_USER />}
                            <div className="Nav-item">Profile</div>
                        </div>
                    </Link>
                    <div onClick={openMore} className="Nav-link">
                        <div className={"Nav-item-hover"}>
                            <ICON_SETTINGS />
                            <div className="Nav-item">More</div>
                        </div>
                    </div>
                    <div className="Nav-tweet">   
                        <div onClick={()=>toggleModal()} className="Nav-tweet-link">
                            <div className="Nav-tweet-btn btn-hide">
                                Tweet
                            </div>
                            <div className="Nav-tweet-btn btn-show">
                                <span><ICON_FEATHER/></span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>

                </div>
            </div>
            </div>
        </div>

        <div onClick={()=>openMore()} style={{display: moreMenu ? 'block' : 'none'}} className="more-menu-background">
        </div>

        {moreMenu ? 
        <div onClick={(e)=>handleMenuClick(e)} className="more-menu-content">
                <div onClick={()=>actions.logout()} className="more-menu-item">
                    Log out @{account && account.username}
                </div>
                <div className="more-menu-item">
                    Change Theme
                </div>
        </div> : null }

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
                        <div className="Tweet-input-side">
                            <div className="inner-input-box">
                                <ContentEditable onPaste={(e)=>e.preventDefault()} style={{minHeight: '120px'}} className={tweetText.length ? 'tweet-input-active' : null} placeholder="What's happening" html={tweetT.current} onChange={handleChange} />
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
                                <div onClick={()=>submitTweet('none')} className={tweetText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                                    Tweet
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