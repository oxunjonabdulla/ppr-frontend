
// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Google, Telegram, YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <SoftBox component="footer" py={6}>
      <Grid container justifyContent="center">
      
        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
            <SoftBox mr={3} color="secondary">
              <a
                href="http://www.facebook.com/groups/vchdqarshi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
                <FacebookIcon fontSize="small" />
              </a>
            </SoftBox>

            <SoftBox mr={3} color="secondary">
               <a
                href="https://t.me/vchdqarshi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
              <Telegram fontSize="small" />
               </a>
            </SoftBox>
            <SoftBox mr={3} color="secondary">
            <a
                href="https://www.instagram.com/qarshi_vchd8/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}
              >
              <InstagramIcon fontSize="small" />
              </a>
            </SoftBox>
            <SoftBox mr={3} color="secondary">
            <a href="https://vchdqarshi.uz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit" }}>
              <Google fontSize="small" />
              </a>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary">
            &copy; {new Date().getFullYear()}.Barcha huquqlar himoyalangan.
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
