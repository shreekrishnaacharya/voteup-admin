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

import { useRef, useEffect, useState, useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import { Card, Box, Typography } from "@mui/material";

// GradientLineChart configurations
import configs from "./configs";

// Soft UI Dashboard React base styles
import { useTheme } from "@emotion/react";

function GradientLineChart({ title, description, height, chart }) {
  
  const { colors } = useTheme();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;

  useEffect(() => {
    const chartDatasets = chart.datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 3,
      borderColor: colors[dataset.color],
      fill: true,
      maxBarThickness: 6,
      // backgroundColor: gradientChartLine(chartRef.current.children[0], colors[dataset.color].main),
    }));
    setChartData(configs(chart.labels, chartDatasets));
  }, []);
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
        () => (
          <div ref={chartRef} style={{ height }}>
            {data != undefined && (
              <Line data={data} options={options} />
            )}
          </div>
        ),
        [chartData, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the GradientLineChart
GradientLineChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default GradientLineChart;
