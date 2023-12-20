import React, {useEffect, useRef, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {useBreakpointValue} from "@chakra-ui/react";


const EatenMealsSummaryChart = ({ eatenMealsSummary }) => {

    const chartRef = useRef(null);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    useEffect(() => {
        return () => {
            const chartInstance = chartRef.current;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);
    if (!eatenMealsSummary || eatenMealsSummary.length === 0) {
        return <p>Nie ma danych o dzisiejszym spożyciu kalorii.</p>;
    }

    const formatPercentage = (value) => {
        return !isNaN(value) ? `${value.toFixed(1)}%` : "";
    }

    const fatsPercentage = formatPercentage(((eatenMealsSummary.fatsConsumedToday * 9) / eatenMealsSummary.caloriesConsumedToday) * 100);
    const proteinsPercentage = formatPercentage(((eatenMealsSummary.proteinsConsumedToday * 4) / eatenMealsSummary.caloriesConsumedToday) * 100);
    const carbohydratesPercentage = formatPercentage(100 - parseFloat(fatsPercentage) - parseFloat(proteinsPercentage));


    const data = {
        labels: [`Kalorie`, `Węglowodany ${carbohydratesPercentage}`, `Tłuszcze ${fatsPercentage}`, `Białka ${proteinsPercentage}`],
        datasets: [
            {
                label: 'Spożyte Dziś',
                data: [
                    eatenMealsSummary.caloriesConsumedToday,
                    eatenMealsSummary.carbohydratesConsumedToday * 4,
                    eatenMealsSummary.fatsConsumedToday * 9,
                    eatenMealsSummary.proteinsConsumedToday * 4
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 255, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 255, 255, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Dzienne zapotrzebowanie',
                data: [eatenMealsSummary.caloriesDailyDemand, 0, 0, 0],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
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
    return <Bar data={data} options={options} />;
};

export default EatenMealsSummaryChart;
