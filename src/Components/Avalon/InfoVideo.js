import "./InfoVideo.css";

function InfoVideo({src,title}) {
  return (
    <iframe className="info_videoiframe"
        title={title}
        src={src}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen>
    </iframe>
  )
}

export default InfoVideo