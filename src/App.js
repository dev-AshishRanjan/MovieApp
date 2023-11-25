import './sass-css/App.css';
import { motion, AnimatePresence } from "framer-motion";
import React,{useState,useEffect,useContext} from 'react';
import {toast} from 'react-toastify';
import { AiOutlineClose,AiFillRightCircle,AiFillLeftCircle } from "react-icons/ai";
import { CgDropInvert } from "react-icons/cg";
import { BsFillArrowDownCircleFill,BsFillArrowUpCircleFill } from "react-icons/bs";
import { useSpeechContext } from '@speechly/react-client';
import { PushToTalkButton,PushToTalkButtonContainer } from '@speechly/react-ui';
import { SiThemoviedatabase } from "react-icons/si";
// import {useNavigate} from "react-router-dom";

const MovieContext=React.createContext();

function App(){
  const apikey= "1d1e95c926e536819c9c01f851310447";  //mine
  // const apikey= "04c35731a5ee918f014970082a0088b1";
  const imgpath = "https://image.tmdb.org/t/p/w1280";
  const [popPage, setPopPage] = useState(1);
  const [disPage, setDisPage] = useState(1);
  const [upPage, setUpPage] = useState(1);
  const [URL, setURL] = useState(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.asc&api_key=${apikey}&page=${disPage}`);
  const [data, setData] = useState("");
  const [upcomingURL, setUpcomingURL] = useState(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=${upPage}`);
  const [upcomingData, setUpcomingData] = useState({});
  const [nowPlayingURL, setNowPlayingURL] = useState(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`);
  const [nowPlayingData, setNowPlayingData] = useState({});
  const [popularURL, setPopularURL] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${popPage}`);
  const [popularData, setPopularData] = useState({});
  const [similarURL, setSimilarURL] = useState(``);
  const [similarData, setSimilarData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [searchURL, setSearchURL] = useState("");
  const [searchData, setSearchData] = useState({});
  const [SearchPage, setSearchPage] = useState(1);
  const [searchWindow, setSearchWindow] = useState(false);
  const [mode, setMode] = useState(true);

  const {segment}= useSpeechContext();

  // const navigate=useNavigate();
  useEffect(() =>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY <200){
        document.querySelector(".arrow1").style.display="none";
      }else{
        document.querySelector(".arrow1").style.display="block";
      }
    });
    // if(document.querySelector(".App")){
    //   document.querySelector(".App").classList.add("dark");
    // }
  },[])


  useEffect(() =>{
    setLoading(true);
    fetch(URL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setData(res_data);
      setLoading(false);
      // toast.success(`Page load Complete - ${page}`);
    })
  },[URL]);
  useEffect(() =>{
    setLoading(true);
    fetch(searchURL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setSearchData(res_data);
      setLoading(false);
      setSearchWindow(true);
      setSimilarData({});
      // document.querySelector(".appHeader>input").focus();
      // toast.success(`Page load Complete - ${page}`);
    })
  },[searchURL]);
  useEffect(() =>{
    setLoading(true);
    fetch(upcomingURL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setUpcomingData(res_data);
      setLoading(false);
    })
  },[upcomingURL]);
  useEffect(() =>{
    setLoading(true);
    fetch(nowPlayingURL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setNowPlayingData(res_data);
      setLoading(false);
    })
  },[nowPlayingURL]);
  useEffect(() =>{
    setLoading(true);
    fetch(popularURL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setPopularData(res_data);
      setLoading(false);
    })
  },[popularURL]);
  useEffect(() =>{
    // setLoading(true);
    fetch(similarURL).then(res => res.json()).then((res_data) => {
      console.log(res_data);
      setSimilarData(res_data);
      // setLoading(false);
    })
  },[selectedData]);


  useEffect(() =>{
    setPopularURL(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${popPage}`);
  },[popPage]);
  useEffect(() =>{
    setURL(`https://api.themoviedb.org/3/discover/movie?sort_by=release_date.asc&api_key=${apikey}&page=${disPage}`);
  },[disPage]);
  useEffect(() =>{
    setUpcomingURL(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=${upPage}`);
  },[upPage]);
  useEffect(() =>{
    if(searchWindow && searchValue !==""){
      setSearchURL(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${searchValue.trim()}&page=${SearchPage}`);
    }
  },[SearchPage]);

  const handleSelect=(element)=>{
    setSelectedId(true);
    setSelectedData(element);
    setSimilarURL(`https://api.themoviedb.org/3/movie/${element.id}/similar?api_key=${apikey}&language=en-US&page=1`);
    const app=document.querySelector(".App");
    const restCard=document.querySelector(".restCard");
    restCard.style.opacity = "0.5";
    restCard.style.filter = "blur(0.1rem)";
    app.style.height="100vh";
    const selectedCard=document.querySelector(".App");
    // selectedCard.style.opacity = "1";
  }
  const handleClose=()=>{
    setSelectedId(false);
    // setSelectedData("");
    const app=document.querySelector(".App");
    const restCard=document.querySelector(".restCard");
    const selectedCard=document.querySelector(".App");
    restCard.style.opacity = "1";
    restCard.style.filter = "blur(0rem)";
  }

  useEffect(() =>{
    if(segment && segment.isFinal){
      console.log(segment);
      const speech=segment.words.map((w)=>w.value).join(" ");
      if(speech.trim().length >0){
        setSearchValue(speech.trim());
        setSearchURL(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${speech}&page=${SearchPage}`);  
      }
    }
  },[segment])

  if(loading){
    return(
      <div className={`App ${mode ? "dark":"light"}`}>
        <div className="restCard">
          <div className="lower flex2">
            <h1>Created with</h1>
            <SiThemoviedatabase/>
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <MovieContext.Provider value={{imgpath,handleSelect}}>
        <div className={`App ${mode ? "dark":"light"}`}>
          <div className="restCard">
            <div className="appHeader">
              <p>Motion Pic</p>
              <input type="text" id="search" name="search" placeholder="search..." value={searchValue} onChange={(e)=>{
                setSearchValue(e.target.value);
                // if(e.target.value.trim().length >=3){
                //   setSearchURL(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${e.target.value.trim()}&page=${SearchPage}`);
                //   setSearchPage(1);
                //   document.querySelector(".appHeader>input").focus();
                // }
                if(e.target.value ===""){
                  setSearchWindow(false);
                }
              }} onKeyPress={(e)=>{
                console.log(e);
                if(e.key === "Enter" && searchValue !==""){
                  setSearchURL(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${searchValue.trim()}&page=${SearchPage}`);
                  setSearchPage(1);
                }
              }} />
              <div className="mode">
                <CgDropInvert onClick={()=>setMode(!mode)}/>
              </div>
            </div>
            {segment && <p className="talk">" {segment.words.map((w)=>w.value).join(" ")} "</p>}
            {!searchWindow && (
              <div className="lower">
                <div className="sectionWrap">
                  <h1>Now Playing <hr /></h1>
                  <h4 className="info">' Scroll right for more '</h4>
                  {!nowPlayingData.total_results >0 ? null :
                  <Sections sectionName="sectionType2" cardId="card2" sectionData={nowPlayingData}/>}
                </div>

                <div className="sectionWrap">
                  {!similarData.total_results > 0 ? null :(<>
                      <h1>Similar to "{selectedData.title}" <hr /></h1>
                      <h4 className="info">' Scroll right for more '</h4>
                      <Sections sectionName="sectionType2" cardId="card2" sectionData={similarData}/>
                      {/* <Sections sectionName="sectionType2" cardId="card2" sectionData={selectedData}/> */}
                    </>)
                  }
                </div>

                <div className="sectionWrap">
                  <h1>Popular <hr /></h1>
                  <h4 className="info">' Scroll down for more '</h4>
                  <Footer sectionData={popularData} pageNo={popPage} setPageNo={setPopPage}/>
                  {!popularData.total_results >0 ? null :
                  <Sections sectionName="popularSection" cardId="card" sectionData={popularData} />}
                </div>

                <div className="sectionWrap">
                  <h1>Discover <hr /></h1>
                  <h4 className="info">' Scroll right for more '</h4>
                  <Footer sectionData={data} pageNo={disPage} setPageNo={setDisPage}/>
                  {!data.total_results >0 ? null :
                  <Sections sectionName="sectionType2" cardId="card2" sectionData={data} />}
                </div>

                <div className="sectionWrap">
                  <h1>Upcoming <hr /></h1>
                  <h4 className="info">' Scroll right for more '</h4>
                  <Footer sectionData={upcomingData} pageNo={upPage} setPageNo={setUpPage}/>
                  {!upcomingData.total_results >0 ? null :
                  <Sections sectionName="sectionType2" cardId="card2" sectionData={upcomingData}/>}
                </div>
              </div>
            )}
            
            {searchWindow && <div className="lower">
              <div className="searchSection">
                {searchData.total_results ? <h2>Search result for "{searchValue.trim()}"</h2> : <h2>No result found for "{searchValue.trim()}"</h2>}
                {searchData && <Sections sectionName="searchSection" cardId="card" sectionData={searchData}/> }
                <div className="sectionWrap">
                  {!similarData.total_results > 0 ? null :(<>
                      <h1>Similar to "{selectedData.title}" <hr /></h1>
                      <h4 className="info">' Scroll right for more '</h4>
                      <Sections sectionName="sectionType2" cardId="card2" sectionData={similarData}/>
                      {/* <Sections sectionName="sectionType2" cardId="card2" sectionData={selectedData}/> */}
                    </>)
                  }
                </div>
                {searchData.total_pages >1 && <Footer sectionData={searchData} pageNo={SearchPage} setPageNo={setSearchPage}/> }
              </div>
            </div>}

            <BsFillArrowUpCircleFill className="arrow1" onClick={()=>window.scrollTo(0,0)}/>
            <BsFillArrowDownCircleFill className="arrow2" onClick={()=>window.scrollTo(0,document.querySelector(".App").scrollHeight)}/>

            {/* <PushToTalkButtonContainer >
              <PushToTalkButton className="talkButton" onClick={window.scrollTo(0,0)}/>
            </PushToTalkButtonContainer> */}
          </div>
          <AnimatePresence>
            {selectedId && (
              <motion.div className="Selectedcard" key={selectedData.id}>
                <motion.img className="image" src={`${imgpath}${selectedData.poster_path}`}/>
                <motion.div className="data">
                  <motion.h2 className="title">{selectedData.title}</motion.h2>
                  <motion.h4 className="date">DOR :&nbsp; {selectedData.release_date}</motion.h4>
                  <div className="vote">Vote : &nbsp;{selectedData.vote_average}</div>
                  <motion.p className="overview">{selectedData.overview}</motion.p>
                </motion.div>
                <AiOutlineClose className="closebtn" onClick={handleClose}/>
                <motion.a href={`/movie/${selectedData.id}`} target="_blank" className="link">See Details</motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* // <div className="footer">
          //   <div className="previous" onClick={()=>{
          //     if(page >1){
          //       setPage(page-1)
          //     }else{
          //       toast.error("Cannot go further back");
          //     }
          //   }}><AiFillLeftCircle/></div>
          //   <div className="present">{popularData.page}/{popularData.total_pages}</div>
          //   <div className="next" onClick={()=>setPage(page+1)}><AiFillRightCircle/></div>
          // </div> */}
        </div>
      </MovieContext.Provider>
    );
  }
}
const Sections=({sectionName,cardId,sectionData})=>{
  const {imgpath,handleSelect}=useContext(MovieContext);
  return(
    <div className={sectionName}>
      {
        sectionData.results.map((element)=>{
          return(
              <motion.div className={cardId} key={element.id} onClick={()=>handleSelect(element)}>
                <motion.img className="image" src={`${imgpath}${element.poster_path}`}/>
                <motion.div className="data">
                  <motion.h4 className="title">{element.title}</motion.h4>
                </motion.div>
              </motion.div>
          )
        })
      }
    </div>
  )
}
const Footer=({sectionData,pageNo,setPageNo})=>{
  // const {page,setPage}=useContext(MovieContext);
  return(
    <div className="footer">
      <div className="previous" onClick={()=>{
        if(pageNo >1){
          setPageNo(pageNo-1)
        }else{
          toast.error("Cannot go further back");
        }
      }}><AiFillLeftCircle/></div>
      <div className="present">{sectionData.page}/{sectionData.total_pages}</div>
      <div className="next" onClick={()=>{
        if(pageNo < sectionData.total_pages){
          setPageNo(pageNo+1);
        }else{
          toast.error("Cannot go further more");
        }
      }}><AiFillRightCircle/></div>
    </div>
  )
}

export default App;
