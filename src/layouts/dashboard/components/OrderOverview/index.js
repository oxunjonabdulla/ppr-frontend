

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Bildirishnomalar
        </SoftTypography>
        <SoftBox mt={1} mb={2}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ fontWeight: "bold", color: ({ palette: { success } }) => success.main }}>
                arrow_upward
              </Icon>
            </SoftTypography>
            &nbsp;
            <SoftTypography variant="button" color="text" fontWeight="medium">
              24 ta
            </SoftTypography>{" "}
            bildirishnomalar yuborildi
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="Nosozlik aniqlandi-Dvigatel nosozligi"
          dateTime="2025-06-30 10:23"
        />
      </SoftBox>
    </Card>
  );
}

export default OrdersOverview;
