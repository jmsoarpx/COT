import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { green } from "@material-ui/core/colors";

const columns = [
	{
		id: 'nome',
		label: 'Nome',
		minWidth: 100,
		align: "center",
		format: value => value.toLocaleString(),
	},
	{
		id: 'tempoCallBack',
		label: 'Tempo de CallBack',
		minWidth: 100,
		align: "center",
		format: value => value.toLocaleString(),
	},
	{
		id: 'chamadosTratados',
		label: 'Chamados Tratados',
		minWidth: 170,
		align: 'center',
		format: value => value.toLocaleString(),
	},
	{
		id: 'produtividadeEsperada',
		label: 'Produtividade Esperada',
		minWidth: 170,
		align: 'center',
		format: value => value.toLocaleString(),
	},
	{
		id: 'diferenca',
		label: 'Diferença',
		minWidth: 170,
		align: 'center',
		format: value => value.toLocaleString(),
	},
];

function createData(nome, tempoCallBack, chamadosTratados, produtividadeEsperada, diferenca) {
	return { nome, tempoCallBack, chamadosTratados, produtividadeEsperada, diferenca };
}




export default function ProdutividadeTable(props) {
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
	const [rows, setRows] = React.useState([]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => setRows(props.data))


	console.log("row", rows);
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
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(row => {
								return (
									<>
										{row.chamadosTratados > row.produtividadeEsperada ?
											<TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{backgroundColor : "#c3e6cb"}}>
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

											:
											<TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{backgroundColor : "#f8d7da"}}>
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
											</TableRow>}
									</>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
