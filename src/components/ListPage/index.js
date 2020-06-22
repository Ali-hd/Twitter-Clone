import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import {  withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'
import TweetCard from '../TweetCard'
import {API_URL} from '../../config'
import axios from 'axios'
import {ICON_ARROWBACK, ICON_UPLOAD, ICON_CLOSE,ICON_SEARCH } from '../../Icons'

const ListPage = (props) => {

const { state, actions } = useContext(StoreContext)
const [modalOpen, setModalOpen] = useState(false)

const [editName, setName] = useState('')
const [editDescription, setDescription] = useState('')
const [banner, setBanner] = useState('')
const [saved, setSaved] = useState(false)
const [memOpen, setMemOpen] = useState(false)
const [tab, setTab] = useState('Members')

const {account, list, listTweets, resultUsers} = state

const editList = () => {
    let values = {
        id: props.match.params.id,
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
    if(param === 'members'){setMemOpen(true)}
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
    actions.getList(props.match.params.id)
}, [])

const deleteList = () => {
    actions.deleteList(props.match.params.id)
    props.history.push('/lists')
}

const goToUser = (id) => {
    props.history.push(`/profile/${id}`)      
} 

const searchOnChange = (param) => {
    if(param.length>0){
        actions.searchUsers({username: param})
    }
}

const addToList = (e,username,userId, profileImg,name) => {
    e.stopPropagation()
    let values = {id: props.match.params.id, username, userId, profileImg,name}
    actions.addToList(values)
}

return(
    <div>
        {console.log(state)}
        {list ? 
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
                    {list.name}
                </div>
                <div className="bookmarks-header-tweets">
                    @{list.user.username}
                </div>
            </div>
        </div>
        <div className="listp-banner">
            <img src={saved && banner.length>0 ? banner : list.banner.length>0? list.banner : "https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small" }  alt="list-banner"/>
        </div>
        <div className="listp-details-wrap">
            <div className="bookmarks-header-name">{saved && editName.length>0 ? editName : list.name}</div>
            {list.description.length> 0 || saved ? <div className="list-description">{saved && editDescription.length>0 ? editDescription : list.description }</div> : null }
            <div className="list-owner-wrap">
                <h4>{list.user.name}</h4>
                <div>@{list.user.username}</div>
            </div>
            <div onClick={()=>toggleModal('members')} className="list-owner-wrap Members">
                    <h4>{list.users.length}</h4>
                    <div>Members</div>
             </div>
             <div onClick={()=>toggleModal('edit')} className="listp-edit-btn">
                    Edit List
             </div>
        </div>
        {listTweets && listTweets.map(t=>{
            return <TweetCard retweet={t.retweet} username={t.username} name={t.name} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
        })}
    </div>
    <div onClick={()=>toggleModal()} style={{display: modalOpen ? 'block' : 'none'}} className="modal-edit">
            <div style={{height: '572px'}} onClick={(e)=>handleModalClick(e)} className="modal-content">
                <div className={memOpen ? "modal-header no-b-border" : "modal-header"}>
                    <div className="modal-closeIcon">
                        <div onClick={()=>toggleModal()} className="modal-closeIcon-wrap">
                            <ICON_CLOSE />
                        </div>
                    </div>
                    <p className="modal-title">{memOpen ? 'List members' : 'Edit List'}</p>
                    {memOpen ? null : <div className="save-modal-wrapper">
                        <div onClick={editList} className="save-modal-btn">
                            Done
                        </div>
                    </div>}
                </div>
                {memOpen ? 
                <div>
                    <div className="explore-nav-menu">
                    <div onClick={()=>setTab('Members')} className={tab =='Members' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Members ({list.users.length})
                    </div>
                    <div onClick={()=>setTab('Search')} className={tab =='Search' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Search
                    </div>
                </div>
                {tab === 'Members' ? 
                list.users.map(u=>{
                return <div onClick={()=>goToUser(u.username)} key={u._id} className="search-result-wapper">
                    <div className="search-userPic-wrapper">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={u.profileImg}/>
                    </div>
                    <div className="search-user-details">
                        <div className="search-user-warp">
                            <div className="search-user-info">
                                <div className="search-user-name">{u.name}</div>
                                <div className="search-user-username">@{u.username}</div>
                            </div>
                            {u._id === account._id ? null :
                            <div onClick={(e)=>addToList(e,u.username,u._id,u.profileImg,u.name)} className={list.users.some(x => x._id === u._id) ? "follow-btn-wrap Remove-switch":"follow-btn-wrap"}>
                                <span><span>{list.users.some(x => x._id === u._id) ? 'Remove' : 'Add'}</span></span>
                            </div>}
                        </div>
                        <div className="search-user-bio">
                            {/* {account.description.substring(0,160)} */}
                        </div>
                    </div>
                </div>
                })
                 :
                <div>
                <div style={{borderRadius:'0'}} className="explore-search-wrapper">
                    <div className="explore-search-icon">
                        <ICON_SEARCH styles={{fill:'#1da1f2'}}/>
                    </div>
                    <div className="explore-search-input">
                        <input onChange={(e)=>searchOnChange(e.target.value)} placeholder="Search People" type="text" name="search"/>
                    </div>
                </div>
                {resultUsers.length ? resultUsers.map(u=>{
                    return <div onClick={()=>goToUser(u.username)} key={u._id} className="search-result-wapper">
                    <div className="search-userPic-wrapper">
                            <img style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={u.profileImg}/>
                    </div>
                    <div className="search-user-details">
                        <div className="search-user-warp">
                            <div className="search-user-info">
                                <div className="search-user-name">{u.name}</div>
                                <div className="search-user-username">@{u.username}</div>
                            </div>
                            {u._id === account._id ? null :
                            <div onClick={(e)=>addToList(e,u.username,u._id, u.profileImg,u.name)} className={list.users.some(x => x._id === u._id) ? "follow-btn-wrap Remove-switch":"follow-btn-wrap"}>
                                <span><span>{list.users.some(x => x._id === u._id) ? 'Remove' : 'Add'}</span></span>
                            </div>}
                        </div>
                        <div className="search-user-bio">
                            {u.description.substring(0,160)}
                        </div>
                    </div>
                </div>
                }) : null}
                </div>}
                </div>
                :
                <div className="modal-body">
                    <div className="modal-banner">
                        {list.banner.length>0 || banner.length> 0 ?<img src={banner.length>0 ? banner : list.banner} alt="modal-banner" />: null}
                        <div>
                            <ICON_UPLOAD/>
                            <input onChange={()=>changeBanner()} title=" " id="banner" style={{opacity:'0'}} type="file"/>
                        </div>
                    </div>
                    <form className="edit-form">
                        <div className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Name</label>
                                <input defaultValue={list.name} onChange={(e)=>setName(e.target.value)} type="text" name="name" className="edit-input"/>
                            </div>
                        </div>
                        <div style={{marginTop:'30px'}} className="edit-input-wrap">
                            <div className="edit-input-content">
                                <label>Description</label>
                                <input defaultValue={list.description} onChange={(e)=>setDescription(e.target.value)} type="text" name="description" className="edit-input"/>
                            </div>
                        </div>
                    </form>
                    <div onClick={deleteList} className="modal-delete-box"> 
                        Delete List
                    </div>
                </div>}
            </div>
        </div>
            
    </div> : <div className="bookmarks-wrapper"><Loader/> </div> }
    </div>
    )
}

export default withRouter(ListPage)