import React from 'react';
import VideoListItem from './video_list_item';


const VideoList = (props) => {
    const videoItems = props.videos.map((videoarg) => {
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                key={videoarg.etag}
                video={videoarg}/>
        );
    });

    return (
        <ul className='col-md-4 list-group'>
            {videoItems}
        </ul>
    );
};

export default VideoList;


