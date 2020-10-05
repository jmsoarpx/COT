import React, { useState, useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

let myBarChart;

export default function BarChart(props) {
    var chartRef = useRef("2d");

    useEffect(() => {
        var myChart = chartRef.current;

        myBarChart = new Chart(myChart, props.data)
    });

    return (
        <canvas ref={chartRef} />
    );
}