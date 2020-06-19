import React, { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'
import { Link, withRouter } from 'react-router-dom'
import { ICON_LOGO, ICON_SEARCH, ICON_ARROWBACK } from '../../Icons'
import Loader from '../Loader'
import TweetCard from '../TweetCard'


const Explore = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {account, trends, result, tagTweets} = state
    const [tab, setTab] = useState('Trends')
    const [trendOpen, setTrendOpen] = useState(false)


    const searchOnChange = (param) => {
        if(tab !== 'Search'){setTab('Search')}
        if(param.length>0){
            actions.search({username: param})
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        actions.getTrend()
        // if(props.history.location.search.length>0){
        //     goToTrend(props.history.location.search.substring(1))
            
        // }
    }, [])

    const followUser = (e, id) => {
        e.stopPropagation()
        actions.followUser(id)
    }

    const goToUser = (id) => {
        props.history.push(`/profile/${id}`)      
    } 

    const goToTrend = (hash) => {
        setTrendOpen(true)
        let hashtag = hash.substring(1)
        actions.getTrendTweets(hashtag)
    }
    

    return(
        <div className="explore-wrapper">
            <div className={trendOpen ? "explore-header header-border" : "explore-header"}>
                {trendOpen && 
                <div className="explore-header-back">
                    <div onClick={()=>setTrendOpen(false)} className="explore-back-wrapper">
                        <ICON_ARROWBACK/>
                    </div>
                </div>}
                <div className="explore-search-wrapper">
                    <div className="explore-search-icon">
                        <ICON_SEARCH/>
                    </div>
                    <div className="explore-search-input">
                        <input onChange={(e)=>searchOnChange(e.target.value)} placeholder="Search for hashtags or people" type="text" name="search"/>
                    </div>
                </div>
            </div>
            {!trendOpen ?
            <div>
                <div className="explore-nav-menu">
                    <div onClick={()=>setTab('Trends')} className={tab =='Trends' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Trending 
                    </div>
                    <div onClick={()=>setTab('Search')} className={tab =='Search' ? `explore-nav-item activeTab` : `explore-nav-item`}>
                        Search
                    </div>
                </div>
                {tab === 'Trends' ? 
                    trends.length>0 ? 
                    trends.map((t,i)=>{
                    return  <div onClick={()=>goToTrend(t.content)} key={t._id} className="trending-card-wrapper">
                                <div className="trending-card-header">{i+1} <span>·</span> Trending</div>
                                <div className="trending-card-content"> {t.content} </div>
                                <div className="trending-card-count"> {t.count} Tweets </div>
                            </div>
                    }) : <Loader/>
                : 
                result.length ? result.map(u=>{
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
                            <div onClick={(e)=>followUser(e, u._id)} className={account.following.includes(u._id) ?"follow-btn-wrap unfollow-switch":"follow-btn-wrap"}>
                                <span><span>{ account.following.includes(u._id) ? 'Following' : 'Follow'}</span></span>
                            </div>}
                        </div>
                        <div className="search-user-bio">
                            {u.description.substring(0,160)}
                        </div>
                    </div>
                </div>
                }) : <div className="try-searching">
                        Nothing to see here ..
                        <div/>
                    Try searching for people, usernames, or keywords

                </div>
                }
            </div> : <div>
            {tagTweets.length>0 && tagTweets.map(t=>{
            return <TweetCard parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
                })}
            </div>}
        </div>
    )
}

export default withRouter(Explore)