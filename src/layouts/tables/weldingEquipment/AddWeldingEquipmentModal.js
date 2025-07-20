import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";

function AddWeldingEquipmentModal({ open, onClose, onSuccess }) {
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
      setFormData({
        ...formData,
        image: file,
      });
    }
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

      // Append all fields including the image
      Object.keys(formData).forEach(key => {
        if (key === "manufacture_date" && formData[key]) {
          formDataToSend.append(key, new Date(formData[key]).toISOString().split("T")[0]);
        } else if (key === "is_conserved") {
          formDataToSend.append(key, formData[key] ? "true" : "false");
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axiosInstance.post(
        "https://api.ppr.vchdqarshi.uz/api/welding_equipment-list-create/",
        formDataToSend);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert(`Xatolik yuz berdi: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi payvandlash uskunasi qo&#39;shish</SoftTypography>

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
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Detal nomi
                <input
                  name="detail_name"
                  value={formData.detail_name}
                  onChange={handleChange}
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

              <label>
                Holati
                <select
                  name="technical_condition"
                  value={formData.technical_condition}
                  onChange={handleChange}
                >
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
                    value={formData.conservation_reason}
                    onChange={handleChange}
                  />
                </label>
              )}

              <label>
                Mas&#39;ul shaxs ID
                <input
                  type="number"
                  name="responsible_person"
                  value={formData.responsible_person}
                  onChange={handleChange}
                />
              </label>

              <label>
                Muallif ID
                <input
                  type="number"
                  name="author"
                  value={formData.author}
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

AddWeldingEquipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddWeldingEquipmentModal;