import React, { useState } from "react";

// Form komponens tartalmazza az input mezőket és a függvényt a koordináták beküldéséhez a szerver oldalra.
export default function Form({ id, onGetData }) {
  const [lat, setLat] = useState('');
  const [lon, setLon] =  useState('');

  // Az időjárási adatok lekérése a szerver oldalról
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { lat, lon };

    try {
      const res = await fetch('/api/weather', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        console.log('Success!');
        const data = await res.json();
        onGetData(id, data);
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form {id}</h2>
      <label htmlFor="lat">Latitude:</label>
      <input 
        type="text"
        name="lat"
        id="lat"
        placeholder="Latitude"
        value={lat}
        onChange={e => setLat(e.target.value)}
        required
        />
      <label htmlFor="lon">Longitude:</label>
      <input 
        type="text"
        name="lon"
        id="lon"
        placeholder="Longitude"
        value={lon}
        onChange={e => setLon(e.target.value)}
        required
        />
      <button
        type="submit">
        Submit
      </button>
    </form>
  );
}