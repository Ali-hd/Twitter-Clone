import React , { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import { withRouter, useHistory , Link } from 'react-router-dom'
import './style.scss'
import moment from 'moment'
import Loader from '../Loader'
import { ICON_ARROWBACK, ICON_HEART, ICON_REPLY, ICON_RETWEET, ICON_HEARTFULL, ICON_BOOKMARK,
ICON_DELETE, ICON_BOOKMARKFILL, ICON_IMGUPLOAD, ICON_CLOSE } from '../../Icons'
import axios from 'axios'
import {API_URL} from '../../config'
import ContentEditable from 'react-contenteditable'
import TweetCard from '../TweetCard'


const TweetPage = (props) => {
    let history = useHistory();

    const { state, actions } = useContext(StoreContext)
    const {tweet, account} = state

    const [modalOpen, setModalOpen] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [replyImage, setReplyImg] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(()=>{
        window.scrollTo(0, 0)
        actions.getTweet(props.match.params.id)
    }, [props.match.params.id])
    var image = new Image()

    let info
    const likeTweet = (id) => {
        info = { dest: "tweet", id }
        actions.likeTweet(info)
    }
    const retweet = (id) => {
        info = { dest: "tweet", id }
        actions.retweet(info)
    }
    const bookmarkTweet = (id) => {
        info = { dest: "tweet", id }
        actions.bookmarkTweet(info)
    }
    const deleteTweet = (id) => {
        actions.deleteTweet(id)
    }

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
        // if(type === 'parent'){setParent(true)}else{setParent(false)}
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

    const replyTweet = (type) => {
        toggleModal()
        let hashtags = replyText.match(/#(\w+)/g)
        if(!replyText.length){return}
        const values = {
            description: replyText,
            images: [replyImage],
            parent: props.match.params.id,
            hashtags
        }
        actions.tweet(values)
        tweetT.current = ''
        setReplyText('')
        setReplyImg(null)
    }

    const goBack = () => {
        history.goBack()
    }

    return(
        <div>
            {tweet && account ? 
            <div className="tweet-wrapper">
            <div className="tweet-header-wrapper">
                <div className="profile-header-back">
                    <div onClick={()=>goBack()} className="header-back-wrapper">
                        <ICON_ARROWBACK/>
                    </div>
                </div>
                <div className="tweet-header-content"> Tweet </div>
            </div>
            <div className="tweet-body-wrapper">
                <div className="tweet-header-content">
                    <div className="tweet-user-pic">
                        <Link to={`/profile/${tweet.user.username}`}>
                            <img alt="" style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={tweet.user.profileImg}/>
                        </Link>
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
                    <div onClick={()=>toggleModal()} className="tweet-int-icon">
                        <div className="card-icon reply-icon"> <ICON_REPLY /> </div>
                    </div>
                    <div onClick={()=>retweet(tweet._id)} className="tweet-int-icon">
                        <div className="card-icon retweet-icon">
                             <ICON_RETWEET styles={account.retweets.includes(tweet._id) ? {stroke: 'rgb(23, 191, 99)'} : {fill:'rgb(101, 119, 134)'}}/> 
                        </div>
                    </div>
                    <div onClick={()=>likeTweet(tweet._id)} className="tweet-int-icon">
                        <div className="card-icon heart-icon">
                        {account.likes.includes(tweet._id) ? <ICON_HEARTFULL styles={{fill:'rgb(224, 36, 94)'}}
                         /> : <ICON_HEART/>} </div>
                    </div>
                    <div onClick={()=>account.username === tweet.user.username ? deleteTweet(tweet._id) : bookmarkTweet(tweet._id)} className="tweet-int-icon">
                        <div className={account.username === tweet.user.username ? "card-icon delete-icon" :"card-icon share-icon"}>
                            {account.username === tweet.user.username ? 
                                <ICON_DELETE styles={{fill:'rgb(101, 119, 134)'}} /> : account.bookmarks.includes(tweet._id) ? <ICON_BOOKMARKFILL styles={{fill:'rgb(10, 113, 176)'}}/> :
                                <ICON_BOOKMARK styles={{fill:'rgb(101, 119, 134)'}}/>}
                        </div>
                    </div>
                </div>
            </div>

            {tweet.replies.map(r=>{
                return <TweetCard retweet={r.retweet} username={r.username} name={r.name} replyTo={tweet.user.username} key={r._id} id={r._id} user={r.user} createdAt={r.createdAt} description={r.description}
                images={r.images} replies={r.replies} retweets={r.retweets} likes={r.likes}  /> 
            })}
        
        </div>:<div className="tweet-wrapper"><Loader /></div>}

        {tweet && account ?
        <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            {modalOpen ?
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
                            <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${tweet.user.username}`}>
                                <img alt="" style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={tweet.user.profileImg}/>
                            </Link>
                        </div>
                        <div className="card-content-wrapper">
                            <div className="card-content-header">
                                <div className="card-header-detail">
                                    <span className="card-header-user">
                                        <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${tweet.user.username}`}>{tweet.user.name}</Link>     
                                    </span>
                                    <span className="card-header-username">
                                        <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${tweet.user.username}`}>{'@'+ tweet.user.username}</Link>
                                    </span>
                                    <span className="card-header-dot">·</span>
                                    <span className="card-header-date">
                                        {/* <Link onClick={(e)=>e.stopPropagation()} to={`/profile/${props.user.username}`}> */}
                                                {/* {moment(parent? props.parent.createdAt : props.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')} */}
                                                {moment(tweet.createdAt).fromNow()}
                                        {/* </Link> */}
                                    </span>
                                </div>
                            </div>
                            <div className="card-content-info">
                            {tweet.description}
                            </div>
                            <div className="reply-to-user">
                                <span className="reply-tweet-username">
                                    Replying to 
                                </span>
                                <span className="main-tweet-user">
                                    @{tweet.user.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style={{position: 'relative'}} className="Tweet-input-wrapper">
                        <div className="Tweet-profile-wrapper">
                            <div>
                                <img alt="" style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={account.profileImg}/>
                            </div>
                        </div>
                        <div className="Tweet-input-side">
                            <div className="inner-input-box">
                                <ContentEditable onPaste={(e)=>e.preventDefault()} id="replyBox" style={{minHeight: '120px'}} className={replyText.length ? 'tweet-input-active' : null} placeholder="Tweet your reply" html={tweetT.current} onChange={handleChange} />
                            </div>
                            {replyImage && <div className="inner-image-box">
                                <img onLoad={() => setImageLoaded(true)} className="tweet-upload-image" src={replyImage} alt="tweet" />
                                {imageLoaded && <span onClick={removeImage} className="cancel-image">x</span>}
                            </div>}
                            <div className="inner-input-links">
                                <div className="input-links-side">
                                    <div style={{marginLeft:'-10px'}} className="input-attach-wrapper">
                                        <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                                        <input title=" " id="image" style={{opacity:'0'}} type="file" onChange={()=>onchangeImage()} />
                                    </div>
                                </div>
                                <div onClick={()=>replyTweet('parent')} className={replyText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                                    Reply
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>:null}
        </div>
    )
}

export default withRouter(TweetPage)