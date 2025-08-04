// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import Modal from "@mui/material/Modal";
// import SoftTypography from "components/SoftTypography";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import axiosInstance from "../../../axiosConfig";
// import LocationPicker from "../LocationPicker";
// import "layouts/tables/style.css";
//
// function EditWeldingEquipmentModal({ open, onClose, data, onSuccess }) {
//   const [previewImage, setPreviewImage] = useState(null);
//   const [userList, setUserList] = useState([]);
//   const [showLocationPicker, setShowLocationPicker] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//
//   const [formData, setFormData] = useState({
//     company_name: "",
//     detail_name: "",
//     manufacture_date: "",
//     factory_number: "",
//     registration_number: "",
//     installation_location: "",
//     technical_condition: "working",
//     is_conserved: false,
//     conservation_reason: "",
//     responsible_person_id: "",
//     author: 0,
//     image: null,
//     latitude: null,
//     longitude: null,
//     location_address: "",
//   });
//
//   useEffect(() => {
//     if (data) {
//       setFormData({
//         ...data,
//         responsible_person_id: data.responsible_person?.id || "",
//         manufacture_date: data.manufacture_date || "",
//         image: null,
//         latitude: data.latitude || null,
//         longitude: data.longitude || null,
//         location_address: data.location_address || "",
//       });
//       setPreviewImage(data.image || null);
//       setSelectedLocation({
//         lat: data.latitude || null,
//         lng: data.longitude || null,
//         address: data.location_address || "",
//       });
//     }
//   }, [data]);
//
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axiosInstance.get("users/");
//         setUserList(res.data.results);
//       } catch (error) {
//         console.error("Foydalanuvchilarni yuklashda xatolik:", error);
//       }
//     };
//     fetchUsers();
//   }, []);
//
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };
//
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setFormData((prev) => ({ ...prev, image: file }));
//     }
//   };
//
//   const handleLocationSelect = (locationData) => {
//     setSelectedLocation(locationData);
//     setFormData((prev) => ({
//       ...prev,
//       latitude: locationData.lat,
//       longitude: locationData.lng,
//       location_address: locationData.address || "",
//     }));
//     setShowLocationPicker(false);
//   };
//
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const geocoder =
//             window.google && window.google.maps ? new window.google.maps.Geocoder() : null;
//
//           if (geocoder) {
//             geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
//               const address =
//                 status === "OK" && results[0] ? results[0].formatted_address : "Manzil topilmadi";
//               handleLocationSelect({
//                 lat: latitude,
//                 lng: longitude,
//                 address,
//               });
//             });
//           } else {
//             handleLocationSelect({
//               lat: latitude,
//               lng: longitude,
//               address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
//             });
//           }
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           alert("Joylashuvni aniqlashda xatolik yuz berdi.");
//         }
//       );
//     } else {
//       alert("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
//     }
//   };
//
//   const handleSubmit = async () => {
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (key === "manufacture_date" && formData[key]) {
//           formDataToSend.append(key, new Date(formData[key]).toISOString().split("T")[0]);
//         } else if (key === "is_conserved") {
//           formDataToSend.append(key, formData[key] ? "true" : "false");
//         } else if (key === "image" && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//
//       await axiosInstance.put(`welding_equipment-detail/${data.id}/`, formDataToSend);
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Update error:", error.response?.data || error.message);
//       alert(`Xatolik: ${error.response?.data?.detail || error.message}`);
//     }
//   };
//
//   return (
//     <>
//       <Modal open={open} onClose={onClose}>
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <SoftTypography variant="h5" mb={2}>
//               Payvandlash uskunasini tahrirlash
//             </SoftTypography>
//
//             <div className="modal-content">
//               <div className="form-grid">
//                 <div className="image-upload-container">
//                   <label className="image-upload-label">
//                     <input
//                       type="file"
//                       name="image"
//                       accept="image/*"
//                       className="image-upload-input"
//                       onChange={handleImageChange}
//                     />
//                     <CloudUploadIcon />
//                     <span>Rasmni almashtirish uchun bosing</span>
//                     {previewImage && (
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="image-preview"
//                         style={{ display: "block" }}
//                       />
//                     )}
//                   </label>
//                 </div>
//
//                 <label>Korxona nomi<input name="company_name" value={formData.company_name} onChange={handleChange} /></label>
//                 <label>Detal nomi<input name="detail_name" value={formData.detail_name} onChange={handleChange} /></label>
//                 <label>Ishlab chiqarilgan sana<input type="date" name="manufacture_date" value={formData.manufacture_date} onChange={handleChange} /></label>
//                 <label>Zavod raqami<input name="factory_number" value={formData.factory_number} onChange={handleChange} /></label>
//                 <label>Ro‘yxat raqami<input name="registration_number" value={formData.registration_number} onChange={handleChange} /></label>
//                 <label>O‘rnatilgan joyi<input name="installation_location" value={formData.installation_location} onChange={handleChange} /></label>
//                 <label>Holati
//                   <select name="technical_condition" value={formData.technical_condition} onChange={handleChange}>
//                     <option value="working">Soz</option>
//                     <option value="faulty">Nosoz</option>
//                   </select>
//                 </label>
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="is_conserved"
//                     checked={formData.is_conserved}
//                     onChange={handleChange}
//                   />
//                   Konservatsiyaga olingan
//                 </label>
//                 {formData.is_conserved && (
//                   <label>Konservatsiya sababi<input name="conservation_reason" value={formData.conservation_reason} onChange={handleChange} /></label>
//                 )}
//                 <label>Mas’ul shaxs
//                   <select name="responsible_person_id" value={formData.responsible_person_id} onChange={handleChange}>
//                     <option value="">Tanlang</option>
//                     {userList.map((user) => (
//                       <option key={user.id} value={user.id}>
//                         {user.name} ({user.username})
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//
//                 {/* 📍 Location Picker UI */}
//                 <div className="location-section" style={{ gridColumn: "1 / -1" }}>
//                   <h4>Joylashuv</h4>
//                   {selectedLocation ? (
//                     <div className="selected-location">
//                       <p><strong>Tanlangan joylashuv:</strong></p>
//                       <p>Kenglik: {typeof selectedLocation.lat === "number" ? selectedLocation.lat.toFixed(6) : "—"}</p>
//                       <p>Uzunlik: {typeof selectedLocation.lng === "number" ? selectedLocation.lng.toFixed(6) : "—"}</p>
//                       {selectedLocation.address && <p>Manzil: {selectedLocation.address}</p>}
//                       <button type="button" onClick={() => setSelectedLocation(null)} className="clear-location-btn">
//                         Joylashuvni tozalash
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="location-buttons">
//                       <button type="button" onClick={getCurrentLocation} className="location-btn current-location">
//                         📍 Joriy joylashuvni olish
//                       </button>
//                       <button type="button" onClick={() => setShowLocationPicker(true)} className="location-btn map-select">
//                         🗺️ Xaritadan tanlash
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//
//             <div className="modal-actions">
//               <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
//               <button className="submit-btn" onClick={handleSubmit}>Saqlash</button>
//             </div>
//           </div>
//         </div>
//       </Modal>
//
//       {showLocationPicker && (
//         <LocationPicker
//           open={showLocationPicker}
//           onClose={() => setShowLocationPicker(false)}
//           onLocationSelect={handleLocationSelect}
//         />
//       )}
//     </>
//   );
// }
//
// EditWeldingEquipmentModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   data: PropTypes.object.isRequired,
//   onSuccess: PropTypes.func.isRequired,
// };
//
// export default EditWeldingEquipmentModal;



// EditWeldingEquipmentModal.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";
import LocationPicker from "../LocationPicker";
import "layouts/tables/style.css";

function EditWeldingEquipmentModal({ open, onClose, data, onSuccess }) {
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
    is_conserved: false,
    conservation_reason: "",
    responsible_person_id: "",
    author: 0,
    image: null,
    latitude: null,
    longitude: null,
    location_address: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        responsible_person_id: data.responsible_person?.id || "",
        manufacture_date: data.manufacture_date || "",
        image: null, // clear image unless user uploads
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        location_address: data.location_address || "",
      });
      setPreviewImage(data.image || null);
      setSelectedLocation({
        lat: data.latitude || null,
        lng: data.longitude || null,
        address: data.location_address || "",
      });
    }
  }, [data]);

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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // For preview only
      };
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
                address,
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
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (key === "manufacture_date") {
            formDataToSend.append(key, new Date(value).toISOString().split("T")[0]);
          } else if (key === "is_conserved") {
            formDataToSend.append(key, value ? "true" : "false");
          } else if (key === "image") {
            if (value instanceof File) {
              formDataToSend.append(key, value); // Only if image is a File
            }
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      await axiosInstance.put(`welding_equipment-detail/${data.id}/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert(`Xatolik: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-overlay">
          <div className="modal-container">
            <SoftTypography variant="h5" mb={2}>
              Payvandlash uskunasini tahrirlash
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
                    <span>Rasmni almashtirish uchun bosing</span>
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
                  <label>Konservatsiya sababi<input name="conservation_reason" value={formData.conservation_reason} onChange={handleChange} /></label>
                )}
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

                {/* 📍 Location Picker UI */}
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

EditWeldingEquipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditWeldingEquipmentModal;
