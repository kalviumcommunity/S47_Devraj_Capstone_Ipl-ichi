// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Player = () => {
//   const [players, setPlayers] = useState([]);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { team1_short, team2_short } = location.state; // Access state passed from the link
//   console.log(team1_short, team2_short);

//   let value;

//   if(team1_short == "CSK"){
//     value = 0
//   }else if(team1_short == "DC"){
//     value = 1
//   }else if(team1_short == "GT"){
//     value = 2
//   }else if(team1_short == "KKR"){
//     value = 3
//   }else if(team1_short == "LSG"){
//     value = 4
//   }else if(team1_short == "MI"){
//     value = 5
//   } else if(team1_short == "PBKS"){
//     value = 6
//   }else if(team1_short == "RR"){
//     value = 7
//   } else if(team1_short == "RCB"){
//     value = 8
//   } else if(team1_short == "SRH"){
//     value = 9
//   }



//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/player/');
//         const teams = response.data;
        
//         console.log(teams[0].teams[value])

//         // Find the team with team1_short
//         const team1 = teams.find(team => team.short_name === team1_short);
        

//         // Find the team with team2_short
//         const team2 = teams.find(team => team.short_name === team2_short);
        

//         // Check if teams are found
//         if (!team1 || !team2) {
//           setError('One or both teams not found.');
//           return;
//         }

//         // Combine players from both teams
//         const allPlayers = [...team1.players, ...team2.players];
//         setPlayers(allPlayers);
//       } catch (error) {
//         setError('Error fetching player data: ' + error.message);
//       }
//     };

//     fetchPlayers();
//   }, [team1_short, team2_short]);
  

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Players</h1>
//       <div>
//         {players.map((player, index) => (
//           <div key={index}>
//             <p>{player.name}</p>
//             <p>{player.position}</p>
//             {/* Add other player details as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Player;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// const Player = () => {
//   const [error, setError] = useState(null);
//   const [team1Name,setTeam1Name] = useState()
//   const [team2Name,setTeam2Name] = useState()
//   const [team1Players,setTeam1Players] = useState([])
//   const [team2Players,setTeam2Players] = useState([])
//   const location = useLocation();
//   const { team1_short, team2_short } = location.state; // Access state passed from the link
//   console.log(team1_short, team2_short);

//   let team1;
//   let team2;

//   if(team1_short == "CSK"){
//     team1 = 0
//   }else if(team1_short == "DC"){
//     team1 = 1
//   }else if(team1_short == "GT"){
//     team1 = 2
//   }else if(team1_short == "KKR"){
//     team1 = 3
//   }else if(team1_short == "LSG"){
//     team1 = 4
//   }else if(team1_short == "MI"){
//     team1 = 5
//   } else if(team1_short == "PBKS"){
//     team1 = 6
//   }else if(team1_short == "RR"){
//     team1 = 7
//   } else if(team1_short == "RCB"){
//     team1 = 8
//   } else if(team1_short == "SRH"){
//     team1 = 9
//   }

//   if (team2_short == "CSK"){
//     team2 = 0
//   }else if(team2_short == "DC"){
//     team2 = 1
//   }else if(team2_short == "GT"){
//     team2 = 2
//   }else if(team2_short == "KKR"){
//     team2 = 3
//   }else if(team2_short == "LSG"){
//     team2 = 4
//   }else if(team2_short == "MI"){
//     team2 = 5
//   } else if(team2_short == "PBKS"){
//     team2 = 6
//   }else if(team2_short == "RR"){
//     team2 = 7
//   } else if(team2_short == "RCB"){
//     team2 = 8
//   } else if(team2_short == "SRH"){
//     team2 = 9
//   }



//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/player/');
//         const teams = response.data;
        
//         console.log(teams[0].teams[team1].team)
//         const t1 = await teams[0].teams[team1].team
//         const p1 = await teams[0].teams[team1].players
//         setTeam1Name(t1)
//         setTeam1Players(p1)
//         console.log(teams[0].teams[team1])
//         console.log(teams[0].teams[team2])
//         const t2 = await teams[0].teams[team2].team
//         const p2 = await teams[0].teams[team2].players
//         setTeam2Name(t2)
//         setTeam2Players(p2)


