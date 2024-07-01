import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './PlayerData.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

// export default function Player() {
//   const { teamShortName } = useParams(); // Get the teamShortName from URL params
//   const [teamData, setTeamData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch team data using the teamShortName from URL params
//         const response = await axios.get(`http://localhost:3000/`);
//         setTeamData(response.data);
//       } catch (error) {
//         console.error('Error fetching team data: ', error);
//         // Handle error
//       }
//     };

//     fetchData();
//   }, [teamShortName]); // Include teamShortName in the dependency array

//   return (
//     <div>
//       {teamData && (
//         <div>
//           <h2>{teamData.teamName}</h2>
//           {/* Display team information */}
//           <div>
//             <p>Team information: {teamData.info}</p>
//           </div>
//           {/* Display team images */}
//           <div>
//             {teamData.images.map((image, index) => (
//               <img key={index} src={image} alt={`Image ${index}`} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';


// function PlayerList() {
//   const [players, setPlayers] = useState([]);
//   const [team,setTeam] = useState()
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { match1 } = useParams(); 
//   console.log(match1)
  

//   useEffect(() => {
//     console.log(location.state);
//   }, [location.state]);
  
//   useEffect(() => {
//     async function fetchPlayerData() {
//       try {
//         const response = await axios.get('http://localhost:3000/player/');
//         const teams = response.data;
//         const teamData = await teams[0].teams[0].team
//         const teamPlayers = await teams[0].teams[0].players
//         setPlayers(teamPlayers)
//         setTeam(teamData)

//         // Find the team with the name "CSK"
//       } catch (error) {
//         setError('Error fetching player data: ' + error.message);
//       }
//     }

//     fetchPlayerData();
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       {/* <h2>{team}</h2> */}
//       <h1>{match1}</h1>
//       {/* <h1>{match2}</h1> */}
    
//     <div>
//       <h1>{team} Players</h1>
//       <div>
//         {players.map((player, index) => (
//           <div key={index} className="player-card">
//             <img src={player.image} alt={player.name} className="player-image" />
//             <h3>{player.name}</h3>
//             <p>{player.role}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// }

// export default PlayerList;

