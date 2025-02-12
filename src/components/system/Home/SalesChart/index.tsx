'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function SalesChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Vendas',
        data: [1200, 1900, 3000, 5000, 2300, 4000],
        borderColor: '#ff7f50',
        backgroundColor: 'rgba(255, 127, 80, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#ff7f50',
        pointBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Vendas Mensais',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#444',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#333',
          callback: (value: number) => `R$ ${value}`,
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
    },
  };

  return (
    <div className="m-auto max-w-[350px] lg:max-w-full w-full h-80 bg-white p-4 rounded-lg shadow-md">
      <Line data={data} options={options} />
    </div>
  );
}
