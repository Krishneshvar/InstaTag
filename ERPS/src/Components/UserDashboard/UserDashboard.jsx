import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import 'chart.js/auto';
import './UserDashboard.css';

function UserDashboard({ onLogout }) {
    const { vehicle_no } = useParams();
    const [userData, setUserData] = useState(null); // Store user data
    const [transactions, setTransactions] = useState([]); // Store transactions
    const [error, setError] = useState(null);

    // Fetch user data and transactions when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user-details/${vehicle_no}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);  // Set user data
                    setTransactions(data.transactions);  // Set recent transactions
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUserData();
    }, [vehicle_no]);    

    if (error) return <p>{error}</p>;
    if (!userData) return <p>Loading...</p>;

    // Data for the chart
    const chartData = {
        labels: transactions.map(tx => tx.date),
        datasets: [
            {
                label: `Toll Amount (₹) - ${userData.vehicleName}`,
                data: transactions.map(tx => tx.amount),
                borderColor: '#00D1B2',
                backgroundColor: 'rgba(0, 209, 178, 0.2)',
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
                    color: '#FFFFFF',
                },
                min: 0,
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>User Dashboard</h1>
            </header>

            {/* User Info Section */}
            <div className="user-info">
                <img src={userData.profileImage || './profile.jpg'} alt="User" className="user-image" />
                <div className="user-details">
                    <p className="user-name">{userData.name}</p>
                    <p className="user-vehicle">{userData.vehicleName}</p>
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
                        {transactions.length > 0 ? (
                            transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{tx.date}</td>
                                    <td>{tx.tollName}</td>
                                    <td>{tx.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    No transactions available
                                </td>
                            </tr>
                        )}
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
