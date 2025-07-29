// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import { Link } from "react-router-dom";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import { useEffect, useState } from "react";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import axiosInstance from "../../axiosConfig";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [counts, setCounts] = useState({
    heatingBoilers: 0,
    latheMachines: 0,
    liftingCranes: 0,
    maintenanceSchedules: 0,
    warnings: 0,
    pressureVessels: 0,
    weldingEquipment: 0,
    employees: 0,
  });
  console.log();
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Replace with your actual API endpoints
        const endpoints = [
          "heating_boiler-list-create/",
          "lathe_machine-list-create/",
          "lifting_crane-list-create/",
          "maintenance-list-create/",
          "maintenance-warning-list/", // Adjust if your endpoint is different
          "pressure_vessel-list-create/",
          "welding_equipment-list-create/",
          "users/", // Adjust endpoint as needed
        ];

        const results = await Promise.all(
          endpoints.map(endpoint =>
            axiosInstance.get(`https://api.ppr.vchdqarshi.uz/api/${endpoint}`),
          ),
        );


        setCounts({
          heatingBoilers: results[0].data.count,
          latheMachines: results[1].data.count,
          liftingCranes: results[2].data.count,
          maintenanceSchedules: results[3].data.count,
          warnings: results[4].data.count,
          pressureVessels: results[5].data.count,
          weldingEquipment: results[6].data.count,
          employees: results[7].data.count,

        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/isitish-qozonlari">
                <MiniStatisticsCard
                  title={{ text: "Isitish qozonlari" }}
                  count={`${counts.heatingBoilers} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "whatshot" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/tokarlik-dastgohlari">
                <MiniStatisticsCard
                  title={{ text: "Tokarlik dastgohlari" }}
                  count={`${counts.latheMachines} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "precision_manufacturing" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/yuk-ko'tarish-kranlari">
                <MiniStatisticsCard
                  title={{ text: "Yuk ko'tarish kranlari" }}
                  count={`${counts.liftingCranes} ta`}
                  percentage={{ color: "error", text: "" }}
                  icon={{ color: "info", component: "build" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/ta'mirlash-jadvali">
                <MiniStatisticsCard
                  title={{ text: "Ta'mirlash jadvali" }}
                  count={`${counts.maintenanceSchedules} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "calendar_month" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/ogohlantirishlar">
                <MiniStatisticsCard
                  title={{ text: "Ogohlantirishlar" }}
                  count={`${counts.warnings} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "warning" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/bosim-ostida-sig'imlar">
                <MiniStatisticsCard
                  title={{ text: "Bosim ostida sig'imlar" }}
                  count={`${counts.pressureVessels} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "compress" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/payvandlash-qurilmalari">
                <MiniStatisticsCard
                  title={{ text: "Payvandlash qurilmalari" }}
                  count={`${counts.weldingEquipment} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "engineering" }}
                />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} xl={3}>
              <Link to="/users">
                <MiniStatisticsCard
                  title={{ text: "Xodimlar" }}
                  count={`${counts.employees} ta`}
                  percentage={{ color: "success", text: "" }}
                  icon={{ color: "info", component: "people" }}
                />
              </Link>
            </Grid>
          </Grid>

        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Haftalik ta'mirlar"
                description={
                  <>
                    (<strong>+23%</strong>) o’tgan haftaga nisbatan oshgan
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Oylik ta'mirlash bo'yicha"
                description={
                  <SoftBox display="flex" alignItems="center">

                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
