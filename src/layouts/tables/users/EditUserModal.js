import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";
import "layouts/tables/style.css";

function EditUserModal({ open, onClose, onSuccess, item }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    role: "EquipmentOperator",
    company: 0,
    jshshir: "",
    phone_number: "",
    image: null,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        username: item.username || "",
        name: item.name || "",
        role: item.role || "EquipmentOperator",
        company: item.company?.id || 0,
        jshshir: item.jshshir || "",
        phone_number: item.phone_number || "",
        image: null, // For update, image stays null unless user selects a new one
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
      const currentUser = JSON.parse(localStorage.getItem("user")); // get current logged-in user
      const data = new FormData();

      // Add all formData fields (excluding company)
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && key !== "company") {
          data.append(key, formData[key]);
        }
      });

      // Automatically add company ID
      data.append("company", currentUser.company.id); // ✅ sending ID


      await axiosInstance.put(`user-update/${item.id}/`, data);

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
          <SoftTypography variant="h5" mb={2}>Foydalanuvchini tahrirlash</SoftTypography>
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
                Ism Familya
                <input name="name" value={formData.name} onChange={handleChange} />
              </label>


              <label>
                Rol
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="EquipmentOperator">Uskunalar operatori</option>
                </select>
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
              Saqlash
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

EditUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  item: PropTypes.object, // user object being edited
};

export default EditUserModal;
