import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function LocationPicker({ open, onClose, onLocationSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const defaultPosition = [41.2995, 69.2401]; // [lat, lng]

  useEffect(() => {
    if (!open) {
      setSelectedLocation(null);
      setAddress("");
      setSearchQuery("");
    }
  }, [open]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uz`
      );
      const data = await res.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Manzil topilmadi");
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setAddress("Manzil topilmadi");
    }
  };

  const SearchLocation = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1&accept-language=uz`
      );
      const data = await res.json();
      if (data?.[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setSelectedLocation({ lat, lng });
        setAddress(data[0].display_name);
      } else {
        alert("Joylashuv topilmadi. Iltimos, boshqa nom bilan qidiring.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Qidirishda xatolik yuz berdi.");
    }
  };

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        reverseGeocode(lat, lng);
      }
    });
    return null;
  }

  const handleLocationConfirm = () => {
    if (selectedLocation) {
      onLocationSelect({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        address
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="location-modal-overlay">
        <div className="location-modal-container">
          <div className="location-modal-header">
            <SoftTypography variant="h5">Joylashuvni tanlang</SoftTypography>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="location-modal-content">
            <form onSubmit={SearchLocation} className="search-box">
              <input
                type="text"
                placeholder="Joylashuvni qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Qidirish
              </button>
            </form>

            <div className="map-container">
              <MapContainer
                center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultPosition}
                zoom={13}
                scrollWheelZoom
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <ClickHandler />
                {selectedLocation && (
                  <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
                )}
              </MapContainer>
            </div>

            {selectedLocation && (
              <div className="location-info">
                <h4>Tanlangan joylashuv:</h4>
                <p>
                  <strong>Kenglik:</strong> {selectedLocation.lat.toFixed(6)}
                </p>
                <p>
                  <strong>Uzunlik:</strong> {selectedLocation.lng.toFixed(6)}
                </p>
                <p>
                  <strong>Manzil:</strong> {address}
                </p>
              </div>
            )}

            <div className="location-instructions">
              <p>• Xaritada kerakli joyni bosing</p>
              <p>• Marker avtomatik qo‘yiladi</p>
              <p>• Qidiruvdan foydalanib joyni aniqlang</p>
            </div>
          </div>

          <div className="location-modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Bekor qilish
            </button>
            <button
              className="confirm-btn"
              onClick={handleLocationConfirm}
              disabled={!selectedLocation}
            >
              Joylashuvni tasdiqlash
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

LocationPicker.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocationSelect: PropTypes.func.isRequired
};

export default LocationPicker;
