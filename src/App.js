import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import NavBar from './Components/Navbar';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StickyTable from './Components/FixedHeaderTable';
import LineChart from './Components/LineChart';
import LineChartTwo from './Components/LineCartTwo';
import StackedBarChar from './Components/StackedBarChart';
import MixedBarChart from './Components/MixedBarChart';
// import PieChart from './Components/PieChart';
const GA_ID = `${process.env.REACT_APP_GA_KEY}`;
const HOST_KEY = `${process.env.REACT_APP_HOST}`;
const API_KEY = `${process.env.REACT_APP_COVID19_API_KEY}`

const initializeAnalytics = () => {
  ReactGA.initialize(GA_ID)
  ReactGA.pageview('/')
}

// const trackingId = GA_ID; // Google Analytics tracking ID
// ReactGA.initialize(trackingId);


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const calculateWorldwideTotal = obj => {
//   if (obj === undefined) {
//     return null
//   } else {
//     const arrayObject = obj.map(result => {
//       return result.cases.total
//     })
//     const total = arrayObject.reduce((a, b) => a + b / 2).toLocaleString()
//     return total
//   }
// }

const calculateWorldwideTotalCases = arr => {
  if (arr === undefined) {
    return null
  } else {
    const arrayObject = arr.map(result => {
      return result.cases.total
    })
    console.log(arrayObject)
    const total = arrayObject.reduce((a, b) => a + b / 2).toLocaleString()
    return total
  }
}

const calculateWorldwideTotalDeaths = obj => {
  if (obj === undefined) {
    return null
  } else {
    const arrayObject = obj.map(result => {
      return result.deaths.total
    })
    const deathTotal = arrayObject.reduce((a, b) => a + b / 2).toLocaleString()
    return deathTotal
  }
}

function App() {
  initializeAnalytics();
  const classes = useStyles();
  const [data, setData] = useState({ data: [] });
  const [dataHistory, setDataHistory] = useState({ dataHistory: [] });
  const [query, setQuery] = useState('Italy'); // USA
  const [country, setCountry] = React.useState('Italy');
  const covid19Stats = data.response
  const countryHistory = dataHistory.response
  const [server, setServer] = useState({ data: null })
  const totalWorldwideDeaths = calculateWorldwideTotalDeaths(covid19Stats)
  const totalCases = calculateWorldwideTotalCases(covid19Stats)
  // console.log(totalCases)
  // console.log(totalWorldwideDeaths)


  const handleChange = event => {
    setCountry(event.target.value);
    setQuery(event.target.value)
    ReactGA.event({
      category: 'Country Selected',
      action: 'Button Click',
    });
  };

  useEffect(() => {
    const callBackendAPI = async () => {
      const response = await fetch('/');
      response
        .json()
        .then(result => setServer(result))
        .catch((e => console.log(e)))
    };
    callBackendAPI()
  }, []);

  // console.log(server)

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
      <div justifyContent='space-around' style={{ marginLeft: 50, marginRight: 50 }}>
        <Box display='flex' style={{ marginTop: 10 }}>
          {/* <p>{server.express}</p> */}
          <div>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={country}
                onChange={handleChange}
                label="Country"
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={'USA'}>United States</MenuItem>
                <MenuItem value={'Italy'}>Italy</MenuItem>
                <MenuItem value={'Canada'}>Canada</MenuItem>
                <MenuItem value={'China'}>China</MenuItem>
                <MenuItem value={'India'}>India</MenuItem>
                <MenuItem value={'Indonesia'}>Indonesia</MenuItem>
                <MenuItem value={'Pakistan'}>Pakistan</MenuItem>
                <MenuItem value={'Brazil'}>Brazil</MenuItem>
                <MenuItem value={'Russia'}>Russia</MenuItem>
                <MenuItem value={'Mexico'}>Mexico</MenuItem>
                <MenuItem value={'Japan'}>Japan</MenuItem>
                <MenuItem value={'France'}>France</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <p style={{marginLeft: 20}}>Get statistics for all countries about COVID-19</p>
            <div style={{ marginLeft: 20 }}> | </div>
            <p style={{marginLeft: 20}}>Total Worldwide Cases: {totalCases}</p>
            <div style={{marginLeft: 20}}> | </div>
            <p style={{marginLeft: 20}}>Total Worldwide Deaths: {totalWorldwideDeaths}</p>
          </div>
        </Box>
        <Box display='flex' flexWrap="wrap" justifyContent='space-around' style={{ marginBottom: 10, marginTop: 10 }}>
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
          {/* <Paper>
            <LineChartTwo data={countryHistory} />
          </Paper> */}
        </Box>
        <div style={{ marginTop: 25 }}>
          <StickyTable data={covid19Stats} />
        </div>
      </div>
    </div>
  );
}

export default App;
