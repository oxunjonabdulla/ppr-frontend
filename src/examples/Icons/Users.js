// UsersIcon.js
import PropTypes from "prop-types";
import colors from "assets/theme/base/colors";

function UsersIcon({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      fill={colors[color] ? colors[color].main : colors.dark.main}
    >
      <path d="M96 128a64 64 0 1 1 128 0 64 64 0 1 1-128 0zm160 0a96 96 0 1 0-192 0 96 96 0 1 0 192 0zM320 160a64 64 0 1 1 128 0 64 64 0 1 1-128 0zm160 0a96 96 0 1 0-192 0 96 96 0 1 0 192 0zM0 416c0-70.7 57.3-128 128-128h32c26.5 0 50.9 8.2 71 22.1-19.2 23.4-31 53.5-31 85.9v18.6l-8.8-6.3C174.7 390 149.5 384 128 384H96c-35.3 0-64 28.7-64 64v16H0v-48zm352 0c0-35.3 28.7-64 64-64h32c21.5 0 46.7 6 71.2 24.3l8.8 6.3v-18.6c0-32.4-11.8-62.5-31-85.9 20.1-13.9 44.5-22.1 71-22.1h32c70.7 0 128 57.3 128 128v48h-64v-16c0-35.3-28.7-64-64-64h-32c-21.5 0-46.7 6-71.2 24.3L448 416v48h-64v-48z" />
    </svg>
  );
}

UsersIcon.defaultProps = {
  color: "dark",
  size: "16px",
};

UsersIcon.propTypes = {
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

export default UsersIcon;
