import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "layouts/tables/style.css";
import axiosInstance from "../../../axiosConfig";

function AddLiftingCraneModal({ open, onClose, onSuccess }) {
  const [userList, setUserList] = useState([]);
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
    responsible_person_id: "",
    author: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, currentUserRes] = await Promise.all([
          axiosInstance.get("users/"),
          axiosInstance.get("user/me/"),
        ]);
        setUserList(usersRes.data.results);
        setFormData((prev) => ({ ...prev, author: currentUserRes.data.id }));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          const value =
            key === "manufacture_date"
              ? new Date(formData[key]).toISOString().split("T")[0]
              : formData[key];
          formDataToSend.append(key, value);
        }
      });

      await axiosInstance.post("lifting_crane-list-create/", formDataToSend);
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
          <SoftTypography variant="h5" mb={2}>Yangi ko&#39;taruv kran qo&#39;shish</SoftTypography>

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

              <label>Korxona nomi
                <input name="company_name" value={formData.company_name} onChange={handleChange} />
              </label>

              <label>Detal nomi
                <input name="detail_name" value={formData.detail_name} onChange={handleChange} />
              </label>

              <label>Ishlab chiqarilgan sana
                <input type="date" name="manufacture_date" value={formData.manufacture_date} onChange={handleChange} />
              </label>

              <label>Zavod raqami
                <input name="factory_number" value={formData.factory_number} onChange={handleChange} />
              </label>

              <label>Ro&#39;yxat raqami
                <input name="registration_number" value={formData.registration_number} onChange={handleChange} />
              </label>

              <label>O&#39;rnatilgan joyi
                <input name="installation_location" value={formData.installation_location} onChange={handleChange} />
              </label>

              <label>Holati
                <select name="technical_condition" value={formData.technical_condition} onChange={handleChange}>
                  <option value="working">Soz</option>
                  <option value="faulty">Nosoz</option>
                </select>
              </label>

              <label>Kran osti yo&#39;li uzunligi
                <input name="under_crane_path_length" value={formData.under_crane_path_length}
                       onChange={handleChange} />
              </label>

              <label>Kran eni uzunligi
                <input name="crane_width_length" value={formData.crane_width_length} onChange={handleChange} />
              </label>

              <label>
                Mas&#39;ul shaxs
                <select
                  name="responsible_person_id"
                  value={String(formData.responsible_person_id)}
                  onChange={handleChange}
                >
                  <option value="">Tanlang</option>
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

AddLiftingCraneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddLiftingCraneModal;
