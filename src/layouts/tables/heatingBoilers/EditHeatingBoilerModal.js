import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../axiosConfig";

function EditHeatingBoilerModal({ open, onClose, item, onSuccess }) {
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
    responsible_person: "",
    author: "",
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
        fuel_type: item.fuel_type || "",
        responsible_person: item.responsible_person || "",
        author: item.author || "",
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
        console.error("Foydalanuvchilarni olishda xatolik:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const res = await axiosInstance.get("users/me/");
        setCurrentUserId(res.data.id);
        setFormData((prev) => ({ ...prev, author: res.data.id }));
      } catch (error) {
        console.error("Joriy foydalanuvchini olishda xatolik:", error);
      }
    };

    fetchUsers();
    fetchCurrentUser();
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
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axiosInstance.put(`heating_boiler-detail/${item.id}/`, formDataToSend);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Tahrirlashda xatolik:", error);
      alert("Tahrirlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Isitish qozonini tahrirlash</SoftTypography>
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
              <label>
                Holati
                <select name="technical_condition" value={formData.technical_condition} onChange={handleChange}>
                  <option value="working">Soz</option>
                  <option value="faulty">Nosoz</option>
                </select>
              </label>
              <label>Yoqilg‘i turi<input name="fuel_type" value={formData.fuel_type} onChange={handleChange} /></label>

              <label>
                Mas’ul shaxs
                <select name="responsible_person" value={formData.responsible_person} onChange={handleChange}>
                  <option value="">Tanlang</option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </label>

              {/* Hidden field for author (not editable) */}
              <input type="hidden" name="author" value={formData.author} />
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

EditHeatingBoilerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default EditHeatingBoilerModal;
