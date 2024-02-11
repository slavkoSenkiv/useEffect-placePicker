export default function Places({
  categoryTitle,
  fallbackText,
  places,
  onSelect,
}) {
  return (
    <section className="places-category">
      <h2>{categoryTitle}</h2>
      {places.length === 0 ? (
        <p className="fallback-text">{fallbackText}</p>
      ) : (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelect(place.id)}>
                <img src={place.image.src} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
