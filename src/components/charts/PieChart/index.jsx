/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Pie } from "react-chartjs-2";

// @mui material components
import { Card, Box, Typography } from "@mui/material";

// PieChart configurations
import configs from "./configs";

function PieChart({ title, description, height, chart }) {
  if (chart == undefined) {
    return "";
  }
  const { data, options } = configs(chart.labels, chart.datasets);

  const renderChart = (
    <Box p={2}>
      {title || description ? (
        <Box px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <Box mb={1}>
              <Typography variant="h6">{title}</Typography>
            </Box>
          )}
          <Box mb={2}>
            <Typography variant="button" fontWeight="regular" textColor="text">
              {description}
            </Typography>
          </Box>
        </Box>
      ) : null}
      {useMemo(
        () => {
          return (
            <Box height={height}>
              <Pie data={data} />
            </Box>
          )
        },
        [data, height]
      )
      }
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PieChart
PieChart.defaultProps = {
  title: "",
  description: "",
  height: "15rem",
};

// Typechecking props for the PieChart
PieChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PieChart;
