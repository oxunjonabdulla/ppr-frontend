// ProfileIcon.js
import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";

function ProfileIcon({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
      fill={colors[color] ? colors[color].main : colors.dark.main}
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.2 48h90.4c99.5 0 179.8 80.3 179.8 179.8 0 15.6-12.6 28.2-28.2 28.2H27.2C12.6 512 0 499.4 0 483.8 0 384.3 80.3 304 179.8 304z" />
    </svg>
  );
}

ProfileIcon.defaultProps = {
  color: "dark",
  size: "16px",
};

ProfileIcon.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ProfileIcon;
