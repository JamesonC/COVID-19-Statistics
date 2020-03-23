import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const HOST_KEY= `${process.env.REACT_APP_HOST}`;
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
  const [query, setQuery] = useState('US');
  const [country, setCountry] = React.useState('US');
  const covid19Stats = data.data.covid19Stats;
  console.log(covid19Stats)

  const handleChange = event => {
    setCountry(event.target.value);
    setQuery(event.target.value)
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${query}`, {
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
    fetchData();
  }, [query]);

  return (
    <div className="App">
      <NavBar />
      <Box display='flex' flexDirection='row' style={{ paddingLeft: 50, paddingTop: 10, paddingBottom: 10 }}>
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
              <MenuItem value={'US'}>United States</MenuItem>
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
        }}>Data from <a style={{marginLeft: 5, color: 'blue'}} target='_blank' rel="noopener noreferrer" href={'https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics/details'}> John Hopkin's University</a></p>
      </Box>
    </div>
  );
}

export default App;
