import React, {useEffect} from 'react'
import './style.scss'

const ChatPage = () => {

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.cssText = "position:fixed; overflow-y: scroll;"
    },[])
    
    return(
        <div className="chat-wrapper">
            <div className="chat-header-wrapper">
                Ali hd
            </div>
            {/* <div className="messages-body">
                <div className="recent-messages-wrapper">
                    <div className="message-box">
                            <div className="message-avatar">
                                <img width="100%" height="100" src="https://i.imgur.com/iV7Sdgm.jpg" alt="" />
                            </div>
                            <div className="message-details">
                                <div className="message-info">
                                    <div>{('Ali hddwdwdwdwd').slice(0,10)}<span>@alihd</span></div>
                                    <span>Sep 25, 2019</span>
                                </div>
                                <div>
                                    remember me?
                                </div>
                            </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ChatPage