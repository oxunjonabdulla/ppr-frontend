import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import axios from "axios";
import "layouts/tables/style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";

function AddLatheMachineModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
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
    handleChange(e);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formData.author = Number(formData.author);
      formData.responsible_person = Number(formData.responsible_person);

      // Append all fields correctly
      Object.keys(formData).forEach(key => {
        if (key === "image") {
          // Only append if it's a File object
          if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });


      const response = await axiosInstance.post(
        "https://api.ppr.vchdqarshi.uz/api/lathe_machine-list-create/",
        formDataToSend,
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Yaratish muvaffaqiyatsiz! Iltimos, qayta urinib ko'ring.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi tokarlik dastgohi qo&#39;shish</SoftTypography>
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
                    onChange={handleChange}
                  />
                </label>
              )}

              <label>
                Tavsiyalar
                <textarea
                  name="notes"
                  onChange={handleChange}
                  rows={3}
                />
              </label>

              <label>
                Mas&#39;ul shaxs ID
                <input
                  type="number"
                  name="responsible_person"
                  onChange={handleChange}
                />
              </label>

              <label>
                Muallif ID
                <input
                  type="number"
                  name="author"
                  onChange={handleChange}
                />
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

AddLatheMachineModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddLatheMachineModal;