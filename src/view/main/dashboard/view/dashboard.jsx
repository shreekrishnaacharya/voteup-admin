import { useEffect } from "react";
import Grid from "@mui/material/Grid";

import MiniStatisticsCard from "components/charts/MiniStatisticsCard";
import ReportsBarChart from "components/charts/BarCharts/ReportsBarChart";
import GradientLineChart from "components/charts/LineCharts/GradientLineChart";
import PieChart from "components/charts/PieChart";

import { getLineChart, getBarChart, getMiniCard } from "../model/list";
import { getDashboard } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "redux/action/dboardAction";
import Loader from "components/Loader";

function Dashboard() {
  const dboardData = useSelector(state => state.dboard);
  const dispatch = useDispatch();
  async function loadData() {
    await getDashboard().then((res) => {
      if (res.flag) {
        console.log(res.data);
        if (Object.keys(res.data).length) {
          dispatch(setDashboard({
            minicard: res.data.minicard,
            line: getLineChart(res.data.bar),
            bar: getBarChart(res.data.bar[0]),
            ...getMiniCard(res.data)
          }));
        } else {
          dispatch(setDashboard({}));
        }
      }
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (dboardData === null || Object.keys(dboardData).length == 0) {
    return (<Loader />);
  }

  const minicard = dboardData.minicard;
  console.log(dboardData);
  return (
    <SuiBox py={3}>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Sales" }}
              count={minicard.sales}
              percentage={{ color: dboardData.sales_pay < 0 ? "error" : "success", text: dboardData.sales_pay }}
              icon={{ color: "info", component: "paid" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Purchase" }}
              count={minicard.purchase}
              percentage={{ color: dboardData.purchase_pay < 0 ? "error" : "success", text: dboardData.purchase_pay }}
              icon={{ color: "info", component: "public" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Customers" }}
              count={minicard.customers}
              // percentage={{ color: "success", text: "+5%" }}
              icon={{ color: "info", component: "emoji_events" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Vendors" }}
              count={minicard.vendors}
              // percentage={{ color: "success", text: "+5%" }}
              icon={{
                color: "info",
                component: "shopping_cart",
              }}
            />
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mb={3}>
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
      </SuiBox>
    </SuiBox>
  );
}


export default Dashboard;
