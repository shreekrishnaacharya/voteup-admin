// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Grid, Card, Icon, Box, Typography, useTheme } from "@mui/material";

function MiniStatisticsCard({ backgroundColor, title, count, percentage, icon, direction }) {
  const theme = useTheme();
  console.log(theme)
  const boxColor = backgroundColor === "white" ? theme.colors[icon.color] : theme.colors[backgroundColor]
  const backgroundGradient = theme.colors.gradients.blue5
  return (
    <Card>
      <Box sx={{ backgroundColor: theme.colors[backgroundColor] }}>
        <Box p={2}>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <Box
                  sx={{
                    backgroundColor: boxColor,
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: (backgroundColor === "white" ? "white" : "dark"),
                    boxShadow: "md",
                    backgroundGradient
                  }}
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <Box ml={direction === "left" ? 2 : 0}>
                <Typography
                  variant="button"
                  sx={{
                    textColor: backgroundColor === "white" ? "text" : "white",
                    opacity: backgroundColor === "white" ? 1 : 0.7,
                    textTransform: "capitalize",
                    fontWeight: title.fontWeight,
                  }}
                >
                  {title.text}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    textColor: backgroundColor === "white" ? "dark" : "white"
                  }}
                >
                  {count}{" "}
                  <Typography variant="caption"
                    sx={{
                      fontWeight: "bold",
                      textColor: percentage.color
                    }}
                  >
                    {percentage.text == "" ? "" : `(${percentage.text})`}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <Box
                  sx={{
                    backgroundColor: boxColor,
                    width: "3rem",
                    height: "3rem",
                    marginLeft: "auto",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: backgroundColor === "white" ? "white" : "dark",
                    boxShadow: "4px",
                    backgroundGradient
                  }}
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Box>
    </Card >
  );
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  backgroundColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  backgroundColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
