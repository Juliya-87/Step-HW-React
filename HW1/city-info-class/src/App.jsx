import React from "react"; // ✅ Добавлен импорт React
import "./App.css";

import placeImg1 from "./assets/images/VeldenPlace1.jpg";
import placeImg2 from "./assets/images/VeldenPlace2.jpg";
import placeImg3 from "./assets/images/VeldenPlace3.jpg";
import placeImg4 from "./assets/images/VeldenPlace4.jpg";

class CityInfo extends React.Component {
  render() {
    return (
      <div>
        <h1>Velden, Germany</h1>
        <p>Founded in: 889</p>
      </div>
    );
  }
}

class PlaceImages extends React.Component {
  render() {
    return (
      <div>
        <h2>Interesting places</h2>
        <img className="place-image" src={placeImg1} alt="Place 1" />
        <img className="place-image" src={placeImg2} alt="Place 2" />
        <img className="place-image" src={placeImg3} alt="Place 3" />
        <img className="place-image" src={placeImg4} alt="Place 4" />
      </div>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CityInfo />
        <PlaceImages />
      </div>
    );
  }
}
