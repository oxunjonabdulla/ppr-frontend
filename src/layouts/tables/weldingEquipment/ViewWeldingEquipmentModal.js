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
import PropTypes from "prop-types";
import SoftBadge from "components/SoftBadge";

const ViewWeldingEquipmentModal = ({ open, onClose, item }) => {
  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : "-";

  const statusColor =
    item?.technical_condition === "working"
      ? "success"
      : item?.technical_condition === "faulty"
      ? "error"
      : "secondary";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>⚙️ Payvandlash jihozi tafsilotlari</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Rasm:
            </Typography>
            {item?.image ? (
              <img
                src={item.image}
                alt="Jihoz rasmi"
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
            {item?.qr_code_url ? (
              <img
                src={item.qr_code_url}
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

          {/* Info fields */}
          {[
            ["Korxona nomi", item?.company_name],
            ["Jihoz nomi", item?.detail_name],
            ["Ishlab chiqarilgan sana", formatDate(item?.manufacture_date)],
            ["Zavod raqami", item?.factory_number],
            ["Ro'yxat raqami", item?.registration_number],
            ["O'rnatilgan joyi", item?.installation_location],
            ["Manzil", item?.location_address],
            ["Kenglik", item?.latitude],
            ["Uzunlik", item?.longitude],
            [
              "Holati",
              <SoftBadge
                key="condition"
                variant="gradient"
                color={statusColor}
                badgeContent={
                  item?.technical_condition === "working"
                    ? "Soz"
                    : item?.technical_condition === "faulty"
                    ? "Nosoz"
                    : "Noma'lum"
                }
                size="xs"
              />,
            ],
            [
              "Mas'ul shaxs",
              item?.responsible_person
                ? `${item.responsible_person.name} (@${item.responsible_person.username})`
                : "-",
            ],
            ["Konservatsiyada", item?.is_conserved ? "Ha" : "Yo‘q"],
            ["Konservatsiya sababi", item?.conservation_reason || "-"],
            ["Qo'shilgan vaqti", formatDate(item?.created_at)],
            ["Yangilangan vaqti", formatDate(item?.updated_at)],
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

ViewWeldingEquipmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.shape({
    image: PropTypes.string,
    qr_code_url: PropTypes.string,
    company_name: PropTypes.string,
    detail_name: PropTypes.string,
    manufacture_date: PropTypes.string,
    factory_number: PropTypes.string,
    registration_number: PropTypes.string,
    installation_location: PropTypes.string,
    location_address: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    technical_condition: PropTypes.string,
    responsible_person: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
    is_conserved: PropTypes.bool,
    conservation_reason: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

export default ViewWeldingEquipmentModal;
