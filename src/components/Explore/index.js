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
            actions.search({description: param})
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
                result.length ? result.map(r=>{
                    return <TweetCard retweet={r.retweet} username={r.username} name={r.name} username={r.username} name={r.name} parent={r.parent} key={r._id} id={r._id} user={r.user} createdAt={r.createdAt} description={r.description} images={r.images} replies={r.replies} retweets={r.retweets} likes={r.likes} />
                }) : <div className="try-searching">
                        Nothing to see here ..
                        <div/>
                    Try searching for people, usernames, or keywords

                </div>
                }
            </div> : <div>
            {tagTweets.length>0 && tagTweets.map(t=>{
            return <TweetCard retweet={t.retweet} username={t.username} name={t.name} parent={t.parent} key={t._id} id={t._id} user={t.user} createdAt={t.createdAt} description={t.description} images={t.images} replies={t.replies} retweets={t.retweets} likes={t.likes}  />
                })}
            </div>}
        </div>
    )
}

export default withRouter(Explore)