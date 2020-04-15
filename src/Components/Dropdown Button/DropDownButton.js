import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    makeStyles,
} from "@material-ui/core";

import { borderColor } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Dropdown(props) {

    const classes = useStyles();
    const handleChange = props.handleChange
    const value = props.country

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label="Country"
            >
                <MenuItem value={"Country"}>Country</MenuItem>
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
    );
}