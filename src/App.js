import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import { Box, Paper, InputLabel, MenuItem, FormControl, Select, IconButton, Menu, Typography, Grid, makeStyles } from '@material-ui/core';
import StickyTable from './Components/FixedHeaderTable';
import LineChart from './Components/LineChart';
import LineChartTwo from './Components/LineCartTwo';
import StackedBarChar from './Components/StackedBarChart';
import MixedBarChart from './Components/MixedBarChart';
import DropbdownButton from './Components/Dropdown Button/DropDownButton';
const GA_ID = `${process.env.REACT_APP_GA_KEY}`;
const HOST_KEY = `${process.env.REACT_APP_HOST}`;
const API_KEY = `${process.env.REACT_APP_COVID19_API_KEY}`;

const initializeAnalytics = () => {
  ReactGA.initialize(GA_ID)
  ReactGA.pageview('/')
}

const calculateWorldwideTotalCases = obj => {
  if (obj === undefined) {
    return null
  } else {
    const arrayObject = obj.map(result => {
      return result.cases.total
    })
    // console.log(arrayObject)
    const total = arrayObject.reduce((a, b) => a + b / 2)
    const roundedTotal = Math.round(total).toLocaleString()
    return roundedTotal
  }
}

const calculateWorldwideTotalDeaths = obj => {
  if (obj === undefined) {
    return null
  } else {
    const arrayObject = obj.map(result => {
      return result.deaths.total
    })
    const deathTotal = arrayObject.reduce((a, b) => a + b / 2)
    const roundedDeathTotal = Math.round(deathTotal).toLocaleString()
    return roundedDeathTotal
  }
}

function App() {
  initializeAnalytics();
  const [data, setData] = useState({ data: [] });
  const [dataHistory, setDataHistory] = useState({ dataHistory: [] });
  const [query, setQuery] = useState('Italy'); // USA
  const [country, setCountry] = useState('Italy');
  const covid19Stats = data.response
  const countryHistory = dataHistory.response
  // const [server, setServer] = useState({ data: null })
  const totalWorldwideDeaths = calculateWorldwideTotalDeaths(covid19Stats)
  const totalCases = calculateWorldwideTotalCases(covid19Stats)

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
        <Grid item xs={12} container direction="row" justify="flex-start" alignItems="center" style={{paddingLeft: 50, paddingRight: 50, marginTop: 10}}>
          <DropbdownButton handleChange={updateStats} country={country} />
          <Typography style={{ marginLeft: 20 }}>Get statistics for all countries about COVID-19</Typography>
          <div style={{ marginLeft: 20 }}> | </div>
          <Typography style={{ marginLeft: 20 }}>Worldwide Cases: <strong>{totalCases}</strong></Typography>
          <div style={{ marginLeft: 20 }}> | </div>
          <Typography style={{ marginLeft: 20 }}>Worldwide Deaths: <strong>{totalWorldwideDeaths}</strong></Typography>
          {/* <PieChart data={countryHistory} /> */}
            <Grid item xs={12} container direction="row" justify="space-evenly">
              <Paper>
                <StackedBarChar data={countryHistory} />
              </Paper>
              <Paper>
                <MixedBarChart data={countryHistory} />
              </Paper>
              <Paper style={{ marginTop: 10 }}>
                <LineChart data={countryHistory} />
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
