import React, { useState, useEffect } from 'react';
import './App.css';
import { useTheme } from "@material-ui/styles";
import { Box, Paper, Typography, Grid } from '@material-ui/core';
import ReactGA from 'react-ga';

// styles
import useStyles from "./Components/styles";

// components
import NavBar from './Components/Navbar/Navbar';
import StickyTable from './Components/Table/FixedHeaderTable';
import LineCharts from './Components/Line Charts/LineChart';
import LineChartTwo from './Components/Line Charts/LineCartTwo';
import StackedBarChar from './Components/Bar Charts/StackedBarChart';
import MixedBarChart from './Components/Bar Charts/MixedBarChart';
import DropbdownButton from './Components/Dropdown Button/DropDownButton';
import { BigStat, BigStatTwo, BigStatThree, BigStatFour } from './Components/BigStat';
// import mock from './Components/mock';
// import Widget from './Components/Widget';

// keys
const GA_ID = `${process.env.REACT_APP_GA_KEY}`;
const HOST_KEY = `${process.env.REACT_APP_HOST}`;
const API_KEY = `${process.env.REACT_APP_COVID19_API_KEY}`;


const initializeAnalytics = () => {
  ReactGA.initialize(GA_ID)
  ReactGA.pageview('/')
}

function App() {
  initializeAnalytics();

  let classes = useStyles();
  let theme = useTheme();

  const [data, setData] = useState({ data: [] });
  const [dataHistory, setDataHistory] = useState({ dataHistory: [] });
  const [query, setQuery] = useState('Italy'); // USA
  const [country, setCountry] = useState('Italy');
  const covid19Stats = data.response
  const countryHistory = dataHistory.response
  // const [server, setServer] = useState({ data: null })

  const updateStats = event => {
    const value = event.target.value
    setCountry(value);
    setQuery(value);
    ReactGA.event({
      category: 'Country Selected',
      action: 'Button Click',
    });
  }

  // useEffect(() => {
  //   const callBackendAPI = async () => {
  //     const response = await fetch('/');
  //     response
  //       .json()
  //       .then(result => setServer(result))
  //       .catch((e => console.log(e)))
  //   };
  //   callBackendAPI()
  // }, []);

  // console.log(server)
  {/* <p>{server.express}</p> */ }

  useEffect(() => {
    const fetchDataHistory = async () => {
      const response = await fetch(
        `https://covid-193.p.rapidapi.com/history?country=${query}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": HOST_KEY,
          "x-rapidapi-key": API_KEY
        }
      },
      )
      response
        .json()
        .then(result => setDataHistory(result))
        .catch(e => console.log(e))
    };
    const fetchData = async () => {
      const response = await fetch(
        `https://covid-193.p.rapidapi.com/statistics`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": HOST_KEY,
          "x-rapidapi-key": API_KEY
        }
      },
      )
      response
        .json()
        .then(result => setData(result))
        .catch(e => console.log(e))
    };
    fetchDataHistory();
    fetchData()
  }, [query]);

  return (
    <div className="App">
      <NavBar />
      <Grid item xs={12} container direction="row" justify="flex-start" alignItems="center" style={{ paddingLeft: 50, paddingRight: 50, marginTop: 10 }}>
        {/* <PieChart data={countryHistory} /> */}
        {/* {mock.bigStat.map(stat => (
          <Grid lg={3} md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} data={covid19Stats} />
          </Grid>
        ))} */}
        <Grid lg={3} md={4} sm={6} xs={12}>
          <BigStatTwo data={covid19Stats} />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={12}>
          <BigStat data={covid19Stats} />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={12}>
          <BigStatFour data={covid19Stats} />
        </Grid>
        <Grid lg={3} md={4} sm={6} xs={12}>
          <BigStatThree data={covid19Stats} />
        </Grid>
        <DropbdownButton handleChange={updateStats} country={country} />
        <Typography style={{ paddingLeft: 20 }}>Search by country to see graphs</Typography>
        <Grid item xs={12} container direction="row" justify="space-evenly" style={{ marginBottom: 10 }}>
          <Paper>
            <StackedBarChar data={countryHistory} />
          </Paper>
          <Paper>
            <MixedBarChart data={countryHistory} />
          </Paper>
          <Paper style={{ marginTop: 10 }}>
            <LineCharts data={countryHistory} />
          </Paper>
          <Paper style={{ marginTop: 10 }}>
            <LineChartTwo data={countryHistory} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <StickyTable data={covid19Stats} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
