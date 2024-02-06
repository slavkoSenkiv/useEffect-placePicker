import { useState } from "react";
import logo from "./assets/logo.png";
import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./data";
export default function App() {
  const [placesToVisit, setPlacesToVisit] = useState([]);

  function handleSelectPlace(placeId) {
    setPlacesToVisit((prevPlacesToVisit) => {
      const placeToAdd = AVAILABLE_PLACES.find((place) => place.id === placeId);
      return [...prevPlacesToVisit, placeToAdd];
    });
  }
  
  function handleRomovePlace(placeId) {
    setPlacesToVisit((prevPlacesToVisit) => {
      const updatedPlacesToVisit = prevPlacesToVisit.filter(
        (place) => place.id != placeId
      );
      return updatedPlacesToVisit;
    });
  }

  return (
    <>
      <header>
        <img src={logo} alt="" />
        <h1>Placepiker</h1>
        <p>Some long text here to describe what this app is about</p>
      </header>

      <Places
        categoryTitle="I'd like to visit"
        fallbackText="Select the place you want to visit"
        places={placesToVisit}
        onSelect={handleRomovePlace}
      />

      <Places
        categoryTitle="Available places"
        fallbackText="Sorting available places for you"
        places={AVAILABLE_PLACES}
        onSelect={handleSelectPlace}
      />
    </>
  );
}
