import React, {useEffect, useRef, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {useBreakpointValue} from "@chakra-ui/react";

const EatenMealsLastWeekChart = ({ eatenMealsFromLastWeek }) => {
    const chartRef2 = useRef(null);
    const isMobile = useBreakpointValue({ base: true, lg: false });

    if (!eatenMealsFromLastWeek || eatenMealsFromLastWeek.length === 0) {
        return <p>Nie ma danych z ostatniego tygodnia</p>;
    }
    eatenMealsFromLastWeek.sort((a, b) => new Date(a.date) - new Date(b.date));


    const labels = eatenMealsFromLastWeek.map(meal => meal.date);
    const dataPoints = eatenMealsFromLastWeek.map(meal => meal.calories);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Spożyte kalorie w dniu',
                data: dataPoints,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    };

    const options = {

        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    if (isMobile) {
        options.maintainAspectRatio = false
    }
    return <div >
        <Bar ref={chartRef2} data={data} options={options}/>
    </div>
};

export default EatenMealsLastWeekChart;
