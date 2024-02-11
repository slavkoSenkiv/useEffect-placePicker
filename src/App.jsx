import { useState, useRef, useCallback } from "react";
import logo from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc";
import Modal from "./components/Modal";
import Places from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation";

function getStoredId(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
const localStorageKey = "selectedIDs";
const storedPlaces = getStoredId(localStorageKey).map((storedId) =>
  AVAILABLE_PLACES.find((place) => place.id === storedId)
);

export default function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState(storedPlaces);

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
      if (placesToVisit.some((place) => place.id === placeId)) {
        return prevPlacesToVisit;
      }
      const placeToAdd = AVAILABLE_PLACES.find((place) => place.id === placeId);
      return [...prevPlacesToVisit, placeToAdd];
    });

    const storedIds = getStoredId(localStorageKey);
    if (storedIds.indexOf(placeId) === -1) {
      localStorage.setItem(localStorageKey, JSON.stringify([...storedIds, placeId]));
    }
  }

  function handleStartRemovePlace(placeId) {
    setmodalIsOpen(true);
    selectedPlace.current = placeId;
  }

  function handleStopRemovePlace() {
    setmodalIsOpen(false);
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPlacesToVisit((prevPlacesToVisit) =>
      prevPlacesToVisit.filter((place) => place.id !== selectedPlace.current)
    );
    setmodalIsOpen(false);

    const storedIds = getStoredId(localStorageKey);
    localStorage.setItem(localStorageKey, JSON.stringify(
      storedIds.filter((storedId) => storedId != selectedPlace.current)
    ))
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onConfirm={handleRemovePlace}
          onCancel={handleStopRemovePlace}
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
