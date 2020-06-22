import React , { useEffect, useContext } from 'react'
import './style.scss'
import {  withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'


const Feed = (props) => {

const { state, actions } = useContext(StoreContext)

const {account, trends, suggestions} = state
// const userParam = props.match.params.username

useEffect(() => {
    actions.getTrend()
    actions.whoToFollow()
}, [])

const goToUser = (id) => {
    props.history.push(`/profile/${id}`)      
} 

const followUser = (e, id) => {
    e.stopPropagation()
    actions.followUser(id)
}


return(
    <div className="feed-wrapper">
        <div className="feed-trending-card">
            <h3 className="feed-card-header">Trending</h3>
            {trends.length>0 ? trends.slice(0,3).map((t,i)=>{
                return <div onClick={()=>props.history.push('/explore')} key={t._id} className="feed-card-trend">
                <div>{i+1} · Trending</div>
                <div>{t.content}</div>
                <div>{t.count} Tweets</div>
            </div>
            }) : <Loader/>}
            <div onClick={()=>props.history.push(`/explore`)} className="feed-more">
                Show more
            </div>
        </div>
        {account ? 
        <div className="feed-trending-card">
            <h3 className="feed-card-header">Who to follow</h3>
            {suggestions.length > 0  ? 
            suggestions.map(s=>{
                if(s.username !== account.username) {
                    return <div key={s._id} className="feed-card-trend">
                    <div onClick={()=>goToUser(s.username)} className="sugg-result-wapper">
                        <div className="search-userPic-wrapper">
                                <img alt="" style={{borderRadius:'50%', minWidth:'49px'}} width="100%" height="49px" src={s.profileImg}/>
                        </div>
                        <div className="search-user-details">
                            <div className="search-user-warp">
                                <div className="search-user-info">
                                    <div className="search-user-name">{s.name}</div>
                                    <div className="search-user-username">@{s.username}</div>
                                </div>
                                <div onClick={(e)=>followUser(e, s._id)} className={account.following.includes(s._id) ?"follow-btn-wrap unfollow-switch":"follow-btn-wrap"}>
                                    <span style={{lineHeight: '0.8'}}><span>{ account.following.includes(s._id) ? 'Following' : 'Follow'}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            })
             : <Loader/>}
            <div className="feed-more">
                {/* Show more */}
            </div>
        </div> : null }
    </div>
    )
}

export default withRouter(Feed)