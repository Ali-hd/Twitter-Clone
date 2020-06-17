import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'
import moment from 'moment'
import TweetCard from '../TweetCard'
import {API_URL} from '../../config'
import axios from 'axios'
import {ICON_ARROWBACK, ICON_UPLOAD, ICON_CLOSE, } from '../../Icons'

const ListPage = (props) => {

const { state, actions } = useContext(StoreContext)
const [modalOpen, setModalOpen] = useState(false)
const [editName, setName] = useState('')
const [editDescription, setDescription] = useState('')
const [banner, setBanner] = useState('')
const [saved, setSaved] = useState(false)
const {account} = state

const editList = () => {
    let values = {
        id: 11222,
        name: editName,
        description: editDescription,
        banner: banner
    }
    actions.editList(values)
    setSaved(true)
    toggleModal()
}

const toggleModal = (param) => {
    if(param === 'edit'){setSaved(false)}
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

useEffect(() => {
    window.scrollTo(0, 0)
    let list = state.lists.find(x=>{
       return x._id === props.match.params.id
    })
    console.log(list)
    // actions.getBookmarks()
}, [])

const deleteList = () => {

}

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
                    News - Saudi Arabia
                </div>
                <div className="bookmarks-header-tweets">
                    @{account && account.username}
                </div>
            </div>
        </div>
        <div className="listp-banner">
            <img src="https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small" alt="list-banner"/>
        </div>
        <div className="listp-details-wrap">
            <div className="bookmarks-header-name">News - Saudi Arabia</div>
            <div className="list-description">I am a list!</div>
            <div className="list-owner-wrap">
                <h4>Ali HD</h4>
                <div>@AliMKHD</div>
            </div>
            <div className="list-owner-wrap Members">
                    <h4>5</h4>
                    <div>Members</div>
             </div>
             <div onClick={()=>toggleModal('edit')} className="listp-edit-btn">
                    Edit List
             </div>
        </div>
    </div>
    <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            <div style={{height: '572px'}} onClick={(e)=>handleModalClick(e)} className="modal-content">
                <div className="modal-header">
                    <div className="modal-closeIcon">
                        <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                            <ICON_CLOSE />
                        </div>
                    </div>
                    <p className="modal-title">Edit List</p>
                    <div className="save-modal-wrapper">
                        <div onClick={editList} className="save-modal-btn">
                            Done
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-banner">
                        <img src={'https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small'} alt="modal-banner" />
                        <div>
                            <ICON_UPLOAD/>
                            <input onChange={()=>changeBanner()} title=" " id="banner" style={{opacity:'0'}} type="file"/>
                        </div>
                    </div>
                    <form className="edit-form">
                        <div className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Name</label>
                                <input defaultValue={'cool name'} onChange={(e)=>setName(e.target.value)} type="text" name="name" className="edit-input"/>
                            </div>
                        </div>
                        <div style={{marginTop:'30px'}} className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Description</label>
                                <input defaultValue={'im a list'} onChange={(e)=>setDescription(e.target.value)} type="text" name="description" className="edit-input"/>
                            </div>
                        </div>
                    </form>
                    <div onClick={deleteList} className="modal-delete-box"> 
                        Delete List
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default withRouter(ListPage)