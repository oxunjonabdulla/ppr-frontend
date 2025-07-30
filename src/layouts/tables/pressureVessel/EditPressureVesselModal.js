import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "layouts/tables/style.css";
import axiosInstance from "../../../axiosConfig";

function EditPressureVesselModal({ open, onClose, item, onSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [userList, setUserList] = useState([]);

  const [formData, setFormData] = useState({
    company_name: "",
    detail_name: "",
    manufacture_date: "",
    factory_number: "",
    registration_number: "",
    installation_location: "",
    technical_condition: "working",
    category_name: "",
    responsible_person: 0,
    author: 0,
    image: null,
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
        responsible_person: item.responsible_person || 0,
        author: item.author || 0,
        image: null,
      });
      setPreviewImage(item.image || null);
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
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        image: null,
        author: localStorage.getItem("userId") || item.author,
      });
      setPreviewImage(item.image || null);
    }
  }, [item]);

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
          // Skip appending if image is null
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });


      await axiosInstance.put(
        `pressure_vessel-detail/${item.id}/`,
        formDataToSend,
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error.response?.data || error.message);
      alert(`Xatolik yuz berdi: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Bosim idishini tahrirlash</SoftTypography>

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

              <label>Korxona nomi<input name="company_name" value={formData.company_name}
                                        onChange={handleChange} /></label>
              <label>Detal nomi<input name="detail_name" value={formData.detail_name} onChange={handleChange} /></label>
              <label>Ishlab chiqarilgan sana<input type="date" name="manufacture_date" value={formData.manufacture_date}
                                                   onChange={handleChange} /></label>
              <label>Zavod raqami<input name="factory_number" value={formData.factory_number} onChange={handleChange} /></label>
              <label>Ro‘yxat raqami<input name="registration_number" value={formData.registration_number}
                                          onChange={handleChange} /></label>
              <label>O‘rnatilgan joyi<input name="installation_location" value={formData.installation_location}
                                            onChange={handleChange} /></label>
              <label>Holati
                <select name="technical_condition" value={formData.technical_condition} onChange={handleChange}>
                  <option value="working">Soz</option>
                  <option value="faulty">Nosoz</option>
                </select>
              </label>
              <label>Sig‘im kategoriyasi<input name="category_name" value={formData.category_name}
                                               onChange={handleChange} /></label>
              <label>
                Mas’ul shaxs
                <select
                  name="responsible_person"
                  value={formData.responsible_person}
                  onChange={handleChange}
                >
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
            <button className="submit-btn" onClick={handleSubmit}>Saqlash</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

EditPressureVesselModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditPressureVesselModal;
