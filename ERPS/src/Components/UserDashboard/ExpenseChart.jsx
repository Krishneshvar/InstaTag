import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ExpenseChart({ expenses }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the existing chart before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Prepare data for the chart
      const data = expenses.map(expense => ({
        x: new Date(expense.timestamp),
        y: expense.amount,
      }));

      // Create a new chart
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Amount Spent',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Amount ($)'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `Amount: $${context.parsed.y.toFixed(2)}`
              }
            }
          }
        }
      });
    }

    // Cleanup function to destroy the chart instance on component unmount or re-render
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]); // Depend on the 'expenses' prop

  return (
    <div className="chart-container" style={{ position: 'relative', height: '60vh', width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
}
