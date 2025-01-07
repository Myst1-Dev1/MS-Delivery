import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DonutChart () {
  const data = {
    labels: ['Muito Satisfeito', 'Satisfeito', 'Neutro', 'Insatisfeito', 'Muito Insatisfeito'],
    datasets: [
      {
        label: 'Grau de Satisfação',
        data: [32, 25.6, 23.8, 9.9, 8.7],
        backgroundColor: [
          '#4CAF50',
          '#2196F3',
          '#FFC107',
          '#F44336',
          '#9C27B0',
        ],
        hoverOffset: 10,
      },
    ],
  };

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context:any) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="w-60 h-60">
      <Doughnut data={data} options={options} />
    </div>
  );
};