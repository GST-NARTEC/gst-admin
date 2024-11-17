import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { MdLocationOn } from "react-icons/md";

const RiyadhLocation = { lat: 24.7136, lng: 46.6753 };

const LocationPicker = ({
  onLocationChange,
  isDisabled,
  defaultLocation = null,
  error = null,
}) => {
  const [mapStates, setMapStates] = useState({
    selectedLocation: defaultLocation,
    searchBox: null,
    currentLocation: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLoc = {
          latitude,
          longitude,
          address: "", // Will be populated by geocoder
        };

        // Get address for current location
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === "OK" && results?.[0]) {
              currentLoc.address = results[0].formatted_address;
              setMapStates((prev) => ({
                ...prev,
                selectedLocation: currentLoc,
                currentLocation: { lat: latitude, lng: longitude },
              }));
              onLocationChange(currentLoc);
            }
          }
        );
      });
    }
  }, []);

  const handleSearchBoxLoad = (ref) => {
    setMapStates((prev) => ({ ...prev, searchBox: ref }));
  };

  const handlePlacesChanged = () => {
    if (mapStates.searchBox) {
      const places = mapStates.searchBox.getPlaces();
      if (places?.[0]) {
        const place = places[0];
        const newLocation = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address,
        };
        setMapStates((prev) => ({ ...prev, selectedLocation: newLocation }));
        onLocationChange(newLocation);
      }
    }
  };

  const handleMarkerDragEnd = (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          const newLocation = {
            latitude,
            longitude,
            address: results[0].formatted_address,
          };
          setMapStates((prev) => ({
            ...prev,
            selectedLocation: newLocation,
            currentLocation: null,
          }));
          onLocationChange(newLocation);
        }
      }
    );
  };

  const handleMapClick = (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK" && results?.[0]) {
          const newLocation = {
            latitude,
            longitude,
            address: results[0].formatted_address,
          };
          setMapStates((prev) => ({
            ...prev,
            selectedLocation: newLocation,
            currentLocation: null,
          }));
          onLocationChange(newLocation);
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={
            mapStates.selectedLocation
              ? {
                  lat: mapStates.selectedLocation.latitude,
                  lng: mapStates.selectedLocation.longitude,
                }
              : mapStates.currentLocation || RiyadhLocation
          }
          zoom={12}
          onClick={handleMapClick}
        >
          <StandaloneSearchBox
            onLoad={handleSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for a location"
              className="absolute left-1/2 -translate-x-1/2 top-4 w-[320px] h-[40px] px-4 py-2 rounded-lg shadow-lg border border-gray-200 outline-none focus:ring-2 focus:ring-navy-600 focus:border-transparent transition-all bg-white/95 backdrop-blur-sm"
            />
          </StandaloneSearchBox>

          {mapStates.currentLocation && (
            <Marker position={mapStates.currentLocation} />
          )}

          {mapStates.selectedLocation && (
            <Marker
              position={{
                lat: mapStates.selectedLocation.latitude,
                lng: mapStates.selectedLocation.longitude,
              }}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 space-y-5">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="text"
              value={mapStates.selectedLocation?.latitude || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white transition-colors"
              placeholder="Latitude"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="text"
              value={mapStates.selectedLocation?.longitude || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white transition-colors"
              placeholder="Longitude"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={mapStates.selectedLocation?.address || ""}
            disabled={isDisabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent outline-none bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            placeholder="Enter street address"
            readOnly
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
