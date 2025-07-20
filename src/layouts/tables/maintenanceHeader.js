import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

function MaintenanceHeader({ title, searchQuery, setSearchQuery, onAddClick  }) {
  return (
    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      {window.innerWidth > 768 && (
        <SoftTypography variant="h4">{title}</SoftTypography>
      )}
      <SoftBox display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Qidiring..."
          onFocus={(e) => (e.target.style.borderColor = "#21BFFE")}
          onBlur={(e) => (e.target.style.borderColor = "#21BFFE")}
        />

        <SoftBox
          component="select"
          onFocus={(e) => (e.target.style.borderColor = "#21BFFE")}
          onBlur={(e) => (e.target.style.borderColor = "#21BFFE")}
          className="custom-select"
        >
          <option value="created_at">Qo‘shilgan vaqti</option>
          <option value="updated_at">Yangilangan vaqti</option>
          <option value="factory_number">Zavod raqami</option>
        </SoftBox>

        <button
          className="download-button"
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#00a9eb")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#21BFFE")}
        >
          Yuklash
        </button>
        <button
          className="add-button"
          onClick={onAddClick}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3ec722")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4cc733")}
        >
          Qo&#39;shish
        </button>
      </SoftBox>
    </SoftBox>
  );
}

MaintenanceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

export default MaintenanceHeader;
