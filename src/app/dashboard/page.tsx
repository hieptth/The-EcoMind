import React from "react";
import { Box } from "@mui/material";
import DataRibbon from "app/component/Dashboard/DataRibbon";
import TransactionsPerDay from "app/component/Dashboard/TransactionsPerDay";
import TransactionBottomRow from "app/component/Dashboard/TransactionBottomRow";
import Grid from "@mui/material/Grid";

const Dashboard = () => {
  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
        <TransactionsPerDay />
      </Grid>
      <TransactionBottomRow />
    </Box>
  );
};
export default Dashboard;
