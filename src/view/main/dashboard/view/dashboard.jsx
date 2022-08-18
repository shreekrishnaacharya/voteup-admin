import { useEffect } from "react";
import { Grid, Box, Skeleton } from "@mui/material";

import MiniStatisticsCard from "components/charts/MiniStatisticsCard";
// import ReportsBarChart from "components/charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "components/charts/LineCharts/GradientLineChart";
// import PieChart from "components/charts/PieChart";

import { getLineChart, getBarChart, getMiniCard } from "../model/list";
import { getDashboard } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "redux/action/dboardAction";

function Dashboard() {
  const dboardData = useSelector(state => state.dboard);
  const dispatch = useDispatch();
  async function loadData() {
    await getDashboard().then((res) => {
      console.log(res)
      if (res.flag) {
        console.log(res.data);
        if (Object.keys(res.data).length) {
          dispatch(setDashboard({
            minicard: res.data.minicard,
            // line: getLineChart(res.data.bar),
            // bar: getBarChart(res.data.bar[0]),
          }));
        } else {
          console.log("no length")
          dispatch(setDashboard({}));
        }
      }
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  const { minicard } = dboardData;
  return (
    <Box py={3}>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            {minicard == null ? (
              <Skeleton height={100} />
            ) : (
              <MiniStatisticsCard
                title={{ text: "Users" }}
                count={minicard.users.new}
                percentage={{ color: "success", text: minicard.users.total }}
                icon={{ color: "primary", component: "people" }}
              />
            )}

          </Grid>
          <Grid item xs={12} sm={2}>
            {minicard == null ? (
              <Skeleton height={100} />
            ) : (
              <MiniStatisticsCard
                title={{ text: "Post" }}
                count={minicard.post.new}
                percentage={{ color: "success", text: minicard.post.total }}
                icon={{ color: "info", component: "public" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            {minicard == null ? (
              <Skeleton height={100} />
            ) : (
              <MiniStatisticsCard
                title={{ text: "Reivew" }}
                count={minicard.comments.new}
                percentage={{ color: "success", text: minicard.comments.total }}
                icon={{ color: "warning", component: "comment" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            {minicard == null ? (
              <Skeleton height={100} />
            ) : (
              <MiniStatisticsCard
                title={{ text: "Votes" }}
                count={minicard.vote.new}
                percentage={{ color: "success", text: minicard.vote.total }}
                icon={{ color: "success", component: "thumbs_up_down" }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={2}>
            {minicard == null ? (
              <Skeleton height={100} />
            ) : (
              <MiniStatisticsCard
                title={{ text: "Report" }}
                count={minicard.report.new}
                percentage={{ color: "success", text: minicard.report.total }}
                icon={{ color: "error", component: "poll" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      {/* <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <GradientLineChart
              title="Population Overview"
              height="15.25rem"
              chart={dboardData.line}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <ReportsBarChart
              title="active vendor"
              chart={dboardData.bar}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PieChart
              title="Sales Report"
              height="20rem"
              chart={dboardData.salesPie}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PieChart
              title="Purchase Report"
              height="20rem"
              chart={dboardData.purchasePie}
            />
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}


export default Dashboard;
