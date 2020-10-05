import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

let myLineChart;

export default function LineChart(props) {
    var chartRef = useRef("2d");



    useEffect(() => {
        var myChart = chartRef.current;

        myLineChart = new Chart(myChart, props.data);

    });

    return (
        <canvas ref={chartRef} />
    );
}