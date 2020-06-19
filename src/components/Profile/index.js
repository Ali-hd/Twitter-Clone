import React , { useEffect, useState, useContext, useRef } from 'react'
import './style.scss'
import { ICON_ARROWBACK, ICON_MARKDOWN, ICON_DATE, ICON_CLOSE, ICON_UPLOAD } from '../../Icons'
import { Link, withRouter } from 'react-router-dom'
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
    
    const {account, user} = state
    const userParam = props.match.params.username

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
    // const mounted = useRef()

    useEffect(() => {
        console.log('mounted')
        window.scrollTo(0, 0)
        actions.getUser(props.match.params.username)
    }, [])

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.overflow = modalOpen? "hidden" : "visible";
      }, [modalOpen])

    const toggleModal = (param) => {
        if(param === 'edit'){setSaved(false)}
        setModalOpen(!modalOpen)
    }

    const handleModalClick = (e) => {
        e.stopPropagation()
    }

    const followUser = () => {
        actions.followUser(user._id)
    }

    const uploadImage = (file,type) => {
        let bodyFormData = new FormData()
        bodyFormData.append('image', file)
        axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
            .then(res=>{ type === 'banner' ? setBanner(res.data.imageUrl) : setAvatar(res.data.imageUrl)})
            .catch(err=>alert('error uploading image'))
    }

    const changeBanner = () => {
        let file = document.getElementById('banner').files[0];
        uploadImage(file, 'banner')
    }
    const changeAvatar = () => {
        let file = document.getElementById('avatar').files[0];
        uploadImage(file, 'avatar')
    }

    
    return(
        <div>
            {console.log(state)}
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
                    <div className="profile-header-tweets">
                            82 Tweets
                    </div>
                </div>
            </div>
            <div className="profile-banner-wrapper">
                <img src={banner.length > 0 && saved ? banner : user.banner}/>
            </div>
            <div className="profile-details-wrapper">
                <div className="profile-options">
                    <div className="profile-image-wrapper">
                        <img src={avatar.length > 0 && saved ? avatar : user.profileImg}/>
                    </div>
                    <div onClick={()=>account.username === userParam ? toggleModal('edit'): followUser( user._id)} 
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
                        <div className="follow-num"> {user.following.length} </div>
                        <div className="follow-text"> Following </div>
                        <div className="follow-num"> {user.followers.length} </div>
                        <div className="follow-text"> Followers </div>
                </div>
            </div>
            <div className="profile-nav-menu">
                <div key={'tweets'} onClick={()=>changeTab('Tweets')} className={activeTab =='Tweets' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Tweets
                </div>
                <div key={'replies'} onClick={()=>changeTab('Tweets&Replies')} className={activeTab =='Tweets&Replies' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Tweets & replies
                </div>
                <div key={'media'} onClick={()=>changeTab('Media')} className={activeTab =='Media' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Media
                </div>
                <div key={'likes'} onClick={()=>changeTab('Likes')} className={activeTab =='Likes' ? `profile-nav-item activeTab` : `profile-nav-item`}>
                    Likes
                </div>
            </div>
            {activeTab === 'Tweets' ? 
            user.tweets.map(t=>{
                if(!t.parent)
                return <TweetCard key={'tweets'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
            }): activeTab === 'Tweets&Replies' ? 
            user.tweets.map(t=>{
                if(t.parent)
                return <TweetCard key={'replies'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
             }) :
            activeTab === 'Likes' ? 
            user.likes.map(t=>{
                return <TweetCard key={'likes'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
            }): activeTab === 'Media' ? 
            user.tweets.map(t=>{
                if(t.images[0])
                return <TweetCard key={'tweets'} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description}
                images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
             }):null}
            </div>
            <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
                <div onClick={(e)=>handleModalClick(e)} className="modal-content">
                    <div className="modal-header">
                        <div className="modal-closeIcon">
                            <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                                <ICON_CLOSE />
                            </div>
                        </div>
                        <p className="modal-title">Edit Profile</p>
                        <div className="save-modal-wrapper">
                            <div onClick={editProfile} className="save-modal-btn">
                                Save
                            </div>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="modal-banner">
                            <img src={banner.length > 0 ? banner : user.banner} alt="modal-banner" />
                            <div>
                                <ICON_UPLOAD/>
                                <input onChange={()=>changeBanner()} title=" " id="banner" style={{opacity:'0'}} type="file"/>
                            </div>
                        </div>
                        <div className="modal-profile-pic">
                            <div className="modal-back-pic">
                                <img src={avatar.length > 0 ? avatar : user.profileImg} alt="profile" />
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
                    </div>
                </div>
            </div>
            </div>: <div className="profile-wrapper"><Loader/> </div> }
        </div>
    )
}

export default withRouter(Profile)