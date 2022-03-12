import React, { useEffect, useState } from 'react'
import "./Discover.css";
import discoverButton from "../../res/imgs/buttondiscover.png";
import LCard from '../../Components/LCard/LCard';
import CaptionedImg from '../../Components/CaptionedImg/CaptionedImg';
import discoverbannerperson from "../../res/imgs/discoverbannerperson.png";
import VARIABLES from "../../config/.env.js";
import { loadcards } from './cardloader';
import DiscoverCard from '../../Components/DiscoverCard/DiscoverCard';
import { getSafe, processPageOld } from "../../Components/util/util";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Discover() {
  const [dataLength, setDataLength] = useState()
  const [cards, setCards] = useState([]);
  const [featuredCards, setFeatured] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [input, setInput] = useState("");
  let totalPages = (Math.ceil(dataLength / postsPerPage))
  
  const [stateOld, setStateOld] = useState({
    bannerText: "abcdefg",
  }); // Handles the text throughout page.

  const { fetchBaseUrl } = VARIABLES;

  useEffect(() => {
    fetch([fetchBaseUrl, `content-discover-stories?_limit=-1`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data, setFeatured);
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
    fetch([fetchBaseUrl, `content-discover-stories?_limit=-1`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(dataLength => {
        setDataLength(dataLength.length)
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line

  useEffect(() => {
    fetch([fetchBaseUrl, "content-discovers"].join('/'))
      .then(req => req.json())
      .then(data => processPageOld(data, setStateOld))
      .catch(err => console.log(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function search() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortName() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=name:ASC&_limit=12`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortRole() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=role:ASC&_limit=12`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data, setCards))
      .catch(err => console.log(err));
  }

  function sortState() {
    fetch([fetchBaseUrl, `content-discover-stories?name_contains=${input}&_sort=state:ASC&_limit=12`].join('/'))
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
    setCurrentPage(e.selected)
  }

  return (
    <div className="discover">
      
      {/**BANNER */}
      <div className="discoverBanner">
        <img src={discoverButton} alt="Discover NWC Stories" />
        <LCard text={getSafe(stateOld, "BannerText") + ""} />
        <CaptionedImg
          src={discoverbannerperson}
          caption="PHOTO BY JANE DOE"
          caption_more="Here are some more details" />
      </div>

      {/**FEATURED */}
      <div className="discoverFeatured">
        <h2>FEATURED STORIES</h2>
        <div className="discoverFeatured_cards">
          {featuredCards
            .filter(value => value.featured === 'true')
            .map((value, index) => <a href={`/discover/${value.id}`}><DiscoverCard
              key={Math.random()}
              color={["yellow", "blue", "red", "teal"][value.name.charCodeAt(0) % 4]}
              href={`/discover/${value.id}`}
              name={value.name}
              role={value.role}
              state={value.state}
              profilepic={value.profilepic}
            /></a>)
          }
        </div>
      </div>

      {/**SEARCH */}
      <div className="discoverSearch">
        <div className="discoverSearch_bar">
          <input placeholder="Search Participants" value={input} onChange={e => setInput(e.target.value)} />
          <p className="discoverSearch_icon" onClick={() => search()}>&#x1F50E;&#xFE0E;</p>
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
      <div className="discoverButtons">
        <Link to="/participants">
          <div className="discoverButtons_participants">VIEW PARTICIPANTS</div>
        </Link>
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
    </div>
  )
}

export default Discover
