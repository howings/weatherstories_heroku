import React from 'react';
import './VideoInit.css';

const BaseVideoPath = '/assets/student-project-';

function VideoInit(props) {
    if(!props.id){
        return null;
    }
    const FinalVideoPath = `${BaseVideoPath}${props.id}.mp4`;
    console.log(FinalVideoPath);
    return (
        <div className="video-gradient">
            <div className="video-container">
                <video id="video-clip" src={FinalVideoPath} autoPlay loop muted />
            </div>
        </div>
        
    )
}

export default VideoInit
