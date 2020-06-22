import React, {useState, useContext} from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'

const Alert = (props) => {
    const { state, actions } = useContext(StoreContext)

    // const [top, setTop] = useState('-100px')

    // const show = () => {
    //     setTop('16px')
    // } 

    return(
        <div style={{top: state.top}} className="alert-wrapper">
            <div className="alert-content">
                {state.msg}
            </div>
        </div>
    )
}

export default Alert
