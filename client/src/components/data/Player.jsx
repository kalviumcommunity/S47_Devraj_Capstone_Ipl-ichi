import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css'; // Import Swiper styles
import './Player.css'; // Import your CSS file
import { useLocation, Link } from 'react-router-dom';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Player = () => {
  const [error, setError] = useState(null);
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [foodd, setFoodData] = useState([]);
  const [fooddatafilter, setFoodDataFilter] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedFoodItem, setSelectedFoodItem] = useState('');
  const [quantity, setQuantity] = useState(1); // Added state for quantity
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  
  const [verifieduser, setVerifieduser] = useState(false);
  const UserToken = localStorage.getItem('JWToken');

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const location = useLocation();
  const { team1_short, team2_short, stadium } = location.state;
  console.log(team1_short, team2_short);
  let stadiumName = stadium;

  const anuj = async (stadiumName) => {
    try {
      const ans = await stadiumName;
      return ans;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it outside the function if needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            'Authorization': `Bearer ${UserToken}`, 
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);
        setVerifieduser(true);
      } catch (error) {
        setVerifieduser(false);
        // console.error('Error fetching data:', error);
        console.log('User not logged in');        
      }
    };

    fetchData();
  }, []);
  // Call the async function and await its result
  useEffect(() => {
    anuj(stadiumName)
      .then((result) => {
        setFoodDataFilter(foodd[0][result]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [stadiumName, foodd]);

  let team1;
  let team2;

  if (team1_short === 'CSK') {
    team1 = 0;
  } else if (team1_short === 'DC') {
    team1 = 1;
  } else if (team1_short === 'GT') {
    team1 = 2;
  } else if (team1_short === 'KKR') {
    team1 = 3;
  } else if (team1_short === 'LSG') {
    team1 = 4;
  } else if (team1_short === 'MI') {
    team1 = 5;
  } else if (team1_short === 'PBKS') {
    team1 = 6;
  } else if (team1_short === 'RR') {
    team1 = 7;
  } else if (team1_short === 'RCB') {
    team1 = 8;
  } else if (team1_short === 'SRH') {
    team1 = 9;
  }

  if (team2_short === 'CSK') {
    team2 = 0;
  } else if (team2_short === 'DC') {
    team2 = 1;
  } else if (team2_short === 'GT') {
    team2 = 2;
  } else if (team2_short === 'KKR') {
    team2 = 3;
  } else if (team2_short === 'LSG') {
    team2 = 4;
  } else if (team2_short === 'MI') {
    team2 = 5;
  } else if (team2_short === 'PBKS') {
    team2 = 6;
  } else if (team2_short === 'RR') {
    team2 = 7;
  } else if (team2_short === 'RCB') {
    team2 = 8;
  } else if (team2_short === 'SRH') {
    team2 = 9;
  }

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('http://localhost:3000/food');
        const foodData = response.data;
        setFoodData(foodData);
      } catch (error) {
        console.error('Error fetching food data:', error);
        setError('Error fetching food data');
      }
    };

    fetchFood();
  }, []);

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

  const handleAddFood = () => {
    // Handle adding the selected food item and quantity to the cart items in local storage
    const newItem = {
      item: selectedFoodItem,
      quantity: quantity,
    };
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Reset selected item and quantity
    setSelectedFoodItem('');
    setQuantity(1);
  };

  useEffect(() => {
    // Fetch cart items from local storage on component mount
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  useEffect(() => {
    // Log cartItems whenever it changes
    console.log('Cart Items:', cartItems);
  }, [cartItems]); // Run this effect whenever cartItems changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    {
      verifieduser ? (
        <div>
      <div className='stadium'>
        <h1>{stadiumName}</h1>
      </div>
      <h1 className="players">Players</h1>
      <div className="flex">
      <div className="team1name">
        <h2>{team1Name}</h2>
        <Swiper effect={'cards'} grabCursor={true} className="mySwiper" modules={[EffectCards]}>
          {team1Players.map((player, index) => (
            <SwiperSlide key={index}>
              <div>
               
                <img src={player.image} alt={player.name} />
                <p className="playerame">{player.name}</p>
                <p className="rolee">{player.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='team2name'>
        <h2>{team2Name}</h2>
        <Swiper effect={'cards'} grabCursor={true} className="mySwiper" modules={[EffectCards]}>
          {team2Players.map((player, index) => (
            <SwiperSlide key={index}>
              <div>
                
                <img src={player.image} alt={player.name} />
                <p className="playerame">{player.name}</p> 
                <p className="rolee">{player.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      <div class="glass-container">
  <select class="select-box" onChange={(e) => setSelectedMealType(e.target.value)}>
    <option value="">Select Meal Type</option>
    {Object.keys(fooddatafilter).map((mealType, index) => (
      <option key={index} value={mealType}>{mealType}</option>
    ))}
  </select>
  <select class="select-box" onChange={(e) => setSelectedFoodItem(e.target.value)}>
    <option value="">Select Food Item</option>
    {selectedMealType && fooddatafilter[selectedMealType].map((foodItem, index) => (
      <option key={index} value={foodItem}>{foodItem}</option>
    ))}
  </select>
  {selectedFoodItem && ( // Conditionally render if food item is selected
    <div>
      <button class="change-button" onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</button>
      <input class="input-text" type="text" value={quantity} readOnly />
      <button class="change-button" onClick={() => setQuantity(quantity + 1)}>+</button>
      <button class="add-button" onClick={handleAddFood}>Add</button> {/* Add button */}
    </div>
  )}
</div>

      <div className='center'>
        <Link to="/cart"><button className='ui-btn'>
          <span>
            Cart
          </span>
          </button></Link>
      </div>
    </div>
      ):(
        <h1>जिस साईत को आप अच्केस करणा चाह राहे है!! उसके लिये आप foreign material hai use करने के लिये लोगिन करे</h1>
      )
    }
    </>
  );
};

export default Player;
