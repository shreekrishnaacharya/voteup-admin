
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { LinearProgress, Typography } from "@mui/material";

// Custom styles for SuiProgress
import styles from "./styles";

const SuiProgress = forwardRef(({ color, value, gradient, noLabel, ...rest }, ref) => {
  const classes = styles({ color, value });

  return (
    <>
      {!noLabel && (
        <Typography variant="button" fontWeight="medium" textColor="text">
          {value}%
        </Typography>
      )}
      <LinearProgress
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        sx={classes}
      />
    </>
  );
});

// Setting default values for the props of SuiProgress
SuiProgress.defaultProps = {
  color: "info",
  value: 0,
  gradient: false,
  noLabel: false,
};

// Typechecking props for the SuiProgress
SuiProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  value: PropTypes.number,
  gradient: PropTypes.bool,
  noLabel: PropTypes.bool,
};

export default SuiProgress;
