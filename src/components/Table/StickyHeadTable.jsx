import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
    {
        id: 'notificacao',
        label: 'Notificação',
        align: "center",
        minWidth: 170,
    },
    {
        id: 'numeroChamado', 
        label: 'Número do Chamado', 
        minWidth: 100,
        align: "center",
        format: value => value.toLocaleString(),
    },
    {
        id: 'qtdchamados', 
        label: 'Quantidade de Chamados', 
        minWidth: 100,
        align: "center",
        format: value => value.toLocaleString(),
    },
    {
        id: 'inicioTratamento',
        label: 'Inicio do Tratamento',
        minWidth: 170,
        align: 'center',
        format: value => value.toLocaleString(),
    },
    {
        id: 'fimTratamento',
        label: 'Fim do Tratamento',
        minWidth: 170,
        align: 'center',
        format: value => value.toLocaleString(),
    },
    {
        id: 'origem',
        label: 'Origem',
        minWidth: 170,
        align: 'center',
    },
];

function createData(notificacao, numeroChamado, quantidadeChamados, inicioTratamento, fimTratamento, origem) {
    return { notificacao, numeroChamado, quantidadeChamados, inicioTratamento, fimTratamento, origem };
}

export default function StickyHeadTable(props) {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rowsArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rowsArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
