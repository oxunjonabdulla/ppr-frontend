import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../../axiosConfig";
import "layouts/tables/style.css";

function AddHeatingBoilerModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [userList, setUserList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    detail_name: "",
    manufacture_date: "",
    factory_number: "",
    registration_number: "",
    installation_location: "",
    technical_condition: "working",
    fuel_type: "",
    responsible_person: 0,
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, meRes] = await Promise.all([
          axiosInstance.get("users/"),
          axiosInstance.get("users/me/"),
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

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && !value) return; // skip image if not selected
        formDataToSend.append(key, value);
      });

      if (currentUserId) {
        formDataToSend.append("author", currentUserId);
      }

      await axiosInstance.post("heating_boiler-list-create/", formDataToSend);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Yaratishda xatolik:", error);
      alert("Yaratish muvaffaqiyatsiz! Iltimos, tizimga qayta kiring.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi isitish qozoni qo‘shish</SoftTypography>

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
              <label>Korxona nomi<input name="company_name" onChange={handleChange} /></label>
              <label>Detal nomi<input name="detail_name" onChange={handleChange} /></label>
              <label>Ishlab chiqarilgan sana<input type="date" name="manufacture_date" onChange={handleChange} /></label>
              <label>Zavod raqami<input name="factory_number" onChange={handleChange} /></label>
              <label>Ro‘yxat raqami<input name="registration_number" onChange={handleChange} /></label>
              <label>O‘rnatilgan joyi<input name="installation_location" onChange={handleChange} /></label>

              <label>
                Holati
                <select name="technical_condition" onChange={handleChange} defaultValue="working">
                  <option value="working">Soz</option>
                  <option value="faulty">Nosoz</option>
                </select>
              </label>

              <label>Yoqilg‘i turi<input name="fuel_type" onChange={handleChange} /></label>

              <label>
                Mas’ul shaxs
                <select name="responsible_person" onChange={handleChange} defaultValue="">
                  <option value="">Foydalanuvchini tanlang</option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
            <button className="submit-btn" onClick={handleSubmit}>Qo‘shish</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

AddHeatingBoilerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddHeatingBoilerModal;
