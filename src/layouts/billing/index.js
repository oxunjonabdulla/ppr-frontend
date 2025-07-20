// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React components
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import BillingInformation from "layouts/billing/components/warningInformations";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        {/*<SoftBox mb={1.5}>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item xs={12} lg={12}>*/}
        {/*      <Grid container spacing={3}>*/}
        {/*        <Grid item xs={12} md={6} xl={2.4}>*/}
        {/*          <DefaultInfoCard*/}
        {/*            icon="whatshot"*/}
        {/*            title="Isitish qozonlari"*/}
        {/*            value="100 ta"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={6} xl={2.4}>*/}
        {/*          <DefaultInfoCard*/}
        {/*            icon="precision_manufacturing"*/}
        {/*            title="Tokarlik dastgohlari"*/}
        {/*            value="200 ta"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={6} xl={2.4}>*/}
        {/*          <DefaultInfoCard*/}
        {/*            icon="build"*/}
        {/*            title="Yuk ko'tarish kranlari"*/}
        {/*            value="201 ta"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={6} xl={2.4}>*/}
        {/*          <DefaultInfoCard*/}
        {/*            icon="compress"*/}
        {/*            title="Bosim ostida sig'imlar"*/}
        {/*            value="189 ta"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={6} xl={2.4}>*/}
        {/*          <DefaultInfoCard*/}
        {/*            icon="engineering"*/}
        {/*            title="Payvandlash qurilmalari"*/}
        {/*            value="131 ta"*/}
        {/*          />*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</SoftBox>*/}
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BillingInformation />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
