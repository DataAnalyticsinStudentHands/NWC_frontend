import ReactMarkdown from 'react-markdown'; 
import React, { useState } from 'react';
import Map from '../Map'
import PropTypes from "prop-types";
import './HomeMap.css'

export const HomeMap = ( { homeMap_text, maps, opening }) => {

    const [currMap, setCurrMap] = useState('dt');
    const [openingMap, setOpeningMap] = useState(true);

        return (
        <div className="homeMap">
                    <div className="homeMap_card">
                    <div className="homeMap_headerBackdrop"></div>
                    <p className="homeMap_header">INTERACTIVE MAP</p>
                    <div className="homeMap_cardHr"></div>
                    <p className="homeMap_text"><ReactMarkdown>{homeMap_text}</ReactMarkdown></p>
                    </div>

                    {openingMap ? (
                    <>
                        <div className="homeMap_tabs">
                        <div
                            className={openingMap ? 'homeMap_tab--active' : ''}
                            onClick={() => setOpeningMap(true)}
                        >
                            <p>HOUSTON 1977</p>
                        </div>
                        {Object.keys(maps).map((m) => (
                            <div
                            key={Math.random()}
                            className={
                                (currMap === m) & !openingMap
                                ? 'homeMap_tab--active'
                                : ''
                            }
                            onClick={() => {
                                setCurrMap(m);
                                setOpeningMap(false);
                            }}
                            >
                            <p>{maps[m].name}</p>
                            </div>
                        ))}
                        </div>
                        <div className="homeMap_tabsHr"></div>

                        {[
                        { color: '#3FA490', x: '930', y: '754', mapName: 'dt' },
                        { color: '#615FBF', x: '960', y: '852', mapName: 'tw' },
                        { color: '#9EC7E1', x: '890', y: '849', mapName: 'museo' },
                        { color: '#142F45', x: '1070', y: '810', mapName: 'mag' },
                        { color: '#FFD048', x: '795', y: '964', mapName: 'astro' },

                        ].map((p) => (
                        <div 
                            key={Math.random()}
                            style={{
                            position: 'absolute',
                            width: 'calc(35*var(--xUnit))',
                            height: 'calc(35*var(--xUnit))',
                            backgroundColor: p.color,
                            borderRadius: '999px',
                            marginLeft: `calc(${p.x}*var(--xUnit))`,
                            marginTop: `calc(${p.y}*var(--xUnit))`,
                            cursor: 'pointer',
                            }}
                            onClick={() => {
                            setCurrMap(p.mapName);
                            setOpeningMap(false);
                            }}
                        ></div>
                        ))}
                        <img
                        className="homeMap_opening"
                        src={opening}
                        alt="Opening Map"
                        />
                    </>
                    ) : (
                    <>
                        <div className="homeMap_tabs">
                        <div
                            className={openingMap ? 'homeMap_tab--active' : ''}
                            onClick={() => setOpeningMap(true)}
                        >
                            <p>HOUSTON</p>
                        </div>
                        {Object.keys(maps).map((m) => (
                            <div
                            key={Math.random()}
                            className={
                                (currMap === m) & !openingMap
                                ? 'homeMap_tab--active'
                                : ''
                            }
                            onClick={() => {
                                setCurrMap(m);
                                setOpeningMap(false);
                            }}
                            >
                            <p>{maps[m].name}</p>
                            </div>
                        ))}
                        </div>
                        <div className="homeMap_tabsHr"></div>

                        <Map
                        mapImg={maps[currMap].mapImg}
                        points={maps[currMap].points}
                        />
                    </>
                    )}
                </div>
        );
};

HomeMap.propTypes = {
    homeMap_text: PropTypes.string,
    maps: PropTypes.object,
	opening: PropTypes.string,

};