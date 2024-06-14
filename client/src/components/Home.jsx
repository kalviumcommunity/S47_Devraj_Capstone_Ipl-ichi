import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Home.module.css';
import TerminalLoader from './TerminalLoader';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchResponse = await axios.get('http://localhost:3000/');
        setMatches(matchResponse.data[0].matches);

        const newsResponse = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=1c1fd78b22794f30878e63a99a5a113b');
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

  const toggleMatchesDisplay = () => {
    setVisibleMatches(visibleMatches === 5 ? (dateSelected ? matches.filter(match => new Date(match.date).toDateString() === date.toDateString()).length : matches.length) : 5);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDateSelected(true);
    setVisibleMatches(5);
  };

  const handledetails=(e)=>{
    console.log(e.target)
    
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TerminalLoader isLoading={loading} fullScreen={loading} />

      <div className={styles.main}>
        <div className={styles.listmatch}>
          {matches
            .filter((match) => {
              return !dateSelected || new Date(match.date).toDateString() === date.toDateString();
            })
            .slice(0, visibleMatches)
            .map((match, index) => (
              <div className={styles.team} key={index}>
                <article className={styles.card__article}>
                  <img src={match.matchimg} alt="Match" className={styles.card__img}/>
                  <div className={styles.card__data}>
                    <span className={styles.card__description}>{match.stadium}</span>
                    <div className={styles.flexteam}>
                      <h2 className={styles.card__title}>{match.team1_short}</h2> <p>vs</p> <h2 className={styles.card__title}>{match.team2_short}</h2>
                    </div>
                    {/* Use Link to navigate to Player component with team short names as route params */}
                    <button onClick={handledetails}>seeTeam</button>
                    <Link to={{ pathname: '/player', state: { match1: match.team1_short } }} className={styles.card__button}>See Team</Link>


                  </div>
                </article>
              </div>
            ))}
          <button onClick={toggleMatchesDisplay} className={styles.toggleButton} role="button">
            {visibleMatches > 5 || (!dateSelected && visibleMatches >= matches.length) ? 'Show Less' : 'See All'}
          </button>
        </div>

        <div className={`${styles.calendar} ${styles.calendarWrapper} ${styles.calendarCustomPosition}`}>
          <Calendar onChange={handleDateChange} value={date} />
        </div>

      </div>

      <div className={styles.matchhighlights}>
        {news.slice(0, 5).map((article, index) => (
          <div key={index} className={`${styles.newsItem} ${index % 2 === 0 ? styles.largeNewsItem : styles.smallNewsItem}`}>
            <h3>{article.title}</h3>
            <div className={styles.newsContent}>
              <p>{article.description}</p>
              <img src={article.urlToImage} alt="News" className={styles.newsImage}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;