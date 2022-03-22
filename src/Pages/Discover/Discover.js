import React, { useEffect, useState } from 'react'
import "./Discover.css";
import discoverButton from "../../res/imgs/buttondiscover.png";
import LCard from '../../Components/LCard/LCard';
import CaptionedImg from '../../Components/CaptionedImg/CaptionedImg';
import discoverbannerperson from "../../res/imgs/discoverbannerperson.png";
import VARIABLES from "../../config/.env.js";
import { loadcards } from './cardloader';
import DiscoverCard from '../../Components/DiscoverCard/DiscoverCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Discover() {

  //state for main page conent
  const [state, setState] = useState({
    banner_text: '',
    bannerimage_credit: '',
    bannerimagecredit_more: '',
    intro_text: ''
  });

  //state for discover cards and pagination etc.
  const [dataLength, setDataLength] = useState()
  const [cards, setCards] = useState([]);
  const [featuredCards, setFeatured] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [input, setInput] = useState("");
  let totalPages = (Math.ceil(dataLength / postsPerPage))
  
  const { fetchBaseUrl } = VARIABLES;

  useEffect(() => {
    fetch([fetchBaseUrl, `content-discover-stories?_limit=-1`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data, setFeatured);
        setDataLength(data.length)
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  useEffect(() => {
    fetch([fetchBaseUrl, `content-discover-stories?_start=${currentPage}&_limit=${postsPerPage}`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data, setCards);
      })
      .catch(err => console.log(err));
  }, [currentPage, postsPerPage]); // eslint-disable-line

  useEffect(() => {
    fetch(`${fetchBaseUrl}/content-discover-stories-main`)
      .then(res => res.json())
      .then(data => {
        setState({
          banner_text: data.BannerText,
          bannerimage_credit: data.BannerImageCredit,
          bannerimagecredit_more: data.BannerImageCredit_more,
          intro_text: data.IntroductionText,
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  function search() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortName() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=name:ASC&_limit=-1`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortRole() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=role:ASC&_limit=-1`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortState() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=state:ASC&_limit=-1`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }
  
  //Cards shown amount
  function handleSelectChange(e) {
    setPostsPerPage(e.target.value);
  }

  //Pagination handleClick
  function handlePageClick(e) {
      setCurrentPage(e.selected * postsPerPage)
      console.log(currentPage)
  }

  return (
    <div className="discover">
      
      {/**BANNER */}
      <div className="discoverBanner">
        <img src={discoverButton} alt="Discover NWC Stories" />
        <LCard text={state.banner_text} />
        <CaptionedImg
          src={discoverbannerperson}
          caption={state.bannerimage_credit}
          caption_more={state.bannerimagecredit_more} />
      </div>

      {/**FEATURED */}
      <div className="discoverFeatured">
        <h2>FEATURED STORIES</h2>
        <div className="discoverFeatured_cards">
          {featuredCards
            .filter(value => value.featured === 'true')
            .map((value, index) => <a href={`/discover/${value.id}`}><DiscoverCard
              key={Math.random()}
              color={"teal"}
              href={`/discover/${value.id}`}
              name={value.name}
              role={value.role}
              state={value.state}
              profilepic={value.profilepic}
            /></a>)
          }
        </div>
      </div>

      {/**INTRO */}
      <div className="discoverIntro">
        <p>{state.intro_text}</p>
      </div>

      {/**SEARCH */}
      <div className="discoverSearch">
        <div className="discoverSearch_bar">
          <input placeholder="Search Participants" value={input} onChange={e => setInput(e.target.value)} />
          <button className="discoverSearch_icon" onClick={() => search()}></button>
        </div>
        <div className="discoverSearch_sortBy">
          <p>SORT BY:</p>
          <p className="discoverSearch_separater">|</p>
          <p className="discoverSearch_sorter" onClick={() => sortName()}>NAME</p>
          <p className="discoverSearch_separater">|</p>
          <p className="discoverSearch_sorter" onClick={() => sortRole()}>ROLE</p>
          <p className="discoverSearch_separater">|</p>
          <p className="discoverSearch_sorter" onClick={() => sortState()}>STATE</p>
        </div>
      </div>
      
      <div className="cardsPerPage">
          <div className="cardsPerPageHeader">
          <h3>Cards per page</h3>
            </div>
      <ul className="cardsListPerPage">
            <button onClick={handleSelectChange} value={12}>12</button>
            <button onClick={handleSelectChange} value={24}>24</button>
            <button onClick={handleSelectChange} value={48}>48</button>
            <button onClick={handleSelectChange} value={96}>96</button>
        </ul>
          
      </div>

      {/**CARDS */}
      <div className="discoverCards">
        {cards.map((value) => <DiscoverCard
          key={Math.random()}
          color={["yellow", "blue", "red", "teal"][value.name.charCodeAt(0) % 4]}
          href={`/discover/${value.id}`}
          name={value.name}
          role={value.role}
          state={value.state}
          profilepic={value.profilepic}
        />)
        }
      </div>

      <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            pageCount={totalPages}
            previousLabel="< previous"
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            />

      <div className="discoverButtons">
        <Link to="/participants">
          <div className="discoverButtons_participants">VIEW FULL LIST OF PARTICIPANTS</div>
        </Link>
      </div>
    </div>
  )
}

export default Discover
