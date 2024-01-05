import React,{useState,useEffect} from 'react';
import {useNavigate,useParams} from "react-router-dom";
import './sass-css/Movie.css';
import {toast} from "react-toastify";
import { CgDropInvert } from "react-icons/cg";
import { AiOutlineRollback } from "react-icons/ai";
import { MdChangeCircle } from "react-icons/md";
import { FcBarChart,FcDoughnutChart } from "react-icons/fc";
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import {Chart as ChartJs ,registerables } from 'chart.js';
import { SiThemoviedatabase } from "react-icons/si";


const Movie = () => {
    const {id}=useParams();
    const apikey= "1d1e95c926e536819c9c01f851310447";
    // const apikey= "04c35731a5ee918f014970082a0088b1";
    const imgpath = "https://image.tmdb.org/t/p/w1280";
    const [URL, setURL] = useState(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`);
    const [data, setData] = useState("");
    const [castURL, setCastURL] = useState(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=en-US`);
    const [castData, setCastData] = useState("");
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(true);
    const [black, setBlack] = useState(false);
    const [bigText, setBigText] = useState("");
    const navigate=useNavigate();

    useEffect(() =>{
        setLoading(true);
        fetch(URL).then(res => res.json()).then((res_data) => {
            console.log(res_data);
            setData(res_data);
            setLoading(false);
            const big=res_data.original_title.split(" ");
            setBigText(`${big[0]}`);
            toast.info(`${res_data.original_title} loaded`);
        })
        fetch(castURL).then(res => res.json()).then((res_data) => {
            console.log(res_data);
            setCastData(res_data);
            setLoading(false);
        })
    },[]);

    useEffect(() =>{
        if(!loading && theme && black){
            document.querySelector(".theme1>.Moviebg1").style.filter =`grayscale(100%)`;
            document.querySelector(".theme1>.Movie1>.poster").style.filter=`grayscale(50%)`;
        }else if(!loading && !theme && black){
            document.querySelector(".theme2>.Moviebg2").style.filter =`grayscale(100%)`;
        }else if(!loading && theme && !black){
            document.querySelector(".theme1>.Moviebg1").style.filter =`grayscale(0%)`;
            document.querySelector(".theme1>.Movie1>.poster").style.filter=`grayscale(0%)`;
        }else if(!loading && !theme && !black){
            document.querySelector(".theme2>.Moviebg2").style.filter =`grayscale(0%)`;
        }
    },[black,loading,theme])
    
    useEffect(() =>{
        if(!loading && data.backdrop_path && theme){
            document.querySelector(".theme1>.Moviebg1").style.background =`url(${imgpath}${data.backdrop_path}) no-repeat center center / cover`;
            document.querySelector(".theme1>.Movie1>.poster").style.background =`url(${imgpath}${data.poster_path}) no-repeat center center / cover`;
        }else if(!loading && data.backdrop_path && !theme){
            document.querySelector(".theme2>.Moviebg2").style.background =`linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${imgpath}${data.backdrop_path}) no-repeat center center / cover`;
        }else if(!loading && !data.backdrop_path && theme){
            document.querySelector(".theme1>.Moviebg1").style.background =`url(https://picsum.photos/1000) no-repeat center center / cover`;
            document.querySelector(".theme1>.Movie1>.poster").style.background =`url(${imgpath}${data.poster_path}) no-repeat center center / cover`;
        }else if(!loading && !data.backdrop_path && !theme){
            document.querySelector(".theme2>.Moviebg2").style.background =`linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(https://picsum.photos/1000) no-repeat center center / cover`;
        }
    },[theme,loading,data]);

    ChartJs.register(...registerables );
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Multitype Chart',
            },
        },
    };

    const doughnutData=()=>{
        if(data){
            return {
            datasets:[{
                data:[`${data.revenue/1000000}`,`${data.budget/1000000}`],
                backgroundColor: ["green","red"]
            }],
            labels:["Collection","Budget"]
            }
        }
    }
    const barData=()=>{
        if(data){
            return {
                datasets:[{
                    type:"line",
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                    label:`Line Data`,
                    data:[`${data.revenue/1000000}`,`${data.budget/1000000}`],
                },
                {
                    type:"bar",
                    label:`Bar Data`,
                    data:[`${data.revenue/1000000}`,`${data.budget/1000000}`],
                    backgroundColor: ["green","red"]
                }
            ],
                labels:["Collection","Budget"]
            }
        }
    }

    if(loading){
        return (
            <div className="loading">
                <div className="lower flex2">
                    <h1>Created with</h1>
                    <SiThemoviedatabase/>
                </div>
            </div>
        )
    }else{
        return (
            <>
                {theme ?
                <div className="theme1">
                    <div className="Moviebg1"></div>
                    <div className="Movie1">
                        <div className="card">
                            <div className="title">
                                <p>{data.release_date}</p>
                                <p>{data.status}</p>
                            </div>
                            <div className="head">
                                <h1>{data.title}</h1>
                                <h3>{data.tagline}</h3>
                                <p>{data.overview}</p>
                            </div>
                            <div className="genre">
                                {data.genres.map((genre) => {
                                    return <span key={genre.id}><i>{genre.name}</i></span>;
                                })}
                            </div>
                            <div className="body">
                                <div>
                                    <p>Runtime : {data.runtime} min</p>
                                    <p>Collection : ${data.revenue}</p>
                                </div>
                                <div>
                                    <h4>Rating : {data.vote_average}</h4>
                                    <h4>Language : {data.original_language}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="poster"></div>
                    </div>
                </div> :
                <div className="theme2">
                    <div className="Moviebg2"></div>
                    <div className="Movie2">
                        <h1 className="bigtext">{bigText.toUpperCase()}</h1>
                        <div className="heading">{data.title}</div>
                        <p className="title">{data.title}</p>
                        {data.quote && <div className="quote">" {data.tagline} "</div>}
                        {data.release_date && <div className="relaseDate">IN CINEMAS &nbsp; <span> {data.release_date}</span> </div>}
                        <div className="company">
                            {
                                data.production_companies.length>0 && data.production_companies.map((company)=>{
                                    if(company.logo_path !== null)
                                    return(
                                        <img src={`${imgpath}${company.logo_path}`} alt={company.id} key={company.id} />
                                    )
                                })
                            }
                        </div>
                        <div className="M2page2">
                            {castData.cast.length >0 && <>
                                <h2>Cast</h2>
                                <div className="castReel">
                                    {
                                        castData.id && castData.cast.map((person)=>{
                                            return(
                                                <div className="cast" key={person.id}>
                                                    <a href={`https://en.wikipedia.org/wiki/${person.name}`} target="_blank"><img src={`${imgpath}${person.profile_path}`} /></a>
                                                    <h4><a href={`https://en.wikipedia.org/wiki/${person.name}`} target="_blank"> {person.name}</a></h4>
                                                    <p>{person.character} </p>
                                                    <p>Popularity : {person.popularity}%</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>}
                            {castData.crew.length > 0 && <>
                                <h2>Crew</h2>
                                <div className="crewReel">
                                {
                                        castData.id && castData.crew.map((person)=>{
                                            return(
                                                <div className="crew" key={person.id}>
                                                    <h4><a href={`https://en.wikipedia.org/wiki/${person.name}`} target="_blank">{person.name} </a></h4>
                                                    <p> {person.job}</p>
                                                    <p>Popularity : {person.popularity}%</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>}
                            {data.revenue>0 && data.budget>0 &&(
                                <>
                                    <h2>Graphs</h2>
                                    <p style={{marginLeft:"1rem"}}>'Data in Million USD'</p>
                                    <div className="graphs">
                                        <div className="graph">
                                            <Chart type="bar" data={barData()} options={options}/>
                                        </div> 
                                        <div className="graph">
                                            <Doughnut data={doughnutData()}/>
                                        </div> 
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>}
                <div className="themeChange" onClick={()=>setTheme(!theme)}>
                    <MdChangeCircle/>
                </div>
                <div className="BWChange" onClick={()=>setBlack(!black)}>
                    <CgDropInvert/>
                </div>
                <div className="back" onClick={()=>window.close()}>
                    <AiOutlineRollback/>
                </div>
            </>
        )
    }
}

export default Movie;