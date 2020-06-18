import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'
import moment from 'moment'
import TweetCard from '../TweetCard'

const Bookmarks = (props) => {

const { state, actions } = useContext(StoreContext)

const {account, bookmarks} = state
// const userParam = props.match.params.username

useEffect(() => {
    window.scrollTo(0, 0)
    actions.getBookmarks()
}, [])


return(
    <div className="bookmarks-wrapper">
        {console.log(state)}
        <div className="bookmarks-header-wrapper">
            <div className="bookmarks-header-content">
                <div className="bookmarks-header-name">
                    Bookmarks
                </div>
                <div className="bookmarks-header-tweets">
                    @{account && account.username}
                </div>
            </div>
        </div>
        {/* add loader for bookmarks when empty using dispatch */}
        {bookmarks.map(t=>{
            console.log(t)
            return <TweetCard parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
        })}
    </div>
    )
}

export default withRouter(Bookmarks)