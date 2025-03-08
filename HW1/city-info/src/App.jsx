import React from 'react'
import './App.css'
import placeImg1 from "./assets/images/VeldenPlace1.jpg";
import placeImg2 from "./assets/images/VeldenPlace2.jpg";
import placeImg3 from "./assets/images/VeldenPlace3.jpg";
import placeImg4 from "./assets/images/VeldenPlace4.jpg";

const CityInfo = () => {
  return (
    <div>
      <h1>Velden, Germany</h1>
      <p>Founded in: 889</p>
    </div>
  );
};

const PlaceImages = () => {
  return (
    <div>
      <h2>Intresting places </h2>
      <img className="place-image" src={placeImg1} alt="Place" />
      <img className="place-image" src={placeImg2} alt="Place" />
      <img className="place-image" src={placeImg3} alt="Place" />
      <img className="place-image" src={placeImg4} alt="Place" />
    </div>
  );
};

function App() {
  return (
    <div>
      <CityInfo />
      <PlaceImages />
    </div>
  );
}

export default App;