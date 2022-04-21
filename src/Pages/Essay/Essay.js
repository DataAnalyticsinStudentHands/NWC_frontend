import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import VARIABLES from '../../config/.env';
import "./Essay.css";
import Layout1 from './Layouts/Layout1';
import Layout2 from './Layouts/Layout2';
import Layout3 from './Layouts/Layout3';
import Torch from './Layouts/Torch';

function Essay() {

    const { search } = useLocation();
    const id = search.split('=')[1];

    const [state, setState] = useState({
        layoutChoice: 'Layout3', // this is the default layout because it's simple
        title: '',
        headerImage: '',
        pullQuote1: '',
        section1: '',
        section2: '',
        section3: '',
        section4: '',
        captionedImage1: '',
        captionedImage2: '',
        captionedImage3: '',
        captionedImage4: '',
        bigImage1: '',
        bigImage2: '',
        pullQuote2: '',
        authorCredit: '',
        preferredCitation: '',
        sources: [],
        timeLineURL: ''
    });

    useEffect(() => {
        fetch([VARIABLES.fetchBaseUrl, `content-essays/${id}`].join('/'))
        .then(res => res.json())
        .then(data => {
            setState({
                layoutChoice: data.LayoutChoice,
                title: data.Title,
                headerImage: data.HeaderImage ? [VARIABLES.fetchBaseUrl, data.HeaderImage.Image[0].url].join('') : '',
                pullQuote1: data.PullQuote1,
                section1: data.Section1,
                section2: data.Section2,
                section3: data.Section3,
                section4: data.Section4,
                captionedImage1: data.CaptionedImage1,
                captionedImage2: data.CaptionedImage2,
                captionedImage3: data.CaptionedImage3,
                captionedImage4: data.CaptionedImage4,
                bigImage1: data.BigImage1,
                bigImage2: data.BigImage2,
                pullQuote2: data.PullQuote2,
                authorCredit: data.AuthorCredit,
                preferredCitation: data.PreferredCitation,
                sources: data.Sources.map(src => src.text),
                timeLineURL: data.TimeLineURL
            })
        });
        window.scrollTo(0, 0);
    }, []); // eslint-disable-line

    return (<div className="essay">
        {// LAYOUT SWITCH set via state.layoutChoice,
            {
                'Layout1': <Layout1 props={state} />,
                'Layout2': <Layout2 props={state} />,
                'Layout3': <Layout3 props={state} />,
                'TorchRelay': <Torch props={state} />

            }[state.layoutChoice]
        }
    </div>)
}

export default Essay
