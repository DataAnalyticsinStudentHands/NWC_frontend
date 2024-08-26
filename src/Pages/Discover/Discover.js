import { useEffect, useState, useRef } from 'react'
import "./Discover.css";
import discoverButton from "../../assets/res/button-discover.png";
import BannerCard from '../../Components/BannerCard/BannerCard';
import CaptionedImg from '../../Components/CaptionedImg/CaptionedImg';
import discoverbannerperson from "./res/discoverbannerperson.png";
import { loadcards } from './cardloader';
import DiscoverCard from './Components/DiscoverCard';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Search } from '../../Components/SearchBox/Search'
import ReactMarkdown from 'react-markdown'
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
  const listOfCards = useRef([]);
  const [activeCardsPerPage, setActiveCardsPerPage] = useState('12');
  const [activeSortMethod, setActiveSortMethod] = useState(0);
  let totalPages = (Math.ceil(dataLength / postsPerPage))
  
  function setOffSet(){
    if(currentOffSet === 0){
      setCurrentOffSet(1)
    }else{
      setCurrentOffSet(0)
    }
  }
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?_limit=-1&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setFeatured);
        setDataLength(data.data.length)
        listOfCards.current = data.data
      }).catch(err => console.log(err));
  }, []); // eslint-disable-line
  
  useEffect(() => {
    if(currentData === 'default'){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'firstname'){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?sort=firstname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'lastname'){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?sort=lastname&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'role'){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?sort=role:asc&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'state'){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?sort=state&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        loadcards(data.data, setCards);
        
      })
      .catch(err => console.log(err));
    }
    if(currentData === 'search'){
      let fullName = input.split(' ')
      let firstname = fullName[0]
      let lastname = fullName[1]
      
      if(currentData === 0){
        fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
        .then(response => response.json())
        .then(data => {
          setDataLength(data.meta.pagination.total)
          totalPages = (Math.ceil(dataLength / postsPerPage))
          loadcards(data.data, setCards);
        })
        .catch(err => console.log(err));
      }
      if(fullName.length === 1){
        fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?filters[$or][0][firstname][$containsi]=${firstname}&filters[$or][1][lastname][$containsi]=${firstname}&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
        .then(response => response.json())
        .then(data => {
          setDataLength(data.meta.pagination.total)
          totalPages = (Math.ceil(dataLength / postsPerPage))
          loadcards(data.data, setCards) 
        })
        .catch(err => console.log(err));
      }
    if(fullName.length === 2){
      fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?filters[$or][0][firstname][$containsi]=${firstname}&filters[$or][1][lastname][$containsi]=${lastname}&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
      .then(response => response.json())
      .then(data => {
        setDataLength(data.meta.pagination.total)
        totalPages = (Math.ceil(dataLength / postsPerPage))
        loadcards(data.data, setCards) 
      })
      .catch(err => console.log(err));
  }
  if(fullName.length >= 3){
    fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories?filters[$or][0][firstname][$containsi]=${firstname}&filters[$or][1][lastname][$containsi]=${fullName[2]}&filters[$or][0][firstname][$containsi]=${fullName[1]}&pagination[page]=${currentOffSet}&pagination[pageSize]=${postsPerPage}&populate=*`)
    .then(response => response.json())
    .then(data => {
      setDataLength(data.meta.pagination.total)
      totalPages = (Math.ceil(dataLength / postsPerPage))
      loadcards(data.data, setCards) 
    })
    .catch(err => console.log(err));
  }
    }
    
  }, [currentOffSet, postsPerPage]); // eslint-disable-line

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/content-discover-stories-main`)
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

  function resetData(){
    currentData='default'
    setOffSet()
  }

  function firstNameSort() {
    currentData = 'firstname'
    setActiveSortMethod(1)
    setOffSet()
  }

  function lastNameSort() {
    currentData = 'lastname'
    setActiveSortMethod(2)
    setOffSet()
  }

  function sortRole() {
      currentData = 'role'
      setActiveSortMethod(3)
      setOffSet()
  }

  function sortState() {
      currentData = 'state'
      setActiveSortMethod(4)
      setOffSet()
  }
  function search(){
    currentData = 'search'
    setOffSet()
  }

  //Cards shown amount
  function handleSelectChange(e) {
    setPostsPerPage(e.target.value);
    setActiveCardsPerPage(e.target.value)
    setOffSet()
  }

  //Pagination handleClick
  function handlePageClick(e) {
    setCurrentOffSet(e.selected+1)
  }

  return (
    <div className="discover">
      {/**BANNER */}
      <div className="discoverBanner">
        <img src={discoverButton} alt="Discover NWC Stories" />
        <BannerCard text={state.banner_text} />
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
            .map((value) => <DiscoverCard
              key={Math.random()}
              color={"teal"}
              href={`/Discover/${value.id}`}
              firstname={value.firstname}
              lastname={value.lastname}
              role={value.role}
              state={value.state}
              profilepic={value.profilepic}
            />)
          }
        </div>
      </div>

      {/**INTRO */}
      <div className="discoverIntro">
        <ReactMarkdown>{state.intro_text}</ReactMarkdown>
      </div>

      {/**SEARCH */}
      <div className="discoverSearch">
        <div className="discoverSearch_bar">
          <Search placeholder="Search Participants by Name" onSearch={setInput}/>
          <button className="discoverSearch_icon" onClick={() => search()}></button>
        </div>
        <div className="discoverSearch_sortBy">
          <p>SORT BY:</p>
          <p className="discoverSearch_separater">|</p>
          <p className={activeSortMethod === 1?'activeSortMethod':"discoverSearch_sorter"} onClick={() => firstNameSort()}>FIRST NAME</p>
          <p className="discoverSearch_separater">|</p>
          <p className={activeSortMethod === 2?'activeSortMethod':"discoverSearch_sorter"} onClick={() => lastNameSort()}>LAST NAME</p>
          <p className="discoverSearch_separater">|</p>
          <p className= {activeSortMethod === 3?'activeSortMethod':"discoverSearch_sorter"} onClick={() => sortRole()}>ROLE</p>
          <p className="discoverSearch_separater">|</p>
          <p className= {activeSortMethod === 4?'activeSortMethod':"discoverSearch_sorter"} onClick={() => sortState()}>STATE</p>
        </div>
      </div>
      
      <div className="cardsPerPage">
          <div className="cardsPerPageHeader">
          Cards per page
            </div>
      <ul className="cardsListPerPage">
            <button key={1} className={activeCardsPerPage === '12'?'activeNumberOfCards': 'numberOfCards'} onClick={handleSelectChange} value={12}>12</button>
            <button key={2} className={activeCardsPerPage === '24'?'activeNumberOfCards': 'numberOfCards'} onClick={handleSelectChange} value={24}>24</button>
            <button key={3} className={activeCardsPerPage === '48'?'activeNumberOfCards': 'numberOfCards'} onClick={handleSelectChange} value={48}>48</button>
            <button key={4} className={activeCardsPerPage === '96'?'activeNumberOfCards': 'numberOfCards'} onClick={handleSelectChange} value={96}>96</button>
            
        </ul>
        <button className="resetButton" onClick={()=>resetData()} >Reset</button>
      </div>

      {/**CARDS */}
      <div className="discoverCards">
        {cards.map((value) => <DiscoverCard
          key={Math.random()}
          color={["yellow", "blue", "red", "teal"][value.firstname.charCodeAt(0) % 4]}
          href={`/discover/${value.id}`}
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