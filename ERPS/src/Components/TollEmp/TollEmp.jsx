import React, { useState } from 'react';
// import { QrScanner } from 'react-qr-scanner';
import './TollEmp.css';

const TollEmp = () => {
    const [vehicleData, setVehicleData] = useState(null);
    const [error, setError] = useState(null);
    const tollEmployeeName = "Ratheesh"; // Replace with actual toll employee's name

    const handleScan = (data) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data); // Assuming the QR contains JSON data
                setVehicleData(parsedData); // Store the vehicle data from the QR code
            } catch (err) {
                setError('Invalid QR code data');
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError('Error scanning the QR code. Please try again.');
    };

    const handleConfirm = () => {
        if (vehicleData) {
            alert(`Vehicle ${vehicleData.vehicleNumber} has been processed.`);
            setVehicleData(null); // Clear the form after confirmation
        }
    };

    const simulateQrScan = () => {
        const sampleData = JSON.stringify({
            vehicleNumber: "TN 01 AB 1234",
            aadhaarNumber: "1234-5678-9012",
            phoneNumber: "9876543210"
        });
        handleScan(sampleData); // Simulating QR scan
    };

    return (
        <div className="toll-emp-container">
            <h2>Toll Employee Interface</h2>

            {/* Display the employee's name */}
            <h4>Welcome, {tollEmployeeName}</h4>

            {/* Button to simulate QR scanning */}
            <button className="btn btn-primary" onClick={simulateQrScan}>
                Scan QR Code
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Vehicle Information Form */}
            {vehicleData && (
                <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <h4>Vehicle Information</h4>
                    <p><strong>Vehicle Number:</strong> {vehicleData.vehicleNumber}</p>
                    <p><strong>Aadhaar Number:</strong> {vehicleData.aadhaarNumber}</p>
                    <p><strong>Phone Number:</strong> {vehicleData.phoneNumber}</p>
                    <button className="btn btn-success" onClick={handleConfirm}>Confirm Transaction</button>
                </div>
            )}
        </div>
    );
};

export default TollEmp;