//         if (!team1 || !team2) {
//           setError('One or both teams not found.');
//           return;
//         }

//         // Combine players from both teams
        
//       } catch (error) {
//         setError('Error fetching player data: ' + error.message);
//       }
//     };

//     fetchPlayers();
//   }, [team1_short, team2_short]);
  

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//     <h1>Players</h1>
//     <div>
//       <h2>{team1Name}</h2>
//       {team1Players.map((player, index) => (
//         <div key={index}>
//           <p>{player.name}</p>
//           <p>{player.role}</p>
//           <img src={player.image} alt={player.name} />
//         </div>
//       ))}
//     </div>
//     <div>
//       <h2>{team2Name}</h2>
//       {team2Players.map((player, index) => (
//         <div key={index}>
//           <p>{player.name}</p>
//           <p>{player.role}</p>
//           <img src={player.image} alt={player.name} />
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// };

// export default Player;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css'; // Import Swiper styles
import './Player.css'; // Import your CSS file
import { useLocation } from 'react-router-dom';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
const Player = () => {
  const [error, setError] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const location = useLocation();
  const { team1_short, team2_short,stadium } = location.state; // Access state passed from the link
  console.log(team1_short, team2_short,stadium);

  let team1;
  let team2;

  if (team1_short == "CSK") {
    team1 = 0;
  } else if (team1_short == "DC") {
    team1 = 1;
  } else if (team1_short == "GT") {
    team1 = 2;
  } else if (team1_short == "KKR") {
    team1 = 3;
  } else if (team1_short == "LSG") {
    team1 = 4;
  } else if (team1_short == "MI") {
    team1 = 5;
  } else if (team1_short == "PBKS") {
    team1 = 6;
  } else if (team1_short == "RR") {
    team1 = 7;
  } else if (team1_short == "RCB") {
    team1 = 8;
  } else if (team1_short == "SRH") {
    team1 = 9;
  }

  if (team2_short == "CSK") {
    team2 = 0;
  } else if (team2_short == "DC") {
    team2 = 1;
  } else if (team2_short == "GT") {
    team2 = 2;
  } else if (team2_short == "KKR") {
    team2 = 3;
  } else if (team2_short == "LSG") {
    team2 = 4;
  } else if (team2_short == "MI") {
    team2 = 5;
  } else if (team2_short == "PBKS") {
    team2 = 6;
  } else if (team2_short == "RR") {
    team2 = 7;
  } else if (team2_short == "RCB") {
    team2 = 8;
  } else if (team2_short == "SRH") {
    team2 = 9;
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/player/');
        const teams = response.data;

        const t1 = teams[0].teams[team1].team;
        const p1 = teams[0].teams[team1].players;
        setTeam1Name(t1);
        setTeam1Players(p1);

        const t2 = teams[0].teams[team2].team;
        const p2 = teams[0].teams[team2].players;
        setTeam2Name(t2);
        setTeam2Players(p2);

        if (!team1 || !team2) {
          setError('One or both teams not found.');
          return;
        }
      } catch (error) {
        setError('Error fetching player data: ' + error.message);
      }
    };

    fetchPlayers();
  }, [team1_short, team2_short]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Players</h1>
      <div>
        <h2>{team1Name}</h2>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          className="mySwiper"
          modules={[EffectCards]}
        >
          {team1Players.map((player, index) => (
            <SwiperSlide key={index}>
              <div>
                <p>{player.name}</p>
                <p>{player.role}</p>
                <img src={player.image} alt={player.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <h2>{team2Name}</h2>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          className="mySwiper"
          modules={[EffectCards]}
        >
          {team2Players.map((player, index) => (
            <SwiperSlide key={index}>
              <div>
                <p>{player.name}</p>
                <p>{player.role}</p>
                <img src={player.image} alt={player.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Player;
