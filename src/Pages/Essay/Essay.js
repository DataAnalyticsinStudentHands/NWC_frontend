import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

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
        fetch([process.env.REACT_APP_API_URL, `api/content-essays/${id}?populate[HeaderImage][populate]=*&populate[Section1][populate]=*&populate[Section2][populate]=*&populate[Section3][populate]=*&populate[Section4][populate]=*&populate[Sources][populate]=*&populate[BigImage1][populate]=*&populate[BigImage2][populate]=*&populate[CaptionedImage1][populate]=*&populate[CaptionedImage2][populate]=*&populate[CaptionedImage3][populate]=*&populate[CaptionedImage4][populate]=*`].join('/'))
        .then(res => res.json())
        .then(data => {
            const {data:
                        {attributes:
                            {
                                LayoutChoice, Title, HeaderImage, PullQuote1, Section1, Section2, Section3, Section4, CaptionedImage1, CaptionedImage2, CaptionedImage3, 
                                CaptionedImage4, BigImage1, BigImage2, PullQuote2, AuthorCredit, PreferredCitation, Sources, TimeLineURL
                            }}} = data;
            setState({
                layoutChoice: LayoutChoice,
                title: Title,
                headerImage: HeaderImage ? [process.env.REACT_APP_API_URL, HeaderImage.Image.data.attributes.url].join('') : '',
                pullQuote1: PullQuote1,
                section1: Section1,
                section2: Section2,
                section3: Section3,
                section4: Section4,
                captionedImage1: CaptionedImage1 !== null ? CaptionedImage1: '',
                captionedImage2: CaptionedImage2 !== null ? CaptionedImage2: '',
                captionedImage3: CaptionedImage3 !== null ? CaptionedImage3: '',
                captionedImage4: CaptionedImage4 !== null ? CaptionedImage4: '',
                bigImage1: BigImage1 !== null ? BigImage1: '',
                bigImage2: BigImage2 !== null ? BigImage2: '',
                pullQuote2: PullQuote2,
                authorCredit: AuthorCredit,
                preferredCitation: PreferredCitation,
                sources: Sources.map(src => src.text),
                timeLineURL: TimeLineURL
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
