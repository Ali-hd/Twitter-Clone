import React , { useEffect, useState, useContext } from 'react'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { StoreContext } from '../../store/store'
import Loader from '../Loader'


const Feed = (props) => {

const { state, actions } = useContext(StoreContext)

const {account, trends} = state
// const userParam = props.match.params.username

useEffect(() => {
    actions.getTrend()
}, [])


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
            <div className="feed-more">
                Show more
            </div>
        </div>

        <div className="feed-trending-card">
            <h3 className="feed-card-header">Who to follow</h3>
            <div className="feed-card-trend">
                <div>Politics · Trending</div>
                <div>#goopower</div>
                <div>30K Tweets</div>
            </div>
            <div className="feed-card-trend">
                <div>Politics · Trending</div>
                <div>#goopower</div>
                <div>30K Tweets</div>
            </div>
            <div style={{borderBottom:'none'}} className="feed-card-trend">
                <div>Politics · Trending</div>
                <div>#goopower</div>
                <div>30K Tweets</div>
            </div>
            <div className="feed-more">
                {/* Show more */}
            </div>
        </div>
    </div>
    )
}

export default withRouter(Feed)