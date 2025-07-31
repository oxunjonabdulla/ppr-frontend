import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../../axiosConfig";
import "layouts/tables/style.css";

function AddLatheMachineModal({ open, onClose, onSuccess }) {
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
    is_conserved: false,
    conservation_reason: "",
    notes: "",
    responsible_person_id: "",
    author: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, meRes] = await Promise.all([
          axiosInstance.get("users/"),
          axiosInstance.get("user/me/"),
        ]);
        setUserList(usersRes.data.results);
        setFormData((prev) => ({ ...prev, author: meRes.data.id }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      await axiosInstance.post("lathe_machine-list-create/", formDataToSend);
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
          <SoftTypography variant="h5" mb={2}>
            Yangi tokarlik dastgohi qo&#39;shish
          </SoftTypography>

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

              <label>Korxona nomi<input name="company_name" onChange={handleChange} /></label>
              <label>Detal nomi<input name="detail_name" onChange={handleChange} /></label>
              <label>Ishlab chiqarilgan sana<input type="date" name="manufacture_date"
                                                   onChange={handleChange} /></label>
              <label>Zavod raqami<input name="factory_number" onChange={handleChange} /></label>
              <label>Ro&#39;yxat raqami<input name="registration_number" onChange={handleChange} /></label>
              <label>O&#39;rnatilgan joyi<input name="installation_location" onChange={handleChange} /></label>

              <label>
                Holati
                <select name="technical_condition" onChange={handleChange} value={formData.technical_condition}>
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
                  <input name="conservation_reason" onChange={handleChange} />
                </label>
              )}

              <label>
                Tavsiyalar
                <textarea name="notes" rows={3} onChange={handleChange} />
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
                    <option key={user.id} value={String(user.id)}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>

              </label>

              <input type="hidden" name="author" value={formData.author} />
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
            <button className="submit-btn" onClick={handleSubmit}>Qo&#39;shish</button>
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
