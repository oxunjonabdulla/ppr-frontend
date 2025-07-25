

// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Soft UI Dashboard React components
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox, cardIcon } from "examples/Sidenav/styles/sidenavCard";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <SoftBox
          bgColor="white"
          width="2rem"
          height="2rem"
          borderRadius="md"
          shadow="md"
          mb={2}
          sx={cardIconBox}
        >
          <Icon fontSize="medium" sx={(theme) => cardIcon(theme, { sidenavColor })}>
            star
          </Icon>
        </SoftBox>
        <SoftBox lineHeight={1}>
          <SoftTypography variant="h6" color="white" mb={1}>
            Yordam kerakmi ?
          </SoftTypography>
          <SoftBox mb={1.825} mt={-1}>
          <SoftTypography variant="caption" color="white" fontWeight="medium">
            Qo&apos;llanma bilan tanishib chiqing
          </SoftTypography>

          </SoftBox>
          <SoftButton
            component={Link}
            href=""
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth
          >
            qo&apos;llanma
          </SoftButton>
        </SoftBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
