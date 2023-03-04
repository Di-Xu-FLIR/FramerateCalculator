import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type LineChartPropsType = {
    selectedModel: string;
    isISPOn: boolean;
    selectedADC: string;
    selectedPixelFormat: string;
};

const LineChart = ({
    selectedModel,
    isISPOn,
    selectedADC,
    selectedPixelFormat,
}: LineChartPropsType) => {
    const [ChartData, setChartData] = useState({ labels: [], data: [] });

    const defaultOptions = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Max FPS",
                    font: {
                        size: 20, // set font size to 24px
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "ROI Height",
                    font: {
                        size: 20, // set font size to 24px
                    },
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Frame-rate vs ROI Height Line Chart",
            },
        },
    };

    let labels = ["January", "February", "March", "April", "May", "June", "July"];
    let defaultDataForDataSet = labels.map(() => faker.datatype.number({ min: -1000, max: 1000 }));
    if (ChartData.labels.length > 0) {
        labels = ChartData.labels;
        defaultDataForDataSet = ChartData.data;
    }

    const randomNum = faker.datatype.number({ min: 0, max: 6 });
    const CHART_COLORS: any = [
        // red:
        "rgb(255, 99, 132)",
        // orange:
        "rgb(255, 159, 64)",
        // yellow:
        "rgb(255, 205, 86)",
        // green:
        "rgb(75, 192, 192)",
        // blue:
        "rgb(54, 162, 235)",
        // purple:
        "rgb(153, 102, 255)",
        // grey:
        "rgb(201, 203, 207)",
    ];

    const defaultData = {
        labels,
        datasets: [
            {
                label: `${selectedPixelFormat}`,
                data: defaultDataForDataSet,
                borderColor: `${CHART_COLORS[randomNum]}`,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    //when any param change, useEffect re-fetch data on the graph
    const fetchChartData = async () => {
        const data = {
            cameraName: selectedModel,
            ISP: `${isISPOn ? "ON" : "OFF"}`,
            ADC: selectedADC,
            pixelFormat: selectedPixelFormat,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        try {
            const resp = await fetch("/api/getChartData", requestOptions);
            const chartData = await resp.json();
            const labels = chartData.map((item: string[]) => item[" HEIGHT"]);
            const dataForDataSet = chartData.map((item: string[]) => item[" FPS "]);
            setChartData({ labels: labels, data: dataForDataSet });
        } catch (err) {
            console.log("here", err);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [selectedModel, isISPOn, selectedADC, selectedPixelFormat]);
    // console.log(ChartData.data, ChartData.labels, defaultData.datasets[0].borderColor);

    return <Line options={defaultOptions} data={defaultData} />;
};

export default LineChart;
