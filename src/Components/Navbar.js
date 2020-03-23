import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  styling: {
      backgroundColor: '#1B1B1B',
      color: 'white',
  }
});

export default function SimpleAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.styling}>
        <Toolbar>
          <img src="https://cdn.abcotvs.com/dip/images/5971867_022720-cc-ap-coronavirus-img.jpg?w=800&r=16%3A9"
            alt="logo"
            style={{maxWidth: 50, maxHeight: 50, borderRadius: 5}}
          />
          <Typography variant="h6" color="inherit" style={{paddingLeft: 10}}>
            COVID-19 Statistics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}