import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import SoftTypography from "components/SoftTypography";
import "layouts/tables/style.css";
import axiosInstance from "../../../axiosConfig";

function EditMaintenanceModal({ open, onClose, onSuccess, maintenanceId }) {
  const [equipmentList, setEquipmentList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState({
    maintenance_type: "inspection",
    description: "",
    scheduled_date: "",
    next_maintenance_date: "",
    is_completed: false,
    completed_date: "",
    equipment: 0,  // Changed from equipment_id to equipment to match AddModal
    assigned_to: 0,
    completed_by: 0,
  });

  // Fetch equipment, users, and current maintenance item
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await axiosInstance.get("equipment/");
        setEquipmentList(res.data.results);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("users/");
        setUserList(res.data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchMaintenance = async () => {
      try {
        console.log("Fetching maintenance with ID:", maintenanceId); // Debug log
        const res = await axiosInstance.get(`maintenance-detail/${maintenanceId}/`);
        console.log("Maintenance data received:", res.data); // Debug log

        // Access the nested data property
        const data = res.data.data || res.data;

        // Format dates properly - ensure they're in YYYY-MM-DD format
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        setFormData({
          maintenance_type: data.maintenance_type || "inspection",
          description: data.description || "",
          scheduled_date: formatDateForInput(data.scheduled_date),
          next_maintenance_date: formatDateForInput(data.next_maintenance_date),
          is_completed: data.is_completed || false,
          completed_date: formatDateForInput(data.completed_date),
          equipment: data.equipment?.id || data.equipment_id || 0,  // Changed to equipment
          assigned_to: data.assigned_to?.id || data.assigned_to || 0,
          completed_by: data.completed_by?.id || data.completed_by || 0,
        });
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
        alert("Ma'lumotlarni olishda xatolik yuz berdi!");
      }
    };

    if (open) {
      fetchEquipments();
      fetchUsers();
      // Only fetch maintenance data if we have a valid ID
      if (maintenanceId && typeof maintenanceId === "number") {
        fetchMaintenance();
      }
    }
  }, [open, maintenanceId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    // If already in correct format, return as is
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields first (matching AddModal validation)
      if (!formData.equipment || !formData.maintenance_type || !formData.scheduled_date) {
        alert("Iltimos, uskuna ID, texnik xizmat turi va ko'rik sanasini kiriting!");
        return;
      }

      const payload = {
        maintenance_type: formData.maintenance_type,
        description: formData.description || "",
        scheduled_date: formatDate(formData.scheduled_date),
        next_maintenance_date: formatDate(formData.next_maintenance_date),
        is_completed: formData.is_completed,
        completed_date: formatDate(formData.completed_date),
        equipment_id: Number(formData.equipment),
        assigned_to_id: formData.assigned_to ? Number(formData.assigned_to) : null,
        completed_by_id: formData.completed_by ? Number(formData.completed_by) : null,
      };


      console.log("Submitting payload:", payload); // Debug log

      await axiosInstance.put(`maintenance-detail/${maintenanceId}/`, payload);
      alert("Muvaffaqiyatli yangilandi!"); // Success message
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      alert(`Xatolik: ${JSON.stringify(error.response?.data) || error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-container">
          <SoftTypography variant="h5" mb={2}>Texnik xizmatni tahrirlash</SoftTypography>

          <div className="modal-content">
            <div className="form-grid">
              <label>
                Texnik xizmat turi
                <select name="maintenance_type" value={formData.maintenance_type} onChange={handleChange}>
                  <option value="inspection">Texnik ko&#39;rik</option>
                  <option value="full_inspection">To&#39;liq texnik ko&#39;rik</option>
                  <option value="partial_inspection">Qisman texnik ko&#39;rik</option>
                  <option value="voltmeter_check">Voltmetr tekshiruvi</option>
                  <option value="manometer_check">Manometr tekshiruvi</option>
                  <option value="hydraulic_test">Gidravlik sinov</option>
                  <option value="pressure_test">Bosim sinovi</option>
                  <option value="flush_test">Yuvish va sinov</option>
                  <option value="inner_outer_check">Ichki/tashqi tekshiruv</option>
                  <option value="lab_test">Laboratoriya tekshiruvi</option>
                  <option value="leveling_check">Nivelirovka tekshiruvi</option>
                  <option value="safety_valve_check">Xavfsizlik klapani tekshiruvi</option>
                  <option value="lubrication_check">Yog&#39;lash tekshiruvi</option>
                  <option value="alignment_check">Markalash tekshiruvi</option>
                  <option value="calibration_check">Kalibrlash tekshiruvi</option>
                </select>
              </label>

              <label>
                Ta&#39;rif
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
              </label>

              <label>
                Ko&#39;rik sanasi
                <input type="date" name="scheduled_date" value={formData.scheduled_date} onChange={handleChange} />
              </label>

              <label>
                Keyingi ko&#39;rik sanasi
                <input type="date" name="next_maintenance_date" value={formData.next_maintenance_date}
                       onChange={handleChange} />
              </label>

              <label className="checkbox-label">
                <input type="checkbox" name="is_completed" checked={formData.is_completed} onChange={handleChange} />
                Bajarilganmi
              </label>

              {formData.is_completed && (
                <label>
                  Bajarilgan sana
                  <input type="date" name="completed_date" value={formData.completed_date} onChange={handleChange} />
                </label>
              )}

              <label>
                Uskuna tanlang
                <select name="equipment" value={formData.equipment} onChange={handleChange}>
                  <option value="">Uskunani tanlang</option>
                  {equipmentList.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.detail_name} ({eq.company_name || eq.type})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Mas&#39;ul foydalanuvchi
                <select name="assigned_to" value={formData.assigned_to} onChange={handleChange}>
                  <option value="">Foydalanuvchini tanlang</option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </label>

              {formData.is_completed && (
                <label>
                  Bajargan foydalanuvchi
                  <select name="completed_by" value={formData.completed_by} onChange={handleChange}>
                    <option value="">Foydalanuvchini tanlang</option>
                    {userList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.username})
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Bekor qilish</button>
            <button className="submit-btn" onClick={handleSubmit}>Yangilash</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

EditMaintenanceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  maintenanceId: PropTypes.number,
};

export default EditMaintenanceModal;