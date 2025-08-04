import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../../axiosConfig";
import LocationPicker from "../LocationPicker";
import "layouts/tables/style.css";

function EditPressureVesselModal({ open, onClose, item, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [userList, setUserList] = useState([]);
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
    category_name: "",
    responsible_person_id: 0,
    author: 0,
    image: null,
    latitude: null,
    longitude: null,
    location_address: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        company_name: item.company_name || "",
        detail_name: item.detail_name || "",
        manufacture_date: item.manufacture_date || "",
        factory_number: item.factory_number || "",
        registration_number: item.registration_number || "",
        installation_location: item.installation_location || "",
        technical_condition: item.technical_condition || "working",
        category_name: item.category_name || "",
        responsible_person_id: item.responsible_person?.id || item.responsible_person_id || 0,
        author: localStorage.getItem("userId") || item.author || 0,
        image: null,
        latitude: item.latitude || null,
        longitude: item.longitude || null,
        location_address: item.location_address || "",
      });

      setPreviewImage(item.image || null);

      setSelectedLocation({
        lat: item.latitude ? Number(item.latitude) : null,
        lng: item.longitude ? Number(item.longitude) : null,
        address: item.location_address || "",
      });
    }
  }, [item]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("users/");
        setUserList(res.data.results);
      } catch (error) {
        console.error("Foydalanuvchilarni yuklashda xatolik:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
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
            window.google && window.google.maps ? new window.google.maps.Geocoder() : null;

          if (geocoder) {
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
              const address =
                status === "OK" && results[0] ? results[0].formatted_address : "Manzil topilmadi";

              handleLocationSelect({
                lat: latitude,
                lng: longitude,
                address: address,
              });
            });
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
      alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "manufacture_date" && formData[key]) {
          formDataToSend.append(key, new Date(formData[key]).toISOString().split("T")[0]);
        } else if (key === "image") {
          if (formData.image) {
            formDataToSend.append("image", formData.image);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axiosInstance.put(`pressure_vessel-detail/${item.id}/`, formDataToSend);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error.response?.data || error.message);
      alert(`Xatolik yuz berdi: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-overlay">
          <div className="modal-container">
            <SoftTypography variant="h5" mb={2}>
              Bosim idishini tahrirlash
            </SoftTypography>

            <div className="modal-content">
              <div className="form-grid">
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
                    <span>Rasmni yangilash uchun bosing</span>
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

                <label>Korxona nomi<input name="company_name" value={formData.company_name} onChange={handleChange} /></label>
                <label>Detal nomi<input name="detail_name" value={formData.detail_name} onChange={handleChange} /></label>
                <label>Ishlab chiqarilgan sana<input type="date" name="manufacture_date" value={formData.manufacture_date} onChange={handleChange} /></label>
                <label>Zavod raqami<input name="factory_number" value={formData.factory_number} onChange={handleChange} /></label>
                <label>Ro‘yxat raqami<input name="registration_number" value={formData.registration_number} onChange={handleChange} /></label>
                <label>O‘rnatilgan joyi<input name="installation_location" value={formData.installation_location} onChange={handleChange} /></label>
                <label>Holati
                  <select name="technical_condition" value={formData.technical_condition} onChange={handleChange}>
                    <option value="working">Soz</option>
                    <option value="faulty">Nosoz</option>
                  </select>
                </label>
                <label>Sig‘im kategoriyasi<input name="category_name" value={formData.category_name} onChange={handleChange} /></label>
                <label>Mas’ul shaxs
                  <select name="responsible_person_id" value={formData.responsible_person_id} onChange={handleChange}>
                    <option value="">Tanlang</option>
                    {userList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.username})
                      </option>
                    ))}
                  </select>
                </label>

                {/* 📍 Location Picker Section */}
                <div className="location-section" style={{ gridColumn: "1 / -1" }}>
                  <h4>Joylashuv</h4>
                  {selectedLocation ? (
                    <div className="selected-location">
                      <p><strong>Tanlangan joylashuv:</strong></p>
                      <p>Kenglik: {typeof selectedLocation.lat === "number" ? selectedLocation.lat.toFixed(6) : "—"}</p>
                      <p>Uzunlik: {typeof selectedLocation.lng === "number" ? selectedLocation.lng.toFixed(6) : "—"}</p>
                      {selectedLocation.address && <p>Manzil: {selectedLocation.address}</p>}
                      <button type="button" onClick={() => setSelectedLocation(null)} className="clear-location-btn">
                        Joylashuvni tozalash
                      </button>
                    </div>
                  ) : (
                    <div className="location-buttons">
                      <button type="button" onClick={getCurrentLocation} className="location-btn current-location">
                        📍 Joriy joylashuvni olish
                      </button>
                      <button type="button" onClick={() => setShowLocationPicker(true)} className="location-btn map-select">
                        🗺️ Xaritadan tanlash
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
              <button className="submit-btn" onClick={handleSubmit}>Saqlash</button>
            </div>
          </div>
        </div>
      </Modal>

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

EditPressureVesselModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditPressureVesselModal;
