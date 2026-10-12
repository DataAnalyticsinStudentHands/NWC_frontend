import ReactPlayer from 'react-player'


function VideoPlayer({videourl}) {
    return (videourl ? <ReactPlayer url={videourl} controls='true' width='960px' height='570px'  /> : null)
}

export default VideoPlayer