// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function WarningCard({ name, equipment, message, sentDate, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Uskuna ID:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {equipment}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Ogohlantirish matni:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {message}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        <SoftTypography variant="caption" color="text">
          Yuborilgan sana:&nbsp;&nbsp;&nbsp;
          <SoftTypography variant="caption" fontWeight="medium">
            {sentDate}
          </SoftTypography>
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Default props
WarningCard.defaultProps = {
  noGutter: false,
};

// Prop types
WarningCard.propTypes = {
  name: PropTypes.string.isRequired,
  equipment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  message: PropTypes.string.isRequired,
  sentDate: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default WarningCard;
