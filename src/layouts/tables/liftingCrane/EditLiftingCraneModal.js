import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";

function EditLiftingCraneModal({ open, onClose, item, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    detail_name: "",
    manufacture_date: "",
    factory_number: "",
    registration_number: "",
    installation_location: "",
    technical_condition: "working",
    under_crane_path_length: "",
    crane_width_length: "",
    responsible_person: 0,
    author: 0,
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
        under_crane_path_length: item.under_crane_path_length || "",
        crane_width_length: item.crane_width_length || "",
        responsible_person: item.responsible_person || 0,
        author: item.author || 0,
      });
      setPreviewImage(item.image || null);
    }
  }, [item]);

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "manufacture_date" && formData[key]) {
          formDataToSend.append(key, new Date(formData[key]).toISOString().split("T")[0]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axiosInstance.put(
        `https://api.ppr.vchdqarshi.uz/api/lifting_crane-detail/${item.id}/`,
        formDataToSend
      );

      onSuccess(); // trigger table refresh
      onClose();   // close modal
    } catch (error) {
      console.error("Tahrirlashda xatolik:", error.response?.data || error.message);
      alert("Tahrirlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Ko‘taruv kranni tahrirlash</SoftTypography>
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
              <label>Kran osti yo‘li uzunligi<input name="under_crane_path_length" value={formData.under_crane_path_length} onChange={handleChange} /></label>
              <label>Kran eni uzunligi<input name="crane_width_length" value={formData.crane_width_length} onChange={handleChange} /></label>
              <label>Mas’ul shaxs ID<input type="number" name="responsible_person" value={formData.responsible_person} onChange={handleChange} /></label>
              <label>Muallif ID<input type="number" name="author" value={formData.author} onChange={handleChange} /></label>
            </div>
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
            <button className="submit-btn" onClick={handleSubmit}>Saqlash</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

EditLiftingCraneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditLiftingCraneModal;
