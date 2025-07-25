import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import axiosInstance from "../../../axiosConfig";

function AddMaintenanceModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    maintenance_type: "inspection",
    description: "",
    scheduled_date: "",
    next_maintenance_date: "",
    is_completed: false,
    completed_date: "",
    equipment: 0,
    assigned_to: 0,
    completed_by: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields first
      if (!formData.equipment || !formData.maintenance_type || !formData.scheduled_date) {
        alert("Iltimos, uskuna ID, texnik xizmat turi va ko'rik sanasini kiriting!");
        return;
      }

      // Helper function for date formatting
      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // YYYY-MM-DD format
      };

      const payload = {
        maintenance_type: formData.maintenance_type,
        description: formData.description || "",
        scheduled_date: formatDate(formData.scheduled_date), // Fixed date format
        next_maintenance_date: formatDate(formData.next_maintenance_date),
        is_completed: formData.is_completed,
        completed_date: formatDate(formData.completed_date),
        equipment: Number(formData.equipment),
        assigned_to: formData.assigned_to ? Number(formData.assigned_to) : null,
        completed_by: formData.completed_by ? Number(formData.completed_by) : null,
        created_by: 1, // Should come from auth
      };

      const response = await axiosInstance.post(
        "https://api.ppr.vchdqarshi.uz/api/maintenance-list-create/",
        payload);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Full error:", error.response?.data);
      alert(`Xatolik: ${JSON.stringify(error.response?.data) || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Yangi texnik xizmat jadvali qo&#39;shish</SoftTypography>

          <div className="modal-content">
            <div className="form-grid">
              <label>
                Texnik xizmat turi
                <select
                  name="maintenance_type"
                  value={formData.maintenance_type}
                  onChange={handleChange}
                >
                  <option value="inspection">Texnik ko‘rik</option>
                  <option value="full_inspection">To‘liq texnik ko‘rik</option>
                  <option value="partial_inspection">Qisman texnik ko‘rik</option>

                  <option value="voltmeter_check">Voltmetr tekshiruvi</option>
                  <option value="manometer_check">Manometr tekshiruvi</option>

                  <option value="hydraulic_test">Gidravlik sinov</option>
                  <option value="pressure_test">Bosim sinovi</option>
                  <option value="flush_test">Yuvish va sinov</option>
                  <option value="inner_outer_check">Ichki/tashqi tekshiruv</option>

                  <option value="lab_test">Laboratoriya tekshiruvi</option>
                  <option value="leveling_check">Nivelirovka tekshiruvi</option>
                  <option value="safety_valve_check">Xavfsizlik klapani tekshiruvi</option>

                  <option value="lubrication_check">Yog‘lash tekshiruvi</option>
                  <option value="alignment_check">Markalash tekshiruvi</option>
                  <option value="calibration_check">Kalibrlash tekshiruvi</option>
                </select>
              </label>

              <label>
                Ta&#39;rif
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </label>

              <label>
                Ko&#39;rik sanasi
                <input
                  type="date"
                  name="scheduled_date"
                  value={formData.scheduled_date}
                  onChange={handleChange}
                />
              </label>

              <label>
                Keyingi ko&#39;rik sanasi
                <input
                  type="date"
                  name="next_maintenance_date"
                  value={formData.next_maintenance_date}
                  onChange={handleChange}
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_completed"
                  checked={formData.is_completed}
                  onChange={handleChange}
                />
                Bajarilganmi
              </label>

              {formData.is_completed && (
                <label>
                  Bajarilgan sana
                  <input
                    type="date"
                    name="completed_date"
                    value={formData.completed_date}
                    onChange={handleChange}
                  />
                </label>
              )}

              <label>
                Uskuna ID
                <input
                  type="number"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                />
              </label>

              <label>
                Mas&#39;ul foydalanuvchi ID
                <input
                  type="number"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleChange}
                />
              </label>

              {formData.is_completed && (
                <label>
                  Bajargan foydalanuvchi ID
                  <input
                    type="number"
                    name="completed_by"
                    value={formData.completed_by}
                    onChange={handleChange}
                  />
                </label>
              )}
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

AddMaintenanceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddMaintenanceModal;