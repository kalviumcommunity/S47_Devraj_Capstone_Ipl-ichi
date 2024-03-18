// Home Page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        setMatches(response.data[0].matches);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.listmatch}>
        {matches.map((match, index) => (
          <div className={styles.team} key={index}>
            
                <article className={styles.card__article}>
                  <img src={match.matchimg} alt="image" className={styles.card__img}/>
                  <div className={styles.card__data}>
                    <span className={styles.card__description}>{match.stadium}</span>
                    <div className={styles.flexteam}>
                    <h2 className={styles.card__title}>{match.team1_short}</h2> <p>vs</p> <h2 className={styles.card__title}>{match.team2_short}</h2>
                    </div>
                    <a href="#" className={styles.card__button}>See Team</a>
                  </div>
                </article>
              
            
          </div>
        ))}
      </div>
      <div className={styles.calender}></div>
      <div className={styles.matchhighlights}></div>
    </div>
  );
};

export default Home;