import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../../axiosConfig";
import LocationPicker from "../LocationPicker";
import "layouts/tables/style.css";

function AddLatheMachineModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [userList, setUserList] = useState([]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    detail_name: "",
    manufacture_date: "",
    factory_number: "",
    registration_number: "",
    installation_location: "",
    technical_condition: "working",
    is_conserved: false,
    conservation_reason: "",
    notes: "",
    responsible_person_id: "",
    author: "",
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
        setFormData((prev) => ({ ...prev, author: meRes.data.id }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

          // Reverse geocoding to get address
          const geocoder = window.google && window.google.maps
            ? new window.google.maps.Geocoder()
            : null;
          if (geocoder) {
            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (results, status) => {
                const address = status === "OK" && results[0]
                  ? results[0].formatted_address
                  : "Manzil topilmadi";

                handleLocationSelect({
                  lat: latitude,
                  lng: longitude,
                  address: address,
                });
              },
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
          alert("Joylashuvni aniqlashda xatolik yuz berdi. Iltimos, xaritadan tanlang.");
        },
      );
    } else {
      alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi.");
    }
  };

  const validateForm = () => {
    const requiredFields = ["company_name", "detail_name", "responsible_person_id"];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      const response = await axiosInstance.post("lathe_machine-list-create/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success message
      alert("Tokarlik dastgohi muvaffaqiyatli yaratildi! QR kod avtomatik yaratildi.");

      // Reset form
      setFormData({
        company_name: "",
        detail_name: "",
        manufacture_date: "",
        factory_number: "",
        registration_number: "",
        installation_location: "",
        technical_condition: "working",
        is_conserved: false,
        conservation_reason: "",
        notes: "",
        responsible_person_id: "",
        author: formData.author, // Keep author ID
        image: null,
        latitude: null,
        longitude: null,
        location_address: "",
      });

      setPreviewImage(null);
      setSelectedLocation(null);

      onSuccess();
      onClose();

    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle validation errors
      if (error.response?.data) {
        const errorData = error.response.data;
        let errorMessage = "Yaratishda xatolik yuz berdi:\n";

        Object.entries(errorData).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errorMessage += `${field}: ${messages.join(", ")}\n`;
          }
        });

        alert(errorMessage);
      } else {
        alert("Yaratish muvaffaqiyatsiz! Iltimos, qayta urinib ko'ring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      company_name: "",
      detail_name: "",
      manufacture_date: "",
      factory_number: "",
      registration_number: "",
      installation_location: "",
      technical_condition: "working",
      is_conserved: false,
      conservation_reason: "",
      notes: "",
      responsible_person_id: "",
      author: formData.author,
      image: null,
      latitude: null,
      longitude: null,
      location_address: "",
    });
    setPreviewImage(null);
    setSelectedLocation(null);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-overlay">
          <div className="modal-container">
            <SoftTypography variant="h5" mb={2}>
              Yangi tokarlik dastgohi qo&#39;shish
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
                      onChange={handleImageChange}
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
                  Korxona nomi *
                  <input
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Detal nomi *
                  <input
                    name="detail_name"
                    value={formData.detail_name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Ishlab chiqarilgan sana
                  <input
                    type="date"
                    name="manufacture_date"
                    value={formData.manufacture_date}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Zavod raqami
                  <input
                    name="factory_number"
                    value={formData.factory_number}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Ro&#39;yxat raqami
                  <input
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  O&#39;rnatilgan joyi
                  <input
                    name="installation_location"
                    value={formData.installation_location}
                    onChange={handleChange}
                  />
                </label>

                {/* Technical Condition */}
                <label>
                  Holati
                  <select
                    name="technical_condition"
                    onChange={handleChange}
                    value={formData.technical_condition}
                  >
                    <option value="working">Soz</option>
                    <option value="faulty">Nosoz</option>
                  </select>
                </label>

                {/* Conservation */}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_conserved"
                    checked={formData.is_conserved}
                    onChange={handleChange}
                  />
                  Konservatsiyaga olingan
                </label>

                {formData.is_conserved && (
                  <label>
                    Konservatsiya sababi
                    <input
                      name="conservation_reason"
                      value={formData.conservation_reason}
                      onChange={handleChange}
                    />
                  </label>
                )}

                {/* Notes */}
                <label>
                  Tavsiyalar
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </label>

                {/* Responsible Person */}
                <label>
                  Mas&#39;ul shaxs *
                  <select
                    name="responsible_person_id"
                    value={formData.responsible_person_id}
                    onChange={handleChange}
                    required
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
                        📍  Joriy joylashuvni olish
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowLocationPicker(true)}
                        className="location-btn map-select"
                      >
                     🗺️   Xaritadan tanlash
                      </button>
                    </div>
                  )}
                </div>

                <input type="hidden" name="author" value={formData.author} />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Bekor qilish
              </button>
              <button
                className="reset-btn"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Tozalash
              </button>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saqlanmoqda..." : "Qo'shish"}
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

AddLatheMachineModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddLatheMachineModal;