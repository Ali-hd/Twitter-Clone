import React, {useEffect, useContext} from 'react'
import { StoreContext } from '../../store/store'
import {withRouter} from 'react-router-dom'
import './style.scss'
import moment from 'moment'
import {useMediaQuery} from 'react-responsive'
import Chat from '../ChatPage'

const Messages = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {account, conversations} = state
    const path = props.history.location.pathname

    useEffect(() => {
        actions.getConversations()
        document.getElementsByTagName("body")[0].style.cssText = "position:fixed; overflow-y: scroll;"
    },[path])

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 888px)' })
    return(
        <React.Fragment>
        {isTabletOrMobile && path !== '/messages' && account ? 
        <Chat res={true}/> :
        <div className="messages-wrapper">
            <div className="messages-header-wrapper">
                Messages
            </div>
            <div className="messages-body">
                <div className="recent-messages-wrapper">
                {account && conversations && conversations.conversations.length>0 ? conversations.conversations.map(con=>{
                    return <div style={{borderRight: path.slice(10) === con._id ? '2px solid #1da1f2' : null}} key={con._id} onClick={()=>props.history.push(`/messages/${con._id}`)} className="message-box">
                                <div className="message-avatar">
                                    <img width="100%" height="100" src={con.participants[0].username !== account.username ?
                                         con.participants[0].profileImg : con.participants[1].profileImg} alt="" />
                                </div>
                                {account && 
                                <div className="message-details">
                                    <div className="message-info">
                                        {con.participants[0].username !== account.username ?  
                                        <div>{con.participants[0].name}<span>@{con.participants[0].username}</span></div> :
                                        <div>{con.participants[1].name}<span>@{con.participants[1].username}</span></div>}
                                        <span>{moment(con.updatedAt).format("MMM D, YYYY")}</span>
                                    </div>
                                    <div>
                                        {con.messages.length>0 && con.messages[con.messages.length - 1].content.slice(0,15)}
                                    </div>
                                </div>}
                            </div>
                        }): <h5 style={{ textAlign: 'center', margin: '10% auto', width:'100%' }}>You have no messages</h5>} 
                </div>
            </div>
        </div>}
        </React.Fragment>
    )
}

export default withRouter(Messages)