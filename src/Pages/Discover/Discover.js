import React, { useEffect, useState } from 'react'
import "./Discover.css";
import discoverButton from "../../res/button-discover.png";
import LCard from '../../Components/LCard/LCard';
import CaptionedImg from '../../Components/CaptionedImg/CaptionedImg';
import discoverbannerperson from "./res/discoverbannerperson.png";
import VARIABLES from "../../config/.env.js";
import { loadcards } from './cardloader';
import DiscoverCard from '../../Components/DiscoverCard/DiscoverCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
var currentData = 'default'
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
  const [currentOffSet, setCurrentOffSet] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [input, setInput] = useState("");
  let totalPages = (Math.ceil(dataLength / postsPerPage))
  
  const { fetchBaseUrl } = VARIABLES;
  useEffect(() => {
    
    fetch([fetchBaseUrl, `api/content-discover-stories?_limit=-1&populate=*`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setFeatured);
        
        setDataLength(data.data.length)
      }).catch(err => console.log(err));
  }, []); // eslint-disable-line
  
  useEffect(() => {
    
    if(currentData === 'default'){
      fetch([fetchBaseUrl, `api/content-discover-stories?pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`/* + `?_start=${page}&_limit=2`*/].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'firstname'){
      fetch([fetchBaseUrl, `api/content-discover-stories?sort=firstname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'lastname'){
      fetch([fetchBaseUrl, `api/content-discover-stories?sort=lastname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'role'){
      fetch([fetchBaseUrl, `api/content-discover-stories?sort=role:asc&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'state'){
      fetch([fetchBaseUrl, `api/content-discover-stories?sort=state&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    
  }, [currentOffSet, postsPerPage]); // eslint-disable-line

  useEffect(() => {
    
    fetch(`${fetchBaseUrl}/api/content-discover-stories-main`)
      .then(res => res.json())
      .then(data => {
        const {data:{attributes:{BannerText, BannerImageCredit, BannerImageCredit_more, IntroductionText}}}=data;
        setState({
          banner_text: BannerText,
          bannerimage_credit: BannerImageCredit,
          bannerimagecredit_more: BannerImageCredit_more,
          intro_text: IntroductionText,
        });
      })
      .catch(err => console.log(err));
  }, []); // eslint-disable-line
//doesn't get full api
  function search() {
    
    let fullname = input.split(' ')
    let firstname = fullname[0]
    let lastname = fullname[1]
    
    if(fullname.length === 1){
      fetch([fetchBaseUrl, `api/content-discover-stories?filters[$or][0][firstname][$containsi]=${firstname}&filters[$or][1][lastname][$containsi]=${firstname}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data.data, setCards))
      .catch(err => console.log(err));
    }else{
      fetch([fetchBaseUrl, `api/content-discover-stories?filters[$or][0][firstname][$containsi]=${firstname}&filters[$or][1][lastname][$containsi]=${lastname}&filters[$or][2][firstname][$containsi]=${lastname}&populate=*`].join('/'))
      .then(response => response.json())
      .then(data => loadcards(data.data, setCards))
      .catch(err => console.log(err));
    }


    
  }
  
  function firstNameSort() {
    // console.log(string)
    // fetch([fetchBaseUrl, `api/content-discover-stories?sort=firstname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
    //   .then(response => response.json())
    //   .then(data => loadcards(data.data, setCards))
    //   .catch(err => console.log(err));
    //   //This should reset the pagination back to page 1
    //   console.log('first name sort')
    //   // setCurrentOffSet(0)

    //   // cards.forEach(card => {
    //   //   const nameParts = card.name.split(" ")
    //   //   card.lastName = nameParts[nameParts.length - 1]
    //   // })
    //   // cards.sort((a, b) => a.lastName.localeCompare(b.lastName))
    currentData = 'firstname'
    console.log(currentOffSet)
    if(currentOffSet === 0){
      setCurrentOffSet(1)
    }else{
      setCurrentOffSet(0)
    }
    
  }

  function lastNameSort() {
    
    // fetch([fetchBaseUrl, `api/content-discover-stories?sort=lastname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
    //   .then(response => response.json())
    //   .then(data => loadcards(data.data, setCards))
    //   .catch(err => console.log(err));

    currentData = 'lastname'
    if(currentOffSet === 0){
      setCurrentOffSet(1)
    }else{
      setCurrentOffSet(0)
    }
    // setCurrentOffSet(1)
    

      //This should reset the pagination back to page 1
      // setCurrentOffSet(0)
  }

  function sortRole() {
    
    // fetch([fetchBaseUrl, `api/content-discover-stories?sort=role:asc&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
    //   .then(response => response.json())
    //   .then(data => loadcards(data.data, setCards))
    //   .catch(err => console.log(err));
      currentData = 'role'
      if(currentOffSet === 0){
        setCurrentOffSet(1)
      }else{
        setCurrentOffSet(0)
      }
      // setCurrentOffSet(1)
      
      //This should reset the pagination back to page 1
      // setCurrentOffSet(0)
  }

  function sortState() {
    
    // fetch([fetchBaseUrl, `api/content-discover-stories?sort=state&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`].join('/'))
    //   .then(response => response.json())
    //   .then(data => loadcards(data.data, setCards))
    //   .catch(err => console.log(err));
    //   //This should reset the pagination back to page 1
    //   setCurrentOffSet(0)
      currentData = 'state'
      if(currentOffSet === 0){
        setCurrentOffSet(1)
      }else{
        setCurrentOffSet(0)
      }
      // setCurrentOffSet(1)
     
  }

  //Cards shown amount
  function handleSelectChange(e) {
    setPostsPerPage(e.target.value);
    // setCurrentOffSet(0);
  }

  //Pagination handleClick
  function handlePageClick(e) {
   
    setCurrentOffSet(e.selected+1)
  }

  //Janky reset for pagination, depending on the cards per page
  function resetPagination() {
    if (postsPerPage === "12") {
      return currentOffSet / 12
    } else if (postsPerPage === "24") {
      return currentOffSet / 24
    } else if (postsPerPage === "48") {
      return currentOffSet / 48
    } else if (postsPerPage === "96") {
      return currentOffSet / 96
    } else {
      return currentOffSet * 0
    }
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
              // name={value.name}
              firstname={value.firstname}
              lastname={value.lastname}
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
          <input placeholder="Search by Name" value={input} onChange={e => setInput(e.target.value)} />
          <button className="discoverSearch_icon" onClick={() => search()}></button>
        </div>
        <div className="discoverSearch_sortBy">
          <p>SORT BY:</p>
          <p className="discoverSearch_separater">|</p>
          <p className="discoverSearch_sorter" onClick={() => firstNameSort()}>FIRST NAME</p>
          
          <p className="discoverSearch_separater">|</p>
          <p className="discoverSearch_sorter" onClick={() => lastNameSort()}>LAST NAME</p>
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
          color={["yellow", "blue", "red", "teal"][value.firstname.charCodeAt(0) % 4]}
          href={`/discover/${value.id}`}
          // name={value.name}
          firstname={value.firstname}
          lastname={value.lastname}
          role={value.role}
          state={value.state}
          profilepic={value.profilepic}
        />)
        }
      </div>

      <ReactPaginate
        containerClassName={"pagination"}
        nextLabel="next >"
        previousLabel="< previous"
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        // breakLabel="..."
        // forcePage={resetPagination()}    
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