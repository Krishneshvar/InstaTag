import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ExpenseChart({ expenses }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Prepare data for the chart
      const data = expenses.map(expense => ({
        x: new Date(expense.timestamp),
        y: expense.amount
      }));

      // Create new chart instance
      const ctx = chartRef.current.getContext('2d');
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

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className="chart-container" style={{ position: 'relative', height: '60vh', width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
}
