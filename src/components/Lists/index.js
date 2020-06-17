import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'
import {API_URL} from '../../config'
import axios from 'axios'
import {ICON_ARROWBACK, ICON_CLOSE, ICON_NEWLIST, ICON_UPLOAD} from '../../Icons'

const Lists = (props) => {

const { state, actions } = useContext(StoreContext)
const [modalOpen, setModalOpen] = useState(false)
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [banner, setBanner] = useState('')

const createList = () => {
    let values = { name, description, banner }
    actions.createList(values)
    toggleModal()
}

const toggleModal = () => {
    setModalOpen(!modalOpen)
}

const handleModalClick = (e) => {
    e.stopPropagation()
}

const uploadImage = (file) => {
    let bodyFormData = new FormData()
    bodyFormData.append('image', file)
    axios.post(`${API_URL}/tweet/upload`, bodyFormData, { headers: { Authorization: `Bearer ${localStorage.getItem('Twittertoken')}`}})
        .then(res=>{setBanner(res.data.imageUrl)})
        .catch(err=>alert('error uploading image'))
}

const changeBanner = () => {
    let file = document.getElementById('banner').files[0];
    uploadImage(file)
}

const {account, lists} = state

useEffect(() => {
    window.scrollTo(0, 0)
    actions.getLists()
}, [])


return(
    <div>
    <div className="bookmarks-wrapper">
            <div className="bookmarks-header-wrapper">
                <div className="profile-header-back">
                        <div onClick={()=>window.history.back()} className="header-back-wrapper">
                            <ICON_ARROWBACK/>
                        </div>
                </div>
                <div className="bookmarks-header-content">
                    <div className="bookmarks-header-name">
                        Your Lists
                    </div>
                    <div className="bookmarks-header-tweets">
                        @{account && account.username}
                    </div>
                </div>
                <div onClick={()=>toggleModal()} className="newlist-icon-wrap">
                <span>new list</span><ICON_NEWLIST/>
                </div>
            </div>
            {lists.map(l=>{
                return <Link key={l._id} to={`/lists/${l._id}`} className="list-card-wrapper">
                <div className="list-img-wrap">
                    <img src={l.banner} alt="list"/>
                </div>
                <div className="list-content-wrap">
                    <h4>{l.name}</h4>
                    <div className="list-details-wrap">
                        <h5>{account && account.name}</h5>
                        <div>@{account && account.username}</div>
                    </div>
                </div>
            </Link>
            })}
            
            {/* add loader for bookmarks when empty using dispatch */}
            {/* {bookmarks.map(t=>{
                console.log(t)
                return <TweetCard key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
            })} */}
        </div>
        <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            <div style={{height:'480px'}} onClick={(e)=>handleModalClick(e)} className="modal-content">
                <div className="modal-header">
                    <div className="modal-closeIcon">
                        <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                            <ICON_CLOSE />
                        </div>
                    </div>
                    <p className="modal-title">Create a new List</p>
                    <div className="save-modal-wrapper">
                        <div onClick={createList} className="save-modal-btn">
                            Create
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-banner">
                        {banner.length>0 && <img src={banner} alt="list-banner" />}
                        <div>
                            <ICON_UPLOAD/>
                            <input onChange={()=>changeBanner()} title=" " id="banner" style={{opacity:'0'}} type="file"/>
                        </div>
                    </div>
                    <form className="edit-form">
                        <div className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Name</label>
                                <input onChange={(e)=>setName(e.target.value)} type="text" name="name" className="edit-input"/>
                            </div>
                        </div>
                        <div style={{marginTop:'30px'}} className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Description</label>
                                <input onChange={(e)=>setDescription(e.target.value)} type="text" name="description" className="edit-input"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    )
}

export default withRouter(Lists)