import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import axios from "axios";
import "layouts/tables/style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";

function AddHeatingBoilerModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
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
    author: 0,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    handleChange(e); // Your existing change handler
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axiosInstance.post(
        "https://api.ppr.vchdqarshi.uz/api/heating_boiler-list-create/",
        formDataToSend,
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Add error notification
      alert("Yaratish muvaffaqiyatsiz! Ruxsat yo'q (403). Iltimos, tizimga qayta kiring.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi isitish qozoni qo&#39;shish</SoftTypography>
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
                  <CloudUploadIcon /> {/* You can use an icon library or SVG */}
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
                <input type="date" name="manufacture_date" onChange={handleChange} />
              </label>

              <label>
                Zavod raqami
                <input name="factory_number" onChange={handleChange} />
              </label>

              <label>
                Ro&#39;yxat raqami
                <input name="registration_number" onChange={handleChange} />
              </label>

              <label>
                O&#39;rnatilgan joyi
                <input name="installation_location" onChange={handleChange} />
              </label>

              <label>
                Holati
                <select name="technical_condition" onChange={handleChange}>
                  <option value="working">Soz</option>
                  <option value="faulty">Nosoz</option>
                </select>
              </label>

              <label>
                Yoqilg&#39;i turi
                <input name="fuel_type" onChange={handleChange} />
              </label>

              <label>
                Mas&#39;ul shaxs ID
                <input type="number" name="responsible_person" onChange={handleChange} />
              </label>

              <label>
                Muallif ID
                <input type="number" name="author" onChange={handleChange} />
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Bekor qilish
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Qo&#39;shish
            </button>
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
