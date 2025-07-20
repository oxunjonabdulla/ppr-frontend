import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SoftAvatar from "components/SoftAvatar";

const ImageModal = ({ src, alt = "Image", avatarSize = "sm", rounded = true }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => src && setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SoftAvatar
        src={src}
        alt={alt}
        size="md"
        variant={rounded ? "rounded" : "circular"}
        sx={{ cursor: "pointer",
              objectFit: "contain"  }}
        onClick={handleOpen}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1.5,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "10px",
              display: "block",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  avatarSize: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  rounded: PropTypes.bool,
};

export default ImageModal;
