// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useEffect, useState } from "react";
import WarningCard from "../Warning";
import axiosInstance from "../../../../axiosConfig";

// New component

function BillingInformation() {
  const [warnings, setWarnings] = useState([]);
  const levelMap = {
    low: "Oddiy ogohlantirish",
    medium: "O‘rta ogohlantirish",
    high: "Yuqori ogohlantirish",
    critical: "Favqulodda ogohlantirish",
  };


  useEffect(() => {
    axiosInstance.get("https://api.ppr.vchdqarshi.uz/api/maintenance-warning-list/")
      .then((res) => {
        setWarnings(res.data.results);
      })
      .catch((err) => {
        console.error("Failed to fetch warnings:", err);
      });
  }, []);

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Ta&#39;mirlash jadvali uskunalarining ogohlantirishlari
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {warnings.map((warn, index) => (
            <WarningCard
              key={warn.id || index}
              name={levelMap[warn.warning_level]} // ✅ translated title
              equipment={warn.maintenance_schedule}
              message={warn.message}
              sentDate={new Date(warn.sent_date).toLocaleDateString("uz-UZ")}
              noGutter={index === warnings.length - 1}
            />
          ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
