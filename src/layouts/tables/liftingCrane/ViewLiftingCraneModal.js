import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import SoftBadge from "components/SoftBadge";
import PropTypes from "prop-types";

const ViewLiftingCraneModal = ({ open, onClose, data }) => {
  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "-";

  const statusColor =
    data?.technical_condition === "working"
      ? "success"
      : data?.technical_condition === "faulty"
      ? "error"
      : "secondary";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Yuk ko‘tarish krani tafsilotlari</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Rasm:
            </Typography>
            {data?.image ? (
              <img
                src={data.image}
                alt="Kran rasmi"
                style={{ width: "100%", maxHeight: 250, objectFit: "contain" }}
              />
            ) : (
              <Typography>-</Typography>
            )}
          </Grid>

          {/* QR Code */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              QR kod:
            </Typography>
            {data?.qr_code_url ? (
              <img
                src={data.qr_code_url}
                alt="QR Code"
                style={{ width: 150, height: 150 }}
              />
            ) : (
              <Typography>-</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {[
            ["Korxona nomi", data?.company_name],
            ["Detal nomi", data?.detail_name],
            ["Ishlab chiqarilgan sana", formatDate(data?.manufacture_date)],
            ["Zavod raqami", data?.factory_number],
            ["Ro'yxat raqami", data?.registration_number],
            ["O'rnatilgan joyi", data?.installation_location],
            ["Manzil", data?.location_address],
            [
              "Holati",
              <SoftBadge
                key="condition"
                variant="gradient"
                color={statusColor}
                badgeContent={
                  data?.technical_condition === "working"
                    ? "Soz"
                    : data?.technical_condition === "faulty"
                    ? "Nosoz"
                    : "Noma'lum"
                }
                size="xs"
              />,
            ],
            ["Mas'ul shaxs", data?.responsible_person?.name],
            ["Kran osti yo‘li uzunligi", data?.under_crane_path_length],
            ["Kran eni uzunligi", data?.crane_width_length],
            ["Qo'shilgan vaqti", formatDate(data?.created_at)],
            ["Yangilangan vaqti", formatDate(data?.updated_at)],
          ].map(([label, value], idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Typography variant="body2" fontWeight="bold">
                {label}:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {value || "-"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Yopish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ViewLiftingCraneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    image: PropTypes.string,
    qr_code_url: PropTypes.string,
    company_name: PropTypes.string,
    detail_name: PropTypes.string,
    manufacture_date: PropTypes.string,
    factory_number: PropTypes.string,
    registration_number: PropTypes.string,
    installation_location: PropTypes.string,
    location_address: PropTypes.string,
    technical_condition: PropTypes.string,
    under_crane_path_length: PropTypes.string,
    crane_width_length: PropTypes.string,
    responsible_person: PropTypes.shape({
      name: PropTypes.string,
    }),
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default ViewLiftingCraneModal;
