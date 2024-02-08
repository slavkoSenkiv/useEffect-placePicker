import { useState, useRef, useEffect } from "react";
import logo from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc";
import Modal from "./components/Modal";
import Places from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation";

//todo add grab selected places from cache if any there

export default function App() {
  const selectedPlace = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState([]);
  //const [placeToRemoveId, setPlaceToRemoveId] = useState(); //?

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );
    setAvailablePlaces(sortedPlaces);
  });

  function handleSelectPlace(placeId) {
    setPlacesToVisit((prevPlacesToVisit) => {
      //todo add case if place is already selected
      const placeToAdd = AVAILABLE_PLACES.find((place) => place.id === placeId);
      return [...prevPlacesToVisit, placeToAdd];

      // todo add place to cache
    });
  }

  function handleStartRemovePlace(placeId) {
    setModalOpen(true);
    selectedPlace.current = placeId;
    //setPlaceToRemoveId(placeId);
  }

  function handleStartRemovePlace() {
    setModalOpen(false);
  }

  function handleRemovePlace() {
    setPlacesToVisit((prevPlacesToVisit) => {
      prevPlacesToVisit.filter((place) => place.id !== selectedPlace.current);
    });
    //setPlaceToRemoveId();
    setModalOpen(false);

    // todo remove place from cache
  }

  return (
    <>
      <Modal open={modalOpen}>
        <DeleteConfirmation
          onConfirm={handleRemovePlace}
          onCancel={handleStartRemovePlace}
        />
      </Modal>
      <header>
        <img src={logo} alt="" />
        <h1>Placepiker</h1>
        <p>Some long text here to describe what this app is about</p>
      </header>

      <Places
        categoryTitle="I'd like to visit"
        fallbackText="Select the place you want to visit"
        places={placesToVisit}
        onSelect={handleStartRemovePlace}
      />

      <Places
        categoryTitle="Available places"
        fallbackText="Sorting available places for you"
        places={availablePlaces}
        onSelect={handleSelectPlace}
      />
    </>
  );
}
