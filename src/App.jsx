import { useState, useRef, useCallback } from "react";
import logo from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc";
import Modal from "./components/Modal";
import Places from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation";

function getStoredIds(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
const localStorageKey = "selectedIDs";
const storedPlaces = getStoredIds(localStorageKey).map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

export default function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );
    setAvailablePlaces(sortedPlaces);
  });

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const placeToAdd = AVAILABLE_PLACES.find((place) => place.id === id);
      return [...prevPickedPlaces, placeToAdd];
    });

    const storedIds = getStoredIds(localStorageKey);
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(localStorageKey, JSON.stringify([...storedIds, id]));
    }
  }



  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = getStoredIds(localStorageKey);
    localStorage.setItem(localStorageKey, JSON.stringify(
      storedIds.filter((id) => id != selectedPlace.current)
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
        places={pickedPlaces}
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
