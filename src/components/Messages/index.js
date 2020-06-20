import React, {useEffect} from 'react'
import './style.scss'

const Messages = () => {

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.cssText = "position:fixed; overflow-y: scroll;"
    },[])
    
    return(
        <div className="workInProgress">
            This is a work in progress
        </div>
    )
}

export default Messages