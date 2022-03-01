import ReactPlayer from 'react-player'


function VideoPlayer({videourl}) {
    return (videourl ? <ReactPlayer url={videourl} /> : null)
}

export default VideoPlayer