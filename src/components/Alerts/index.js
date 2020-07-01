import React, {useContext} from 'react'
import { StoreContext } from '../../store/store'
import './style.scss'

const Alert = (props) => {
    const { state, actions } = useContext(StoreContext)

    return(
        <div style={{top: state.top}} className="alert-wrapper">
            <div className="alert-content">
                {state.msg}
            </div>
        </div>
    )
}

export default Alert
