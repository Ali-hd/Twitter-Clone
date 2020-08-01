import React, { useEffect, useState, useContext, useRef } from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import { ICON_IMGUPLOAD } from '../../Icons'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import Loader from '../Loader'
import TweetCard from '../TweetCard'

const Home = () => {
    const { state, actions } = useContext(StoreContext)
    const { account, session } = state
    useEffect(() => {
        window.scrollTo(0, 0)
        actions.getTweets()
    }, [])

    //used for contenteditable divs on react hooks
    const tweetT = useRef('');
    const handleChange = (evt, e) => {
        if (tweetT.current.trim().length <= 280
            && tweetT.current.split(/\r\n|\r|\n/).length <= 30) {
            tweetT.current = evt.target.value;
            setTweetText(tweetT.current)
        }
        // document.getElementById('tweet-box').innerHTML = document.getElementById('tweet-box').innerHTML.replace(/(\#\w+)/g, '<span class="blue">$1</span>')
    };
    const [tweetText, setTweetText] = useState("")
    const [tweetImage, setTweetImage] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

    const submitTweet = () => {
        if (!tweetText.length) { return }

        let hashtags = tweetText.match(/#(\w+)/g)

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

    const onchangefile = () => {
        setImageLoading(true)
        let file = document.getElementById('file').files[0];

        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}` } })
            .then(res => {
                setTweetImage(res.data.imageUrl)
                setImageLoading(false)
            })
            .catch(err => alert('error uploading image'))
    }

    const removeImage = () => {
        document.getElementById('file').value = "";
        setTweetImage(null)
        setImageLoaded(false)
    }

    return (
        <div className="Home-wrapper">
            <div className="Home-header-wrapper">
                <h2 className="Home-header">
                    Latest Tweets
                </h2>
            </div>
            {session ? 
            <div className="Tweet-input-wrapper">
                <div className="Tweet-profile-wrapper">
                    <Link to={`/profile/${account && account.username}`}>
                        {account && <img alt="" style={{ borderRadius: '50%', minWidth: '49px' }} width="100%" height="49px" src={account.profileImg} />}
                    </Link>
                </div>
                <div onClick={() => document.getElementById('tweet-box').focus()} className="Tweet-input-side">
                    <div className="inner-input-box">
                        <ContentEditable onPaste={(e) => e.preventDefault()} id="tweet-box" className={tweetText.length ? 'tweet-input-active' : null} onKeyDown={(e)=>tweetT.current.length>279 ? e.keyCode !== 8 && e.preventDefault(): null} placeholder="What's happening?" html={tweetT.current} onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                        {imageLoading ? <Loader /> : null}
                    </div>
                    {tweetImage && <div className="inner-image-box">
                        <img onLoad={() => setImageLoaded(true)} className="tweet-upload-image" src={tweetImage} alt="tweet" />
                        {imageLoaded && <span onClick={removeImage} className="cancel-image">x</span>}
                    </div>}
                    <div className="inner-input-links">
                        <div className="input-links-side">
                            <div style={{ marginLeft: '-10px' }} className="input-attach-wrapper">
                                <ICON_IMGUPLOAD styles={{ fill: 'rgb(29, 161, 242)' }} />
                                <input title=" " id="file" style={{ opacity: '0' }} type="file" onChange={() => onchangefile()} />
                            </div>
                        </div>
                        <div className="tweet-btn-holder">
                            <div style={{ fontSize: '13px', color: tweetText.length >= 280 ? 'red' : null }}>
                                {tweetText.length > 0 && tweetText.length + '/280'}
                            </div>
                            <div onClick={submitTweet} className={tweetText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                                Tweet
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null }
            <div className="Tweet-input-divider"></div>
            {/* { state.account && <TweetCard parent={t.parent} key={'1'} id={'1'} user={'1'} createdAt={'2019'} description={'t.description'}
                images={'t.images'} replies={[]} retweets={[]} likes={[]} style={{height:'0'}} />} */}
            {state.tweets.length > 0 ? state.tweets.map(t => {
                return <TweetCard retweet={t.retweet} username={t.username} name={t.name} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                    images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes} />
            }) : <Loader />}
        </div>
    )
}

export default Home