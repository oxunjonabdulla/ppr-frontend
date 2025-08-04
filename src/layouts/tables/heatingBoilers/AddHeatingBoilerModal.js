import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../../axiosConfig";
import "layouts/tables/style.css";
import LocationPicker from "../LocationPicker";
function AddHeatingBoilerModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [userList, setUserList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    detail_name: "",
    manufacture_date: "",
    factory_number: "",
    registration_number: "",
    installation_location: "",
    technical_condition: "working",
    fuel_type: "",
    responsible_person_id: "",
    image: null,
    latitude: null,
    longitude: null,
    location_address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, meRes] = await Promise.all([
          axiosInstance.get("users/"),
          axiosInstance.get("user/me/"),
        ]);
        setUserList(usersRes.data.results);
        setCurrentUserId(meRes.data.id);
      } catch (error) {
        console.error("Foydalanuvchilarni olishda xatolik:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData);
    setFormData((prev) => ({
      ...prev,
      latitude: locationData.lat,
      longitude: locationData.lng,
      location_address: locationData.address || "",
    }));
    setShowLocationPicker(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder =
            window.google && window.google.maps
              ? new window.google.maps.Geocoder()
              : null;

          if (geocoder) {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                const address =
                  status === "OK" && results[0]
                    ? results[0].formatted_address
                    : "Manzil topilmadi";

                handleLocationSelect({
                  lat: latitude,
                  lng: longitude,
                  address: address,
                });
              }
            );
          } else {
            handleLocationSelect({
              lat: latitude,
              lng: longitude,
              address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Joylashuvni aniqlashda xatolik yuz berdi.");
        }
      );
    } else {
      alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi.");
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      if (currentUserId) {
        formDataToSend.append("author", currentUserId);
      }

      await axiosInstance.post("heating_boiler-list-create/", formDataToSend);
      alert("Isitish qozoni muvaffaqiyatli qo‘shildi.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Yaratishda xatolik:", error);
      alert("Yaratish muvaffaqiyatsiz! Iltimos, tizimga qayta kiring.");
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-overlay">
          <div className="modal-container">
            <SoftTypography variant="h5" mb={2}>
              Yangi isitish qozoni qo‘shish
            </SoftTypography>

            <div className="modal-content">
              <div className="form-grid">
                {/* Image Upload */}
                <div className="image-upload-container">
                  <label className="image-upload-label">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="image-upload-input"
                      onChange={handleChange}
                    />
                    <CloudUploadIcon />
                    <span>Rasm yuklash uchun bosing</span>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="image-preview"
                        style={{ display: "block" }}
                      />
                    )}
                  </label>
                </div>

                {/* Form Fields */}
                <label>
                  Korxona nomi
                  <input name="company_name" onChange={handleChange} />
                </label>
                <label>
                  Detal nomi
                  <input name="detail_name" onChange={handleChange} />
                </label>
                <label>
                  Ishlab chiqarilgan sana
                  <input
                    type="date"
                    name="manufacture_date"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Zavod raqami
                  <input name="factory_number" onChange={handleChange} />
                </label>
                <label>
                  Ro‘yxat raqami
                  <input name="registration_number" onChange={handleChange} />
                </label>
                <label>
                  O‘rnatilgan joyi
                  <input
                    name="installation_location"
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Holati
                  <select
                    name="technical_condition"
                    onChange={handleChange}
                    defaultValue="working"
                  >
                    <option value="working">Soz</option>
                    <option value="faulty">Nosoz</option>
                  </select>
                </label>

                <label>
                  Yoqilg‘i turi
                  <input name="fuel_type" onChange={handleChange} />
                </label>

                <label>
                  Mas&#39;ul shaxs
                  <select
                    name="responsible_person_id"
                    value={formData.responsible_person_id}
                    onChange={handleChange}
                  >
                    <option value="">Tanlang</option>
                    {userList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.username})
                      </option>
                    ))}
                  </select>
                </label>

                {/* Location Section */}
                <div className="location-section" style={{ gridColumn: "1 / -1" }}>
                  <h4>Joylashuv</h4>

                  {selectedLocation ? (
                    <div className="selected-location">
                      <p><strong>Tanlangan joylashuv:</strong></p>
                      <p>Kenglik: {selectedLocation.lat.toFixed(6)}</p>
                      <p>Uzunlik: {selectedLocation.lng.toFixed(6)}</p>
                      {selectedLocation.address && (
                        <p>Manzil: {selectedLocation.address}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedLocation(null)}
                        className="clear-location-btn"
                      >
                        Joylashuvni tozalash
                      </button>
                    </div>
                  ) : (
                    <div className="location-buttons">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="location-btn current-location"
                      >
                        📍 Joriy joylashuvni olish
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLocationPicker(true)}
                        className="location-btn map-select"
                      >
                        🗺️ Xaritadan tanlash
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={onClose}>
                Bekor qilish
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Qo‘shish
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <LocationPicker
          open={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </>
  );
}

AddHeatingBoilerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddHeatingBoilerModal;
