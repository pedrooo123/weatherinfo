import React, { useState } from "react";

// Form komponens tartalmazza az input mezőket és a függvényt a koordináták beküldéséhez a szerver oldalra.
export default function Form({ id, onGetData }) {
  const [lat, setLat] = useState('');
  const [lon, setLon] =  useState('');
  const [isCancelable, setIsCancelable] = useState(false);

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
        setIsCancelable(true);
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Adatok törlése
//   const handleCancelData = () => {
//     setIsCancelable(false);
//     onGetData(id, null);
//   };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
    <h2 className="text-center mb-3 font-semibold">City Coordinates</h2>

      <div className="grid gap-6 md:grid-cols-2">
          <div className="flex-grow">
            <label htmlFor="lat" className="block text-sm font-medium leading-6 text-gray-900">
              Latitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lat"
                id="lat"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={lat}
                onChange={e => setLat(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex-grow">
            <label htmlFor="lon" className="block text-sm font-medium leading-6 text-gray-900">
              Longitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lon"
                id="lon"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={lon}
                onChange={e => setLon(e.target.value)}
                required
              />
            </div>
          </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
      {/* <button type="button" className="btn-secondary text-sm font-semibold leading-6 text-gray-900" onClick={handleCancelData} disabled={!isCancelable}>
        Cancel
      </button> */}
      <button
        type="submit"
        className="btn-primary w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm "
      >
        Search
      </button>
    </div>
  </form>
  );
}