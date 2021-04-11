import React, { useState, useEffect , useRef} from 'react';
import "./Weather.css";
import axios from 'axios';
import BottomBar from './BottomBar';

 
function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState('');
  const [movie, setMovie] = useState('58611129-2dbc-4a81-a72f-77ddfc1b1b49');

  const initialRender = useRef(true);

  const show = false;
  
  // console.log(initialRender.current);
  // console.log(currentCity);
  // console.log(currentWeather);

  // useEffect(() => {
  //   setCurrentWeather("Clear")
  // }, []); 

  const changeInitialRender = () => {
    // console.log(initialRender.current);
    initialRender.current = false;
  }

  document.addEventListener('mousedown', changeInitialRender);

  const emptyRequest = "***Enter field cannot be empty***";

  const badRequest = "***City doesn't Exist***";

  const api = {
    key:"d934fc39acfbdbc0ed98545d4d018e09",
    base:"https://api.openweathermap.org/data/2.5/"
  }
  
  const apiCity = "http://localhost:4000/api/cities/";
  

  // ----fetch API---------------------------------------

  const search = evt => {
  fetch(`${apiCity}`)
    .then(res => {
      if (res.ok) {
        console.log("city fetch success");
        return res.json()
      } else {
        alert(badRequest);
      }
    })
    .then(result => {
      setCity(result); 
      //console.log(result);
    })
    .catch(error => console.log('ERROR', error));

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        setCurrentCity(result.name);
        setCurrentWeather(result.weather[0].main);
      })
      .catch(error => {
        alert(badRequest);
      });
  }

  // -----------------------------------------------------
  const axiosCity = axios.create({
    baseURL: `http://localhost:4000/api/cities/`
  })

  const axiosWeather = axios.create({
    baseURL: `http://localhost:4000/api/stories/`
  })

  // const fetchWeatherURL = "http://localhost:4000/api/stories/search/?weather="

  const insertCity = async () => {
    let response = await axiosCity.post('/', {name: currentCity})
      .then(response => console.log(response.status))
      .catch(error => alert("***Input will not be entered***"));
  }
  
  const getMovieId = async () => {
    fetch(`http://localhost:4000/api/stories/search/?weather=${currentWeather}`)
      .then(res => res.json())
      .then(result => {
        console.log(result[0].movieId);
        setMovie(result[0].movieId);
      })
      .then(updateBg)
      .catch(error => {
        alert("Sorry no movie related to this weather...");
      });
  };

  const checkInput = (e) => {
    if (!e.target.value) {
      initialRender.current = false;
      console.log(initialRender.current);
      return alert(emptyRequest);
    } else
      initialRender.current = false;
      search();      
  }

  useEffect(() => {
    if (initialRender.current) {
      return
    } else {
      // console.log("useEffect insertCity is working");
      insertCity();
    }}, [currentCity, setCurrentCity]); 

  useEffect(() => {
    if (initialRender.current) {
      return
    } else {
    // console.log("useEffect getMovieId is working");
      getMovieId();
  }}, [currentWeather, setCurrentWeather])
 
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date} ${month} ${year}`
  }

  //-------------- Ghibli API -----------------------
  const [data, setData] = useState([]);

  useEffect( () => {
      fetch(`https://ghibliapi.herokuapp.com/films/${movie}`)
      .then((response) => response.json())
      .then(setData)
      .catch(error => {
        alert("Ghibli API GET failed...");
      });
  }, [movie]);

  
  useEffect(() => {
    if (initialRender.current) {
      return
    } else {
    // console.log("useEffect updateBg() is working");
      updateBg();
  }}, [data, setData])


  //--------------Movie BG-------------------------
  // console.log(data);
  // console.log(data.title);

  const updateBg = () => {
    const movieBg = document.getElementById('video-clip');
    if (data.title === "Castle in the Sky") {
        movieBg.src="/assets/student-project-01.mp4";
      } else if (data.title === "Kiki's Delivery Service") {
        movieBg.src="/assets/student-project-02.mp4";
      } else if (data.title === "Howl's Moving Castle") {
        movieBg.src="/assets/student-project-03.mp4";
      } else if (data.title === "Spirited Away") {
        movieBg.src="/assets/student-project-04.mp4";
      } else if (data.title === "The Wind Rises") {
        movieBg.src="/assets/student-project-05.mp4";
      } else {
        movieBg.src="/assets/student-project-06.mp4";
      }
    
    // console.log(movieBg.src);
  }
  
  return (
    <div>
        <main>
        <div className="weather-data">
        <div className="date">
              {dateBuilder(new Date())}
            </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            
            <div className="location">
            {weather.name}, {weather.sys.country}
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
             
              {weather.weather[0].main}
            </div>
          </div>
        </div>
          ) : ('')}
          <div className="search-box-outer">
            <form className="search-box-inner">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter a City Name"
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
            <button
            type="button"
            className="checkBtn"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onClick= {checkInput}
            >Click to Check Weather</button>
            </form>
          </div>
          </div>

          <div className="city-div mt-3">
          **** Recent Search ****
            { city.map(
              (city, index) => {if(index < 8) return <p className="city-list p-1 m-0" key={city._id}>{city.name}</p>}) }
          </div>

          {/* <div className="vidBox">
            <VideoInit id='01'/>
          </div> */}
          
          <div className="toLeft">
            {/* {
              show?<p><BottomBar description={data.description} /></p>:null
            }    */}
            <BottomBar 
              description={data.description}
              title={data.title}
              original_title={data.original_title}
              producer={data.producer}
              release_date={data.release_date}
              running_time={data.running_time}
            />
          </div>
        </main>
    </div>
  );
}

export default Weather;