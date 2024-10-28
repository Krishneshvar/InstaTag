import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ExpenseChart from './ExpenseChart';
import './UserDashboard.css';

export default function VehicleDetails() {
  const { user_id, vehicle_no } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`http://192.168.43.148:3000/api/vehicle-details/${vehicle_no}`);
        if (response.ok) {
          const data = await response.json();
          setVehicleData(data);
        } else {
          throw new Error("Failed to fetch vehicle details");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://192.168.43.148:3000/api/vehicle-expenses/${vehicle_no}`);
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        } else {
          throw new Error("Failed to fetch expense data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVehicleDetails();
    fetchExpenses();
  }, [vehicle_no]);

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  if (!vehicleData) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="details-container">
      <div className="col-lg-10 offset-lg-1 pt-5">
        <div className="card-body pt-5">
          <h1 className="card-title text-center mb-4 pt-6">Vehicle Details</h1>
          <div className="row mb-4">
            <div className="col-md-6">
              <h2 className="h4 mb-3">{vehicleData.vehicle_type}</h2>
              <p className="lead">{vehicleData.vehicle_no}</p>
              <p className="card-text"><strong>Engine Number:</strong> {vehicleData.engine_no}</p>
              <p className="card-text"><strong>Chassis Number:</strong> {vehicleData.chasis_no}</p>
              <p className="card-text"><strong>User ID:</strong> {vehicleData.user_id}</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-1"><strong>Tag ID: "Please manually visit and verify in the nearest InstaTag office to get your InstaTag."</strong> {vehicleData.instagat_id}</p>
              <p><strong>Tag Created:</strong> {new Date(vehicleData.tag_created).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="use-card">
          <h2 className="">Expense History</h2>
          <div className="card__content">
            {expenses.length === 0 ? (
              <p>No expenses found for this vehicle.</p>
            ) : (
              <ExpenseChart expenses={expenses} />
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={`/user-dashboard/${user_id}`} className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
