import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './UserDashboard.css';

// Sample user data
const user = {
    name: 'Ratheesh Kumar',
    vehicleName: 'Audi Rs',
    userImage: './profile.jpg' // Replace with the actual image URL or local path
};

function UserDashboard({ onLogout }) {
    // Sample data for recent transactions
    const transactions = [
        { id: 1, date: '2024-09-12', tollName: 'Toll A', amount: 70 },
        { id: 2, date: '2024-09-10', tollName: 'Toll B', amount: 45 },
        { id: 3, date: '2024-09-08', tollName: 'Toll C', amount: 78 },
        { id: 4, date: '2024-09-05', tollName: 'Toll D', amount: 90 },
    ];

    // Data for the chart
    const chartData = {
        labels: transactions.map(tx => tx.date),
        datasets: [
            {
                label: `Toll Amount (₹) - ${user.vehicleIcon}`, // Include the vehicle icon in the graph label
                data: transactions.map(tx => tx.amount),
                borderColor: '#00D1B2', 
                backgroundColor: 'rgba(0, 209, 178, 0.2)', // Light teal fill
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00D1B2',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#FFFFFF' 
                },
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    color: '#FFFFFF', 
                },
                ticks: {
                    color: '#FFFFFF', 
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount (₹)',
                    color: '#FFFFFF', 
                },
                ticks: {
                    color: '#FFFFFF', // White ticks
                },
                min: 0,
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
                {/* <button className="btn btn-secondary" onClick={onLogout}>Logout</button> */}
            </header>

            {/* User Info Section */}
            <div className="user-info">
                <img src={user.userImage} alt="User" className="user-image" />
                <div className="user-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-vehicle">{user.vehicleName} {user.vehicleIcon}</p>
                </div>
            </div>

            <div className="recent-transactions">
                <h2>Recent Toll Transactions</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Toll Name</th>
                            <th>Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id}>
                                <td>{tx.date}</td>
                                <td>{tx.tollName}</td>
                                <td>{tx.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-section">
                <h2>Toll Transaction Overview</h2>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default UserDashboard;
