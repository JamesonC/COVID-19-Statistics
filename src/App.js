import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StickyTable from './Components/FixedHeaderTable';
import LineChart from './Components/LineChart';
import LineChartTwo from './Components/LineCartTwo';
// import PieChart from './Components/PieChart';
const HOST_KEY = `${process.env.REACT_APP_HOST}`;
const API_KEY = `${process.env.REACT_APP_COVID19_API_KEY}`


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



function App() {
  const classes = useStyles();
  const [data, setData] = useState({ data: [] });
  const [dataHistory, setDataHistory] = useState({ dataHistory: [] });
  const [query, setQuery] = useState('Italy'); // USA
  const [country, setCountry] = React.useState('Italy');
  const covid19Stats = data.response
  const countryHistory = dataHistory.response
  const [server, setServer] = useState({ data: null})

  const handleChange = event => {
    setCountry(event.target.value);
    setQuery(event.target.value)
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
      <Box display='flex' style={{ marginLeft: 50, marginTop: 10 }}>
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
        <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>Get statistics for all countries about COVID-19</p>
      </Box>
      <Box display='flex' flex-wrap='wrap' flexDirection='row' justifyContent='space-around' style={{ marginBottom: 10, marginLeft: 50, marginRight: 50 }}>
        <div>
          <LineChart data={countryHistory} />
        </div>
        <div>
          {/* <PieChart data={countryHistory} /> */}
          <LineChartTwo data={countryHistory} />
        </div>
      </Box>
      <div style={{ marginLeft: 50, marginRight: 50, marginTop: 25, marginBottom: 25 }}>
        <StickyTable data={covid19Stats} />
      </div>
    </div>
  );
}

export default App;
