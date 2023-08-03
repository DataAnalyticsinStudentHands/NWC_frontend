import React from 'react'
import ReactMarkdown from 'react-markdown'
import "./BannerCard.css";

function BannerCard({text}) {
    return (
        <div className="bannercard">
            <div className="bannercard_topright"></div>
            <div className="bannercard_text">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <div className="bannercard_bottomleft"></div>
        </div>
    )
}

export default BannerCard
