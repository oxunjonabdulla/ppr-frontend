import React, { use, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "examples/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import axiosInstance from "../../axiosConfig";


function JournalTable({ title, apiEndpoint, columns, searchQuery, formattedRows }) {
  const [rows, setRows] = useState([]);
  const [page,setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axiosInstance.get(`${apiEndpoint}?page=${page}&page_size=${pageSize}&search=${searchQuery}`)
    .then((res) => {
      setRows(res.data.results.map(formattedRows));
      setTotalCount(res.data.count)
      console.log("data : ", res.data);
      console.log("results : ",res.data.results);
    })
    .catch((err) => console.error("API error", err));
  }, [apiEndpoint, page, pageSize,searchQuery]);

  return (
    <SoftBox>
      <SoftTypography variant="h6" gutterBottom>
        {title}
      </SoftTypography>
      <Table columns={columns} rows={rows} />
      <SoftBox display="flex" justifyContent="center" alignItems="center" mt={3} gap={2} flexWrap="wrap">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    style={{
      padding: "8px 16px",
      backgroundColor: page === 1 ? "#E0E0E0" : "#21BFFE",
      color: page === 1 ? "#888" : "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: page === 1 ? "not-allowed" : "pointer",
      transition: "background-color 0.3s",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    ⬅
  </button>

  <span style={{ fontSize: "15px", fontWeight: 500, color: "#333" }}>
    {page} / {Math.ceil(totalCount / pageSize)}
  </span>

  <button
    onClick={() =>
      setPage((prev) =>
        prev < Math.ceil(totalCount / pageSize) ? prev + 1 : prev
      )
    }
    disabled={page >= Math.ceil(totalCount / pageSize)}
    style={{
      padding: "8px 16px",
      backgroundColor: page >= Math.ceil(totalCount / pageSize) ? "#E0E0E0" : "#21BFFE",
      color: page >= Math.ceil(totalCount / pageSize) ? "#888" : "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: page >= Math.ceil(totalCount / pageSize) ? "not-allowed" : "pointer",
      transition: "background-color 0.3s",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    ➡
  </button>
</SoftBox>
    </SoftBox>
  );
}

JournalTable.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string, // ✅ Add this line
  apiEndpoint: PropTypes.string.isRequired,
  formattedRows: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      align: PropTypes.string,
      label: PropTypes.string.isRequired,
      width: PropTypes.string,
    })
  ).isRequired,
};

export default JournalTable;