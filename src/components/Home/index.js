import React , { useEffect, useState, useContext, useRef }  from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import { Icon_ImgUpload, Icon_Reply, Icon_Retweet,
Icon_Heart, Icon_Share, Icon_Bookmark, Icon_HeartFull, Icon_BookmarkFill } from '../../Icons'
import {API_URL} from '../../config'
import Loader from '../Loader'
import moment from 'moment'

const Home = () => {
    const { state, actions } = useContext(StoreContext)

    useEffect(() => {
        actions.getTweets()
    }, [])

    //used for contenteditable divs on react hooks
    const tweetT = useRef('');
    const handleChange = evt => {
        tweetT.current = evt.target.value; 
        setTweetText(tweetT.current)
    };
    const [tweetText, setTweetText] = useState('')
    const [tweetImage, setTweetImage] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    
    const submitTweet = () => {
        if(!tweetText.length){return}
        const values = {
            description: tweetText,
            images: [tweetImage]
        }
        actions.tweet(values)
        tweetT.current = ''
        setTweetText('')
    }

    const onchangefile = () => {
        let file = document.getElementById('file').files[0];
        let filename = file.name

        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
            .then(res=>{   
                setTweetImage(res.data.imageUrl)
            })
            .catch(err=>alert('error uploading image'))
    }

    const removeImage = () => {
        document.getElementById('file').value = "";
        setTweetImage(null)
        setImageLoaded(false)
    }

    const likeTweet = (id) => {
        actions.likeTweet(id)
    }

    const bookmarkTweet = (id) => {
        actions.bookmarkTweet(id)
    }

    return(
        <div className="Home-wrapper">
            {console.log(state)}
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
                        <ContentEditable className={tweetText.length ? 'tweet-input-active' : null} placeholder="What's happening?" html={tweetT.current} onChange={handleChange} />
                    </div>
                    {tweetImage && <div className="inner-image-box">
                         <img onLoad={() => setImageLoaded(true)} className="tweet-upload-image" src={tweetImage} alt="tweet image" />
                         {imageLoaded && <span onClick={removeImage} className="cancel-image">x</span>}
                    </div>}
                    <div className="inner-input-links">
                        <div className="input-links-side">
                            <div style={{marginLeft:'-10px'}} className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                                <input id="file" style={{opacity:'0'}} type="file" onChange={()=>onchangefile()} />
                            </div>
                            {/* <div className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div>
                            <div className="input-attach-wrapper">
                                <Icon_ImgUpload styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div> */}
                        </div>
                        <div onClick={submitTweet} className={tweetText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                            Tweet
                        </div>
                    </div>
                </div>
            </div>
            <div className="Tweet-input-divider"></div>
            {state.tweets.length> 0 ? state.tweets.map(t=>{
                return <div key={t._id} className="Tweet-card-wrapper">
                <div className="card-userPic-wrapper">
                    <a href="#">
                        <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={t.user.profileImg}/>
                    </a>
                </div>
                <div className="card-content-wrapper">
                    <div className="card-content-header">
                        <div className="card-header-detail">
                            <span className="card-header-user">
                                         {t.user.name}
                            </span>
                            <span className="card-header-username">
                                        {'@'+ t.user.username}
                            </span>
                            <span className="card-header-dot">·</span>
                            <span className="card-header-date">
                                        {moment(t.createdAt).fromNow(true).replace(' ','').replace('an','1').replace('minutes','m').replace('hour','h').replace('hs','h')}
                            </span>
                        </div>
                        <div className="card-header-more">
                        
                        </div>
                    </div>
                    <div className="card-content-info">
                    {t.description}
                    </div>
                    {t.images[0] && 
                    <div className="card-content-images">
                        <div className="card-image-link">
                            <img src={t.images[0]}/>
                        </div>
                    </div> }
                    <div className="card-buttons-wrapper">
                        <div className="card-button-wrap reply-wrap">
                            <div className="card-icon reply-icon">
                                <Icon_Reply styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                {t.replies.length > 0 && t.replies.length}
                            </div>
                        </div>
                        <div className="card-button-wrap retweet-wrap">
                            <div className="card-icon retweet-icon">
                                <Icon_Retweet styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>
                            </div>
                            <div className="card-icon-value">
                                {t.retweets.length > 0 && t.retweets.length}
                            </div>
                        </div>
                        <div onClick={()=>likeTweet(t._id)} className="card-button-wrap heart-wrap">
                            <div className="card-icon heart-icon">
                                {state.account.likes.includes(t._id) ? 
                                <Icon_HeartFull styles={{fill:'rgb(224, 36, 94)', width:'18.75px', height:'18.75px'}}/> :
                                <Icon_Heart styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>}
                            </div>
                            <div style={{color: state.account.likes.includes(t._id) && 'rgb(224, 36, 94)', opacity: t.likes.length > 0 ? '1':'0'}} className="card-icon-value">
                                {t.likes.length}  
                            </div>
                        </div>
                        <div onClick={()=>bookmarkTweet(t._id)} className="card-button-wrap">
                            <div className="card-icon share-icon">
                                {state.account.bookmarks.includes(t._id) ?
                                <Icon_BookmarkFill styles={{fill:'rgb(10, 113, 176)', width:'18.75px', height:'18.75px'}}/> :
                                <Icon_Bookmark styles={{fill:'rgb(101, 119, 134)', width:'18.75px', height:'18.75px'}}/>}
                                {/* <Icon_Share /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            }): <Loader/>}
            
        </div>
    )
}

export default Home