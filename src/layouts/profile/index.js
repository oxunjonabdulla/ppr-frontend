// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";

// Data
import LoginLogTable from "./data/userLoginInformations";
import { useEffect, useState } from "react";

import SoftTypography from "../../components/SoftTypography";
import axiosInstance from "../../axiosConfig";

function Overview() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axiosInstance.get("https://api.ppr.vchdqarshi.uz/api/user/me/")
      .then((res) => setUser(res.data));
  }, []);
  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileInfoCard
              title="Hisob ma'lumotlari"
              description={
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  <SoftBox component="span" fontWeight="bold" color="dark">
                    {user?.name}
                  </SoftBox>{" "}
                  ning hisob malumotlari
                </SoftTypography>
              }
              info={{
                ism: user?.name || "-",
                telefonRaqam: user?.phone_number || "-",
                rol: user?.role || "-",
                korxona: user?.company.name || "-", // ✅ fallback if null
              }}
            />


          </Grid>
          <Grid item xs={12}>
            <LoginLogTable />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
