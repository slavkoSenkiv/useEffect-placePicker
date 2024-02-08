import { useState } from "react";
import logo from "./assets/logo.png";
import { AVAILABLE_PLACES } from "./data";
import { sortPlacesByDistance } from "./loc";
import Modal from "./components/Modal";
import Places from "./components/Places";
import DeleteConfirmation from "./components/DeleteConfirmation";

export default function App() {
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [placeToRemove, setPlaceToRemove] = useState();

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
      const placeToAdd = AVAILABLE_PLACES.find((place) => place.id === placeId);
      return [...prevPlacesToVisit, placeToAdd];
    });
  }

  function handleStartRemovePlace(placeId) {
    setModalOpen(true);
    setPlaceToRemove(placeId);
  }

  function handleRomovePlace(placeId) {
    setPlacesToVisit((prevPlacesToVisit) => {
      const updatedPlacesToVisit = prevPlacesToVisit.filter(
        (place) => place.id != placeId
      );
      return updatedPlacesToVisit;
    });
    setPlaceToRemove();
    setModalOpen(false);
  }

  return (
    <>
      <Modal open={modalOpen}>
        <DeleteConfirmation
          onConfirm={handleRomovePlace}
          onCancel={() => setModalOpen(false)}
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
