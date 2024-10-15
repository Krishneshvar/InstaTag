import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './TollEmp.css';

const TollEmp = () => {
    const [vehicleData, setVehicleData] = useState([]); // Store multiple vehicle details in an array
    const [error, setError] = useState(null);
    const scannerRef = useRef(null); // Store the scanner reference to prevent multiple instances

    useEffect(() => {
        // Initialize the scanner only if it hasn't been initialized already
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'qr-reader', // ID of the container element
                { fps: 10, qrbox: { width: 250, height: 250 } }, // Configuration options
                false // verbose mode
            );

            scanner.render(handleScanSuccess, handleScanError);
            scannerRef.current = scanner; // Store scanner instance
        }

        return () => {
            // Clear the scanner when the component unmounts
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null; // Ensure it's reset
            }
        };
    }, []);

    const handleScanSuccess = (decodedText, decodedResult) => {
        try {
            const parsedData = JSON.parse(decodedText); // Assuming QR code contains JSON
            setVehicleData(prevData => [...prevData, parsedData]); // Add the new data to the table
            setError(null); // Clear error if the scan is successful
        } catch (err) {
            setError('Invalid QR code data');
        }
    };

    const handleScanError = (errorMessage) => {
        console.error(errorMessage); // Log the error for debugging
        setError('Error scanning the QR code. Please try again.');
    };

    return (
        <div className="toll-emp-container">
            <h2>Toll Employee Interface</h2>

            <div className="toll-emp-wrapper">
                {/* QR Scanner */}
                <div id="qr-reader" style={{ width: '320px', height: '320px' }}></div>

                {/* Vehicle Information Table */}
                <div className="vehicle-info-table">
                    <h4>Scanned Vehicles</h4>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Vehicle Number</th>
                                <th>Aadhaar Number</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleData.length > 0 ? (
                                vehicleData.map((vehicle, index) => (
                                    <tr key={index}>
                                        <td>{vehicle.vehicleNumber}</td>
                                        <td>{vehicle.aadhaarNumber}</td>
                                        <td>{vehicle.phoneNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        No vehicles scanned yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TollEmp;
