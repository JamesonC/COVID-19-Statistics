import React, { useState } from "react";
import { useTheme, createStyles } from "@material-ui/styles";
import classnames from "classnames";
import { calculateWorldwideTotalCases, calculateWorldwideActiveCases, calculateWorldwideTotalDeaths, calculateWorldwideCriticalCases, calculateLast7DaysofWorldwideActiveCases } from '../libs/helpers';

// styles
import useStyles from "./styles";

// components
import Widget from "./Widget/Widget";
import { Typography } from "./Wrappers/Wrappers";


export const BigStat = props => {

  var classes = useStyles();
  var theme = useTheme();
  const worldwideActiveCases = calculateWorldwideActiveCases(props.data)

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Worldwide Active Cases</Typography>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {/* {total[value]} */}
            {worldwideActiveCases}
          </Typography>
          {/* <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {total.percent.value}%
          </Typography> */}
        </div>
      </div>
    </Widget>
  );
}

export const BigStatTwo = props => {
  var classes = useStyles();
  const worldwideTotalCases = calculateWorldwideTotalCases(props.data)

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Worldwide Total Cases</Typography>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {worldwideTotalCases}
          </Typography>
        </div>
      </div>
    </Widget>
  );
}

export const BigStatThree = props => {

  var classes = useStyles();
  var theme = useTheme();
  const worldwideDeaths = calculateWorldwideTotalDeaths(props.data)

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Worldwide Deaths</Typography>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {/* {total[value]} */}
            {worldwideDeaths}
          </Typography>
          {/* <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {total.percent.value}%
          </Typography> */}
        </div>
      </div>
    </Widget>
  );
}

export const BigStatFour = props => {
  var classes = useStyles();
  const worldwideCriticalCases = calculateWorldwideCriticalCases(props.data)

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">Worldwide Critical Cases</Typography>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {worldwideCriticalCases}
          </Typography>
        </div>
      </div>
    </Widget>
  );
}

// #######################################################################

// function getRandomData() {
//   return Array(7)
//     .fill()
//     .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
// }

// function getRandomData(info) {
//   return Array(7)
//     .fill()
//     .map(() => ({ value: info }));
// }
