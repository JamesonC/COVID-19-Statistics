import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'day', label: 'Day/Time', align: 'center', minWidth: 100 },
  {
    id: 'lastUpdate',
    label: 'New Cases',
    minWidth: 100,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'confirmed',
    label: 'Active Cases',
    minWidth: 100,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'deaths',
    label: 'Critical Cases',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'recovered cases',
    label: 'Recovered Cases',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'Total Cases',
    label: 'Total Cases',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'Total Deaths',
    label: 'Total Deaths',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 500
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const stats = props.data

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        {stats !== undefined ?
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: '#1B1B1B', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {stats.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">{row.country}</StyledTableCell>
                    <StyledTableCell align="right">{row.time}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases.new.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases.active.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases.critical.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases.recovered.toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases.total.toLocaleString()}</StyledTableCell>
                    {/* <StyledTableCell align="right">{row.deaths.new}</StyledTableCell> */}
                    <StyledTableCell align="right">{row.deaths.total.toLocaleString()}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table> : null}
      </TableContainer>
      {stats !== undefined ?
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={Object.keys(stats).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> : null}
    </Paper>
  );
}