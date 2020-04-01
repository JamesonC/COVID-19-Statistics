import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FaGithub } from 'react-icons/fa';
import { FaEnvelopeOpenText } from 'react-icons/fa';

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
            style={{ maxWidth: 50, maxHeight: 50, borderRadius: 5 }}
          />
          <Typography variant="h6" color="inherit" style={{ paddingLeft: 10 }}>
            COVID-19 Statistics
          </Typography>
          <div style={{ position: 'absolute', right: 0, marginRight: 50 }}>
            <a target='_blank' rel="noopener noreferrer" style={{ color: 'white', marginRight: 20 }} href={'https://forms.gle/apBVdMxyAydpA9g57'}><FaEnvelopeOpenText size={30} /></a>
            <a target='_blank' rel="noopener noreferrer" style={{ color: 'white' }} href={'https://github.com/JamesonC/COVID-19-Statistics'}><FaGithub size={30} /></a>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}