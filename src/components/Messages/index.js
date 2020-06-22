import React, {useEffect, useContext} from 'react'
import { StoreContext } from '../../store/store'
import {withRouter} from 'react-router-dom'
import './style.scss'
import moment from 'moment'

const Messages = (props) => {
    const { state, actions } = useContext(StoreContext)
    const {account} = state

    useEffect(() => {
        actions.getConversations()
        document.getElementsByTagName("body")[0].style.cssText = "position:fixed; overflow-y: scroll;"
    },[])
    
    return(
        <div className="messages-wrapper">
            <div className="messages-header-wrapper">
                Messages
            </div>
            <div className="messages-body">
                <div className="recent-messages-wrapper">
                {state.conversations && state.conversations.conversations.length > 0 ? state.conversations.conversations.map(con=>{
                    return <div key={con._id} onClick={()=>props.history.push(`/messages/${con._id}`)} className="message-box">
                                <div className="message-avatar">
                                    <img width="100%" height="100" src="https://i.imgur.com/iV7Sdgm.jpg" alt="" />
                                </div>
                                {account && 
                                <div className="message-details">
                                    <div className="message-info">
                                        {con.participants[0].username !== account.username ?  
                                        <div>{(con.participants[0].name).slice(0,10)}<span>@{con.participants[0].username}</span></div> :
                                        <div>{(con.participants[1].name).slice(0,10)}<span>@{con.participants[1].username}</span></div>}
                                        <span>{moment(con.updatedAt).format("MMM D, YYYY")}</span>
                                    </div>
                                    <div>
                                        {con.messages.length>0 && con.messages[0].content.slice(0,15)}
                                    </div>
                                </div>}
                            </div>
                        }): <h5 style={{ textAlign: 'center', margin: '10% auto', width:'100%' }}>You have no messages</h5>} 
                </div>
            </div>
        </div>
    )
}

export default withRouter(Messages)