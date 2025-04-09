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
import { useOrders } from '@/hooks/useOrders';
import dayjs from "dayjs";
import { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function SalesChart() {
  const { order } = useOrders();
  const { theme } = useTheme();

  const orderData = order?.filter((pedido:any) => pedido.status === 'Accepted');

  const isDarkMode = theme === 'dark' ? '#fff': '#333';

  const monthlySales = useMemo(() => {
    const salesData: Record<string, number> = {};

    orderData?.forEach((item: any) => {
      const month = dayjs(item.createdAt).locale("pt-br").format("MMM");
      if (!salesData[month]) {
        salesData[month] = 0;
      }
      salesData[month] += item.orderValue;
    });

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const labels = monthOrder;
    const data = labels.map((month) => salesData[month] || 0);

    return { labels, data };
  }, [order]);

  const data = {
    labels: monthlySales.labels,
    datasets: [
      {
        label: "Vendas",
        data: monthlySales.data,
        borderColor: "#ff7f50",
        backgroundColor: "rgba(255, 127, 80, 0.2)",
        borderWidth: 3,
        pointBackgroundColor: "#ff7f50",
        pointBorderColor: "#fff",
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
          color: isDarkMode,
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
        color: theme === 'dark' ? '#fff' : '#444',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: isDarkMode,
          callback: (value: number) => `R$ ${value.toFixed(2)}`, // Formata valores com R$
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
    },
  };

  return (
    <div className={`transiton-all duration-500 m-auto max-w-[350px] lg:max-w-full w-full h-80 ${theme === 'dark' ? 'bg-[#202020]' : 'bg-white'} p-4 rounded-lg shadow-md`}>
      <Line data={data} options={options} />
    </div>
  );
}