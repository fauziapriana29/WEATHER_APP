import React from 'react'
import Footage from '../images/cloude.mp4'

const Video = () => {
    return (
        <div className="section">
            <video autoPlay loop muted>
                <source src={Footage} type="video/mp4"/>
            </video>
        </div>
    )
}

export default Video