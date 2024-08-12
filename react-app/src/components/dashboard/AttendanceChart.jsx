import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AttendanceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded shadow-sm border border-gray-200 h-80 flex items-center justify-center text-gray-500">
                No chart data available
            </div>
        );
    }

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Users Present',
                data: data.map(item => item.count),
                borderColor: '#2563eb', // blue-600
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                pointBackgroundColor: '#2563eb',
                tension: 0.1,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    borderDash: [2, 4],
                    color: '#e5e7eb',
                },
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">
                Attendance Trends
            </h3>
            <div className="h-72">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default AttendanceChart;
