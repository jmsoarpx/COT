import React from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default function Card(props) {
    return (
        <>
            <Paper className={`card p-3 card-${props.variant}`}>
                <Typography >{props.title}</Typography>
                <Typography variant="h3" className="w-100 text-right">{props.value}</Typography>
                <Divider />
                {props.info.type === 1 ?
                    <Typography className="mt-3">Aumento de {props.info.value} <ArrowUpwardIcon style={{ fontSize: 25 }} /></Typography>
                    :
                    <Typography className="mt-3">Queda de {props.info.value} <ArrowDownwardIcon style={{ fontSize: 25 }} /></Typography>
                }

            </Paper>
        </>
    );
}