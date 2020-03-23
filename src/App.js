import React from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  const [country, setCountry] = React.useState('US');

  const handleChange = event => {
    setCountry(event.target.value);
  };

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
        }}>Data from <a style={{ marginLeft: 5, color: 'blue' }} target='_blank' rel="noopener noreferrer" href={'https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics/details'}> John Hopkin's University</a></p>
      </Box>
    </div>
  );
}

export default App;
