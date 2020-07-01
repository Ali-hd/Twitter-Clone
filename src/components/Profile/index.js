import React , { useEffect, useState, useContext, useRef} from 'react'
import './style.scss'
import { ICON_ARROWBACK, ICON_MARKDOWN, ICON_DATE, ICON_CLOSE, ICON_UPLOAD, ICON_NEWMSG } from '../../Icons'
import { withRouter, Link } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'
import moment from 'moment'
import TweetCard from '../TweetCard'
import {API_URL} from '../../config'
import axios from 'axios'


const Profile = (props) => {
    const { state, actions } = useContext(StoreContext)
    const [activeTab, setActiveTab] = useState('Tweets')
    const [editName, setName] = useState('')
    const [editBio, setBio] = useState('')
    const [editLocation, setLocation] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [banner, setBanner] = useState('')
    const [avatar, setAvatar] = useState('')
    const [saved, setSaved] = useState(false)
    const [memOpen, setMemOpen] = useState(false)
    const [tab, setTab] = useState('Followers')   
    const [loadingAvatar, setLoadingAvatar] = useState(false)
    const [loadingBanner, setLoadingBanner] = useState(false)
    const [styleBody, setStyleBody] = useState(false)
    const {account, user} = state
    const userParam = props.match.params.username

    useEffect(() => {
        window.scrollTo(0, 0)
        actions.getUser(props.match.params.username)
        //preventing edit modal from apprearing after clicking a user on memOpen
        setMemOpen(false)
        setModalOpen(false)
    }, [props.match.params.username])
    
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current){ isInitialMount.current = false }
        else { 
            document.getElementsByTagName("body")[0].style.cssText = styleBody && "overflow-y: hidden; margin-right: 17px"
        }
      }, [styleBody])

      useEffect( () => () => document.getElementsByTagName("body")[0].style.cssText = "", [] )

      const changeTab = (tab) => {
        setActiveTab(tab)
    }

    const editProfile = () => {
        let values = {
            name: editName,
            description: editBio,
            location: editLocation,
            profileImg: avatar,
            banner: banner
        }
        actions.updateUser(values)
        setSaved(true)
        toggleModal()
    }

    const toggleModal = (param, type) => {
        setStyleBody(!styleBody)
        if(param === 'edit'){setSaved(false)}
        if(type){setTab(type)}
        if(param === 'members'){
            setMemOpen(true)
            actions.getFollowers(props.match.params.username)
        }
        if(memOpen){setMemOpen(false)}
        setTimeout(()=>{ setModalOpen(!modalOpen) },20)
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }

    const followUser = (e,id) => {
        e.stopPropagation()
        actions.followUser(id)
    }

    const uploadImage = (file,type) => {
        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
            .then(res=>{
                type === 'banner' ? setBanner(res.data.imageUrl) : setAvatar(res.data.imageUrl)
                type === 'banner' ? setLoadingBanner(false) : setLoadingAvatar(false)
            })
            .catch(err=>actions.alert('error uploading image'))
    }

    const changeBanner = () => {
        setLoadingBanner(true)
        let file = document.getElementById('banner').files[0];
        uploadImage(file, 'banner')
    }
    const changeAvatar = () => {
        setLoadingAvatar(true)
        let file = document.getElementById('avatar').files[0];
        uploadImage(file, 'avatar')
    }

    const goToUser = (id) => {
        setModalOpen(false)
        props.history.push(`/profile/${id}`)      
    } 

    const startChat = () => {
        actions.startChat({id:user._id, func: goToMsg})
    }

    const goToMsg = () => {
        props.history.push(`/messages`)
    }

    
    return(
        <div>
            {user && account ? 
            <div>
            <div className="profile-wrapper">
            <div className="profile-header-wrapper">
                <div className="profile-header-back">
                    <div onClick={()=>window.history.back()} className="header-back-wrapper">
                        <ICON_ARROWBACK/>
                    </div>
                </div>
                <div className="profile-header-content">
                    <div className="profile-header-name">
                            {account.username === userParam ? account.username : user.username}
                    </div>
                    {/* <div className="profile-header-tweets">
                            82 Tweets
                    </div> */}
                </div>
            </div>
            <div className="profile-banner-wrapper">
                <img src={banner.length > 0 && saved ? banner : user.banner} alt=""/>
            </div>
            <div className="profile-details-wrapper">
                <div className="profile-options">
                    <div className="profile-image-wrapper">
                        <img src={avatar.length > 0 && saved ? avatar : user.profileImg} alt=""/>
                    </div>
                    {account.username === userParam? null : <span onClick={()=>startChat()} className="new-msg"><ICON_NEWMSG/></span>}
                    <div onClick={(e)=>account.username === userParam ? toggleModal('edit'): followUser(e,user._id)} 
                     className={account.following.includes(user._id) ? 'unfollow-switch profile-edit-button' : 'profile-edit-button'}>
                        {account.username === userParam?
                        <span>Edit profile</span> :
                        <span><span>{ account.following.includes(user._id) ? 'Following' : 'Follow'}</span></span>}
                    </div>
                </div>
                <div className="profile-details-box">
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-username">@{account.username === userParam ? account.username : user.username}</div>
                    <div className="profile-bio">
                        {user.description}
                    </div>
                    <div className="profile-info-box">
                        {user.location.length>0 && 
                        <ICON_MARKDOWN/>}
                        <div className={user.location.length>0 ? "profile-location" : ''}> {user.location} </div>
                        <ICON_DATE/>
                        <div className="profile-date"> Joined {moment(user.createdAt).format("MMMM YYYY")} </div>
                    </div>
                </div>
                <div className="profile-social-box">
                        <div onClick={()=>toggleModal('members','Following')}>
                            <p className="follow-num"> {user.following.length} </p>
                            <p className="follow-text"> Following </p>
                        </div>
                        <div onClick={()=>toggleModal('members', 'Followers')}>
                            <p className="follow-num"> {user.followers.length} </p>
                            <p className="follow-text"> Followers </p>
                        </div>
                </div>
            </div>
            <div className="profile-nav-menu">
                <div key={'tweets'} onClick={()=>changeTab('Tweets')} className={activeTab ==='Tweets' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Tweets
                </div>
                <div key={'replies'} onClick={()=>changeTab('Tweets&Replies')} className={activeTab ==='Tweets&Replies' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Tweets & replies
                </div>
                <div key={'media'} onClick={()=>changeTab('Media')} className={activeTab ==='Media' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Media
                </div>
                <div key={'likes'} onClick={()=>changeTab('Likes')} className={activeTab ==='Likes' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Likes
                </div>
            </div>
            {activeTab === 'Tweets' ? 
            user.tweets.map(t=>{
                if(!t.parent)
                return <TweetCard retweet={t.retweet} username={t.username} name={t.name} key={'tweets'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
            }): activeTab === 'Tweets&Replies' ? 
            user.tweets.map(t=>{
                if(t.parent)
                return <TweetCard retweet={t.retweet} username={t.username} name={t.name} key={'replies'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
             }) :
            activeTab === 'Likes' ? 
            user.likes.map(t=>{
                return <TweetCard retweet={t.retweet} username={t.username} name={t.name} key={'likes'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
            }): activeTab === 'Media' ? 
            user.tweets.map(t=>{
                if(t.images[0])
                return <TweetCard retweet={t.retweet} username={t.username} name={t.name} key={'tweets'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
             }): null}
            </div>
            <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
                <div onClick={(e)=>handleModalClick(e)} className="modal-content">
                    <div className={memOpen ? "modal-header no-b-border" : "modal-header"}>
                        <div className="modal-closeIcon">
                            <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                                <ICON_CLOSE />
                            </div>
                        </div>
                        <p className="modal-title">{memOpen ? null : 'Edit Profile'}</p>
                        {memOpen ? null : 
                        <div className="save-modal-wrapper">
                            <div onClick={editProfile} className="save-modal-btn">
                                Save
                            </div>
                        </div>}
                    </div>
                    {memOpen ? <div className="modal-body">
                    <div className="explore-nav-menu">
                        <div onClick={()=>setTab('Followers')} className={tab =='Followers' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                            Followers 
                        </div>
                        <div onClick={()=>setTab('Following')} className={tab =='Following' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                            Following
                        </div>
                    </div>
                    <div className="modal-scroll">
                    {tab === 'Followers' ? 
                     state.followers.map(f=>{
                         return <div onClick={()=>goToUser(f.username)} key={f._id} className="search-result-wapper">
                         <Link to={`/profile/${f.username}`} className="search-userPic-wrapper">
                                 <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={f.profileImg}/>
                         </Link>
                         <div className="search-user-details">
                             <div className="search-user-warp">
                                 <div className="search-user-info">
                                     <div className="search-user-name">{f.name}</div>
                                     <div className="search-user-username">@{f.username}</div>
                                 </div>
                                 {f._id === account._id ? null :
                                 <div onClick={(e)=>followUser(e,f._id)} className={account.following.includes(f._id) ? "follow-btn-wrap unfollow-switch":"follow-btn-wrap"}>
                                     <span><span>{account.following.includes(f._id) ? 'Following' : 'Follow'}</span></span>
                                 </div>}
                             </div>
                             <div className="search-user-bio">
                                 {f.description.substring(0,160)}
                             </div>
                         </div>
                     </div>
                     }) 
                     :
                     state.following.map(f=>{
                         return <div onClick={()=>goToUser(f.username)} key={f._id} className="search-result-wapper">
                         <Link to={`/profile/${f.username}`} className="search-userPic-wrapper">
                                 <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={f.profileImg}/>
                         </Link>
                         <div className="search-user-details">
                             <div className="search-user-warp">
                                 <div className="search-user-info">
                                     <div className="search-user-name">{f.name}</div>
                                     <div className="search-user-username">@{f.username}</div>
                                 </div>
                                 {f._id === account._id ? null :
                                 <div onClick={(e)=>followUser(e,f._id)} className={account.following.includes(f._id) ? "follow-btn-wrap unfollow-switch":"follow-btn-wrap"}>
                                     <span><span>{account.following.includes(f._id) ? 'Following' : 'Follow'}</span></span>
                                 </div>}
                             </div>
                             <div className="search-user-bio">
                                 {f.description.substring(0,160)}
                             </div>
                         </div>
                     </div>
                     })
                     }
                     </div>
                    </div> : 
                    <div className="modal-body">
                        <div className="modal-banner">
                            <img src={loadingBanner? "https://i.imgur.com/62jOROc.gif" : banner.length > 0 ? banner : user.banner} alt="modal-banner" />
                            <div>
                                <ICON_UPLOAD/>
                                <input onChange={()=>changeBanner()} title=" " id="banner" style={{opacity:'0'}} type="file"/>
                            </div>
                        </div>
                        <div className="modal-profile-pic">
                            <div className="modal-back-pic">
                                <img src={loadingAvatar? "https://i.imgur.com/62jOROc.gif" : avatar.length > 0 ? avatar : user.profileImg} alt="profile" />
                                <div>
                                    <ICON_UPLOAD/>
                                    <input onChange={()=>changeAvatar()} title=" " id="avatar" style={{opacity:'0'}} type="file"/>
                                </div>
                            </div>
                        </div>
                        <form className="edit-form">
                            <div className="edit-input-wrap">
                                <div className="edit-input-content">
                                    <label>Name</label>
                                    <input defaultValue={user.name} onChange={(e)=>setName(e.target.value)} type="text" name="name" className="edit-input"/>
                                </div>
                            </div>
                            <div className="edit-input-wrap">
                                <div className="edit-input-content">
                                    <label>Bio</label>
                                    <input defaultValue={user.description} onChange={(e)=>setBio(e.target.value)} type="text" name="bio" className="edit-input"/>
                                </div>
                            </div>
                            <div className="edit-input-wrap">
                                <div className="edit-input-content">
                                    <label>Location</label>
                                    <input defaultValue={user.location} onChange={(e)=>setLocation(e.target.value)} type="text" name="location" className="edit-input"/>
                                </div>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
            </div>: <div className="profile-wrapper"><Loader/> </div> }
        </div>
    )
}

export default withRouter(Profile)