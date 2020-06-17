import React , { useEffect, useState, useContext, useRef }  from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import { ICON_IMGUPLOAD } from '../../Icons'
import {API_URL} from '../../config'
import Loader from '../Loader'
import moment from 'moment'
import TweetCard from '../TweetCard'

const Home = () => {
    const { state, actions } = useContext(StoreContext)

    useEffect(() => {
        window.scrollTo(0, 0)
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
                                <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                                <input title=" " id="file" style={{opacity:'0'}} type="file" onChange={()=>onchangefile()} />
                            </div>
                            {/* <div className="input-attach-wrapper">
                                <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div>
                            <div className="input-attach-wrapper">
                                <ICON_IMGUPLOAD styles={{fill:'rgb(29, 161, 242)'}}/>
                            </div> */}
                        </div>
                        <div onClick={submitTweet} className={tweetText.length ? 'tweet-btn-side tweet-btn-active' : 'tweet-btn-side'}>
                            Tweet
                        </div>
                    </div>
                </div>
            </div>
            <div className="Tweet-input-divider"></div>
            {/* { state.account && <TweetCard key={'1'} id={'1'} user={'1'} createdAt={'2019'} description={'t.description'}
                images={'t.images'} replies={[]} retweets={[]} likes={[]} style={{height:'0'}} />} */}
            {state.tweets.length> 0 ? state.tweets.map(t=>{
                return <TweetCard key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  /> 
            }): <Loader/>}
            
        </div>
    )
}

export default Home