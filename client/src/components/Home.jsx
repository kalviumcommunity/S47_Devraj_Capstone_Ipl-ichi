import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import styles from './Home.module.css';
import styles from './styless.module.css';
import TerminalLoader from './TerminalLoader';
import Player from './data/Player';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [visibleMatches, setVisibleMatches] = useState(4  );
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [stadium, setStadium] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchResponse = await axios.get(import.meta.env.VITE_BACKEND_URL);
        setMatches(matchResponse.data[0].matches);

        const newsResponse = await axios.get(import.meta.env.VITE_NEWS_URL);
        setNews(newsResponse.data.articles);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches
    .filter((match) => !dateSelected || new Date(match.date).toDateString() === date.toDateString())
    .slice(indexOfFirstMatch, indexOfLastMatch);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const toggleMatchesDisplay = () => {
    setVisibleMatches(visibleMatches === 4   ? (dateSelected ? matches.filter(match => new Date(match.date).toDateString() === date.toDateString()).length : matches.length) : 4  );
  };
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDateSelected(true);
    setVisibleMatches(4 );
  };

  const handleDetails = (match) => {
    setDetails({ match1_short: match.team1_short, match2_short: match.team2_short });
    setStadium({stadium: match.stadium});
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
  <div className={styles.firstContainer}>
    <div className={styles.welcomeSide}>
      <h1>Welcome to IPL-Ichi</h1>
      <div className={styles.containerr}>
      <p>Your ultimate destination for</p>
      <section className={styles.animation}>
        <div className={styles.first}><div className={styles.top}><p>Ordering food</p></div></div>
        <div className={styles.second}><div className={styles.top}><p>Getting updates</p></div></div>
        <div className={styles.third}><div className={styles.top}><p>Watching teams...</p></div></div>
      </section>
      </div>
      <div className={styles.flexbtn}>
        <Link to={"/login"}><button className={styles.btn1}>Signup Now</button></Link>
        <button className={styles.btn2}>Learn More</button>
      </div>
    </div>
    <div className={styles.imagesSide}>
      <div className={styles.leftImg}>
        <div className={styles.img1}>
          <img src="https://timesofindia.indiatimes.com/photo/105305185/105305185.jpg" alt=""  />
        </div>
        <div className={styles.img2}>
          <img src="https://mir-s3-cdn-cf.behance.net/projects/404/09cd92144088453.Y3JvcCwxMzY2LDEwNjgsMTYsNTQ.jpg" alt="" />
        </div>
        <div className={styles.img1}>
          <img src="https://i.pinimg.com/736x/6b/cd/4c/6bcd4c18072529db514b325b61812888.jpg" alt="" />
        </div>
      </div>
      
      <div className={styles.rightImg}>
        <div className={styles.img2}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKhOdp3gxYYC-aFtH0bk8VPUQU8eDWSOeXuHf3CjKMUhxD2O2AaT4kDf8nfr-hCAMWA40&usqp=CAU" alt="" />
        </div>
        <div className={styles.img1}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkI9QKxzI4vGXeHYrIlid5vZx43nYEc82VIQ2KSPUldmTIRjEKz87JVhUMTV_GfoIr5E&usqp=CAU" alt="" />
        </div>
        <div className={styles.img2}>
          <img src="https://wallpapers.com/images/hd/rcb-1080-x-1080-background-z9pgdqsrq63ti0g7.jpg" alt="" />
        </div>

        
      </div>

      <div className={styles.img1}>
        <div className="img1">
          <img src="https://i.pinimg.com/736x/ad/89/63/ad89635f5c1687f60fa869986f78eb32.jpg" alt=""  />
        </div>
        <div className={styles.img2}>
          <img src="https://i.pinimg.com/736x/27/6a/17/276a17cf899561e38b30f0ada2ca9699.jpg" alt="" />
        </div>
        <div className={styles.img1}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNh_23VgOmMajEhezfgZ3JH5L9EfC3puLUG4dNkg-EAQVnhPXs_ZkZ_A9FYD7iRXu7F94&usqp=CAU" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div className={styles.secondContainer}>
    <h1>Upcoming Matches</h1>
    <p>Do you wanna go to thrilling experience check it below</p>


<div className={styles.listmatch}>
          {currentMatches.map((match, index) => (
            <div className={styles.team} key={index}>
              <article className={styles.card__article}>
                <img src={match.matchimg} alt="Match" className="card__img" />
                <div className={styles.card__data}>
                  <span className={styles.card__description}>{match.stadium}</span>
                  <div className={styles.flexteam}>
                    <h2 className={styles.card__title}>{match.team1_short}</h2> <p>vs</p> <h2 className={styles.card__title}>{match.team2_short}</h2>
                  </div>
                  <Link to='/player' state={{ team1_short: match.team1_short, team2_short: match.team2_short, stadium: match.stadium }}><button>View Details</button></Link>
                </div>
              </article>
            </div>
          ))}
          
        </div>
        <div className={styles.pagination}>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastMatch >= matches.length}>
              Next
            </button>
          </div>
  </div>

  {/* <div className="thirdContainer">
    <div className="matchCalender">
      <button onClick={() => setShowCalendar(true)}><span>Match Calender</span></button>
    </div>
    <div className="sideFlex">
    <div className="leftSide">
      <img src="https://m.media-amazon.com/images/I/91H0RAmQy7L.jpg" alt="" />
    </div>
    <div className="rightSide">
      <h2>Latest</h2>
      <h2>Cricket</h2>
      <h2>News</h2>
      <h3>Stay updated with the latest headlines</h3>
    </div>
    </div>
    <div className="bottonSide">
      <p>@iplichiUpdates</p>
    </div>
  </div> */}


<div className={styles.thirdContainer}>
    <div className={styles.cal}>
    <div className={`${styles.calendar} ${styles.calendarWrapper} ${styles.calendarCustomPosition}`}>
            <button className={styles.ui} onClick={() => setShowCalendar(true)}><span>Open Calendar</span></button >
            {showCalendar && (
            <div className={styles.calendarPopup}>
              <button  className={styles.ui} onClick={() => setShowCalendar(false)}><span>Close</span></button >
              <button className={styles.ui} onClick={() => {setDateSelected(false); setShowCalendar(false)}}><span>Clear</span></button >
              <Calendar onChange={handleDateChange} value={date} />
            </div>
          )}
        </div>
    </div>
    <div className={styles.sideFlex}>
    <div className={styles.leftSide}>
      <img src="https://m.media-amazon.com/images/I/91H0RAmQy7L.jpg" alt="" />
    </div>
    <div className={styles.rightSide}>
      <h2>Latest</h2>
      <h2>Cricket</h2>
      <h2>News</h2>
      <h3>Stay updated with the latest headlines</h3>
    </div>
    </div>
    <div className={styles.bottonSide}>
      <p>@iplichiUpdates</p>
    </div>
  </div>


  <div className={styles.fourthContainer}>
      <div className={styles.hot}><h1>Hot Sensation</h1></div>
      <div className={styles.cartNews}>
      {news.slice(0, 5).map((article, index) => (
        <div className={styles.outerBox}>
        <img src={article.urlToImage} alt="" />
        <div className={styles.heading}><h2>{article.title}</h2></div>
        <div className={styles.description}>{article.description}</div>
      </div>
        ))}
      </div>
      
  </div>
</div>

  );
};

export default Home;