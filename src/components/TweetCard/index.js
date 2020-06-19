import React, { useContext, useState, useRef, useEffect } from 'react'
import './style.scss'
import moment from 'moment'
import { StoreContext } from '../../store/store'
import { Link, withRouter, Redirect, NavLink } from 'react-router-dom'
import { ICON_REPLY, ICON_RETWEET,
    ICON_HEART, ICON_SHARE, ICON_BOOKMARK, ICON_HEARTFULL, ICON_BOOKMARKFILL, ICON_DELETE, ICON_ARROWBACK, ICON_UPLOAD, ICON_CLOSE,ICON_IMGUPLOAD} from '../../Icons'
import axios from 'axios'
import {API_URL} from '../../config'
import ContentEditable from 'react-contenteditable'


const TweetCard = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {account, user} = state

    let info
    const likeTweet = (e,id) => {
        e.stopPropagation()
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.likeTweet(info)
    }

    const bookmarkTweet = (e,id) => {
        e.stopPropagation()
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.bookmarkTweet(info)
    }

    const retweet = (e,id) => {
        e.stopPropagation()
        if(props.history.location.pathname.slice(1,5) == 'home'){
            info = { dest: "home", id }
        }else if(props.history.location.pathname.slice(1,5) == 'prof'){
            info = { dest: "profile", id }
        }else{return}
        actions.retweet(info)
    }

    const deleteTweet = (e,id) => {
        e.stopPropagation()
        actions.deleteTweet(id)
    }

    const goToTweet = (id) => {
        props.history.push(`/tweet/${props.user.username}/${id}`)      
    } 

    const [modalOpen, setModalOpen] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [replyImage, setReplyImg] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [parent, setParent] = useState(false)
    const [saved, setSaved] = useState(false)

    const uploadImage = (file) => {
        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
            .then(res=>{setReplyImg(res.data.imageUrl)})
            .catch(err=>alert('error uploading image'))
    }

    
    const onchangeImage = () => {
        let file = document.getElementById('image').files[0];
        uploadImage(file)
    }

    const removeImage = () => {
        document.getElementById('image').value = "";
        setReplyImg(null)
        setImageLoaded(false)
    }

    const toggleModal = (e, type) => {
        if(e){ e.stopPropagation() }
        // if(param === 'edit'){setSaved(false)}
        if(type === 'parent'){setParent(true)}else{setParent(false)}
        setModalOpen(!modalOpen)
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }

    const tweetT = useRef('');
    const handleChange = evt => {
        tweetT.current = evt.target.value; 
        setReplyText(tweetT.current)
    };

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.overflow = modalOpen? "hidden" : "visible";
      }, [modalOpen])


    const replyTweet = (type) => {
        toggleModal()
        if(!replyText.length){return}
        const values = {
            description: replyText,
            images: [replyImage],
            parent: type === 'parent' ? props.parent._id : props.id
        }
        actions.tweet(values)
        tweetT.current = ''
        setReplyText('')
        setReplyImg(null)
    }

    moment.locale('en', {
        relativeTime: {
          future: 'in %s',
          past: '%s ago',
          s:  'few seconds ago',
          ss: '%ss',
          m:  '1m',
          mm: '%dm',
          h:  '1h',
          hh: '%dh',
          d:  'a day',
          dd: '%dd',
          M:  'a month',
          MM: '%dM',
          y:  'a year',
          yy: '%dY'
        }
      });

    return (
        <div>
            {props.parent ?  
            <div onClick={()=>goToTweet(props.parent._id)} key={props.parent._id} style={{borderBottom: '0px'}} className="Tweet-card-wrapper">   
                <div className="card-userPic-wrapper">
                    <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.parent.user.username}`}>
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={props.parent.user.profileImg}/>
                    </Link>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.parent.user.username}`}>{props.parent.user.name}</Link>     
                            </span>
                            <span className="card-header-username">
                                <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.parent.user.username}`}>{'@'+ props.parent.user.username}</Link>
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                {/* <Link to={`/profile/${props.parent.user.username}`}> */}
                                        {moment(props.parent.createdAt).fromNow(true)}
                                {/* </Link> */}
                            </span>
                        </div>
                        <div className="card-header-more">
                        
                        </div>
                    </div>
                    <div className="card-content-info">
                    {props.parent.description}
                    </div>
                    {props.parent.images[0] && 
                    <div className="card-content-images">
                        <div className="card-image-link">
                            <img src={props.parent.images[0]}/>
                        </div>
                    </div> }
                    <div className="card-buttons-wrapper">
                        <div onClick={(e)=>toggleModal(e, 'parent')} className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <ICON_REPLY styles={{fill:'rgb(101, 119, 134)'}}/>
                            </div>
                            <div className="card-icon-value">
                                {props.parent.replies.length > 0 && props.parent.replies.length}
                            </div>
                        </div>
                        <div onClick={(e)=>retweet(e, props.parent._id)} className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <ICON_RETWEET styles={account.retweets.includes(props.parent._id) ? {stroke: 'rgb(23, 191, 99)'} : {fill:'rgb(101, 119, 134)'}}/>
                            </div>
                            <div style={{color: account.retweets.includes(props.parent._id) && 'rgb(23, 191, 99)', opacity: props.parent.retweets.length > 0 ? '1':'0'}} className="card-icon-value">
                                {props.parent.retweets.length}
                            </div>
                        </div>
                        <div onClick={(e)=>likeTweet(e, props.parent._id)} className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                {state.account.likes.includes(props.parent._id) ? 
                                <ICON_HEARTFULL styles={{fill:'rgb(224, 36, 94)'}}/> :
                                <ICON_HEART styles={{fill:'rgb(101, 119, 134)'}}/>}
                            </div>
                            <div style={{color: state.account.likes.includes(props.parent._id) && 'rgb(224, 36, 94)', opacity: props.parent.likes.length > 0 ? '1':'0'}} className="card-icon-value">
                                {props.parent.likes.length}  
                            </div>
                        </div>
                        <div onClick={(e)=>state.account.username === props.parent.user.username ? deleteTweet(e, props.parent._id): bookmarkTweet(e, props.parent._id)} className="card-button-wrap">
                            <div className={state.account && state.account.username === props.parent.user.username ? "card-icon delete-icon" :"card-icon share-icon"}>
                                {state.account && state.account.username === props.parent.user.username ? 
                                <ICON_DELETE styles={{fill:'rgb(101, 119, 134)'}} /> : state.account.bookmarks.includes(props.parent._id) ?
                                <ICON_BOOKMARKFILL styles={{fill:'rgb(10, 113, 176)'}}/> :
                                <ICON_BOOKMARK styles={{fill:'rgb(101, 119, 134)'}}/>}
                                {/* <ICON_SHARE /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null }

            {/* ///////////////////////////parent\\\\\\\\\\\\\\\\\\\\\\\\ */}
          {props.user ? 
            <div onClick={()=>goToTweet(props.id)} key={props.id} className="Tweet-card-wrapper">   
                <div className="card-userPic-wrapper">
                    <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}>
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={props.user.profileImg}/>
                    </Link>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}>{props.user.name}</Link>     
                            </span>
                            <span className="card-header-username">
                                <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}>{'@'+ props.user.username}</Link>
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                {/* <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}> */}
                                        {/* {moment(props.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')} */}
                                        {moment(props.createdAt).fromNow(true)}
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
                        <div onClick={(e)=>toggleModal(e)} className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <ICON_REPLY styles={{fill:'rgb(101, 119, 134)'}}/>
                            </div>
                            <div className="card-icon-value">
                                {props.replies.length > 0 && props.replies.length}
                            </div>
                        </div>
                        <div onClick={(e)=>retweet(e,props.id)} className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <ICON_RETWEET styles={account.retweets.includes(props.id) ? {stroke: 'rgb(23, 191, 99)'} : {fill:'rgb(101, 119, 134)'}}/>
                            </div>
                            <div style={{color: account.retweets.includes(props.id) && 'rgb(23, 191, 99)', opacity: props.retweets.length > 0 ? '1':'0'}} className="card-icon-value">
                                {props.retweets.length}
                            </div>
                        </div>
                        <div onClick={(e)=>likeTweet(e,props.id)} className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                {state.account.likes.includes(props.id) ? 
                                <ICON_HEARTFULL styles={{fill:'rgb(224, 36, 94)'}}/> :
                                <ICON_HEART styles={{fill:'rgb(101, 119, 134)'}}/>}
                            </div>
                            <div style={{color: state.account.likes.includes(props.id) && 'rgb(224, 36, 94)', opacity: props.likes.length > 0 ? '1':'0'}} className="card-icon-value">
                                {props.likes.length}  
                            </div>
                        </div>
                        <div onClick={(e)=>state.account.username === props.user.username ? deleteTweet(e,props.id): bookmarkTweet(e,props.id)} className="card-button-wrap">
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
            </div> : null}

        {props.parent || props.user ? 
            <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            <div style={{minHeight: '379px', height: 'initial'}} onClick={(e)=>handleModalClick(e)} className="modal-content">
                <div className="modal-header">
                    <div className="modal-closeIcon">
                        <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                            <ICON_CLOSE />
                        </div>
                    </div>
                    <p className="modal-title">Reply</p>
                </div>
                <div style={{marginTop:'5px'}} className="modal-body">
                    <div className="reply-content-wrapper">   
                        <div className="card-userPic-wrapper">
                            <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${parent? props.parent.user.username:props.user.username}`}>
                                <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={parent? props.parent.user.profileImg : props.user.profileImg}/>
                            </Link>
                        </div>
                        <div className="card-content-wrapper">
                            <div className="card-content-header">
                                <div className="card-header-detail">
                                    <span className="card-header-user">
                                        <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${parent? props.parent.user.username:props.user.username}`}>{parent? props.parent.user.name : props.user.name}</Link>     
                                    </span>
                                    <span className="card-header-username">
                                        <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${parent? props.parent.user.username : props.user.username}`}>{parent? '@'+props.parent.user.username : '@'+props.user.username}</Link>
                                    </span>
                                    <span className="card-header-dot">·</span>
                                    <span className="card-header-date">
                                        {/* <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}> */}
                                                {/* {moment(parent? props.parent.createdAt : props.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')} */}
                                                {moment(parent? props.parent.createdAt : props.createdAt).fromNow()}
                                        {/* </Link> */}
                                    </span>
                                </div>
                            </div>
                            <div className="card-content-info">
                            {parent? props.parent.description : props.description}
                            </div>
                            <div className="reply-to-user">
                                <span className="reply-tweet-username">
                                    Replying to 
                                </span>
                                <span className="main-tweet-user">
                                    @{parent? props.parent.user.username : props.user.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{position: 'relative'}} className="Tweet-input-wrapper">
                        <div className="Tweet-profile-wrapper">
                            <div>
                                <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={account.profileImg}/>
                            </div>
                        </div>
                        <div className="Tweet-input-side">
                            <div className="inner-input-box">
                                <ContentEditable style={{minHeight: '120px'}} className={replyText.length ? 'tweet-input-active' : null} placeholder="Tweet your reply" html={tweetT.current} onChange={handleChange} />
                            </div>
                            {replyImage && <div className="inner-image-box">
                                <img onLoad={() => setImageLoaded(true)} className="tweet-upload-image" src={replyImage} alt="tweet image" />
                                {imageLoaded && <span onClick={removeImage} className="cancel-image">x</span>}
                            </div>}
                            <div className="inner-input-links">
                                <div className="input-links-side">
                                    <div style={{marginLeft:'-10px'}} className="input-attach-wrapper">
                                        <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                                        <input title=" " id="image" style={{opacity:'0'}} type="file" onChange={()=>onchangeImage()} />
                                    </div>
                                </div>
                                <div onClick={()=>replyTweet(parent? 'parent' : 'none')} className={replyText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                                    Reply
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : null}
        </div>
    )
}

export default withRouter(TweetCard)