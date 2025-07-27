import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";
import "layouts/tables/style.css";

function AddUserModal({ open, onClose, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    last_name: "",
    role: "EquipmentOperator",
    company: 0,
    jshshir: "",
    phone_number: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axiosInstance.post(
        "https://api.ppr.vchdqarshi.uz/api/user/create/",
        data,
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Xatolik:", error.response?.data || error.message);
      alert(`Xatolik: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi foydalanuvchi qo‘shish</SoftTypography>

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
                  <span>Rasm yuklash</span>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="image-preview"
                      style={{ display: "block", maxWidth: "200px", maxHeight: "200px", marginTop: "1rem" }}
                    />
                  )}

                </label>
              </div>

              <label>
                Foydalanuvchi nomi
                <input name="username" value={formData.username} onChange={handleChange} />
              </label>

              <label>
                Parol
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </label>

              <label>
                Ism
                <input name="name" value={formData.name} onChange={handleChange} />
              </label>

              <label>
                Familiya
                <input name="last_name" value={formData.last_name} onChange={handleChange} />
              </label>

              <label>
                Rol
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="EquipmentOperator">Uskunalar operatori</option>
                </select>
              </label>

              <label>
                Korxona ID
                <input type="number" name="company" value={formData.company} onChange={handleChange} />
              </label>

              <label>
                JSHSHIR
                <input name="jshshir" value={formData.jshshir} onChange={handleChange} />
              </label>

              <label>
                Telefon raqami
                <input name="phone_number" value={formData.phone_number} onChange={handleChange} />
              </label>
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
  );
}

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddUserModal;
