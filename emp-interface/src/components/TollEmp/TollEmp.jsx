import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import './TollEmp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab, faCamera, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key';
const TollEmp = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [error, setError] = useState(null);
    const { empid } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [instaTagId, setInstaTagId] = useState(''); // InstaTag ID state
    const [scannerActive, setScannerActive] = useState(false);
    const html5QrCode = useRef(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/toll-emp/${empid}`);
                if (response.ok) {
                    const data = await response.json();
                    setEmployee(data);
                } else {
                    setError('Access denied or employee not logged in.');
                    navigate('/');
                }
            } catch (err) {
                setError('Error fetching employee details.');
            }
        };

        fetchEmployeeDetails();
    }, [empid, navigate]);

    useEffect(() => {
        if (scannerActive) {
            if (!html5QrCode.current) {
                const qrCodeRegionId = "reader";
    
                html5QrCode.current = new Html5Qrcode(qrCodeRegionId);
    
                const config = {
                    fps: 10,
                    qrbox: 250
                };
    
                // Variable to track the last scanned QR code to prevent duplicate processing
                let lastScannedCode = null;
    
                html5QrCode.current.start(
                    { facingMode: "environment" },
                    config,
                    (encryptedText) => {
                        // Decrypt the QR code data
                        try {
                            const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
                            const decodedText = bytes.toString(CryptoJS.enc.Utf8);
    
                            // Avoid duplicate processing by checking if the same code is scanned repeatedly
                            if (decodedText && decodedText !== lastScannedCode) {
                                lastScannedCode = decodedText; // Update last scanned code
                                setInstaTagId(decodedText);
                                fetchVehicleDetails(decodedText);
                            }
                        } catch (err) {
                            setError('Error decrypting QR code data');
                            console.error(err);
                        }
                    },
                    (errorMessage) => {
                        console.log(`QR code scan error: ${errorMessage}`);
                    }
                ).catch((err) => {
                    setError(`Unable to start scanning: ${err}`);
                });
            }
        } else {
            stopScanner();
        }
    
        return () => {
            // Cleanup on unmount
            stopScanner();
        };
    }, [scannerActive]);
    
    const stopScanner = async () => {
        if (html5QrCode.current && html5QrCode.current.isScanning) {
            try {
                await html5QrCode.current.stop();
                console.log("QR Code scanning stopped.");
            } catch (err) {
                console.error(`Error stopping QR Code scanning: ${err}`);
            }
        }
    };
    const fetchVehicleDetails = async (instaTagId) => {
        try {
            const response = await fetch(`http://192.168.43.148:3000/api/vehicle/${instaTagId}`);
            if (response.ok) {
                const vehicleDetails = await response.json();
                setVehicleData(prevData => [...prevData, vehicleDetails]);
                setError(null);
            } else {
                setError('Vehicle or owner not found for the given InstaTag ID.');
            }
        } catch (err) {
            setError('Error fetching vehicle details.');
        }
    };
    const handleTransaction = async (vehicle) => {
        const vehicleNo = vehicle.vehicle_no;
    
        try {
            // Call backend API to trigger the transaction
            const response = await fetch('http://192.168.43.148:3000/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vehicleNo })
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(`Transaction successful. New balance: ${result.newBalance}`); 
                handleClearTable();
            } else {
                setError('Transaction failed. Please try again.');
            }
        } catch (err) {
            setError('Error processing the transaction.');
        }
    };

    const handleClearTable = () => {
        setVehicleData([]);
    };

    if (error) return <p>{error}</p>;
    if (!employee) return <p>Loading...</p>;

    return (
        <div className="toll-emp-container">
            <h2>Toll Employee Interface</h2>
            <h2>Welcome, {employee.name} (ID: {employee.empid})</h2>

            <button onClick={() => setScannerActive(prev => !prev)} className="scan-button">
                <FontAwesomeIcon icon={faCamera} /> {scannerActive ? 'Stop Scanning' : 'Start Scanning'}
            </button>

            {scannerActive && (
                <div>
                    <div id="reader" style={{ width: '50dvw', height: '100%' }}></div>
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="vehicle-form">
                <input
                    type="text"
                    placeholder="InstaTag ID"
                    value={instaTagId}
                    onChange={(e) => setInstaTagId(e.target.value)}
                    required
                />
                <button type="submit" onClick={() => fetchVehicleDetails(instaTagId)}>
                    <FontAwesomeIcon icon={faCab} /> Fetch Vehicle
                </button>
            </form>

            <div className="vehicle-info-table">
                <h4>Entered Vehicles</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vehicle Number</th>
                            <th>Vehicle Type</th>
                            <th>Owner Name</th>
                            <th>Insurance Status</th>
                            <th>Actions</th> {/* New column for actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleData.length > 0 ? (
                            vehicleData.map((vehicle, index) => (
                                <tr key={index}>
                                    <td>{vehicle.vehicle_no}</td>
                                    <td>{vehicle.vehicle_type}</td>
                                    <td>{vehicle.owner_name}</td>
                                    <td>{vehicle.insurance_status}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleTransaction(vehicle)}>
                                            Trigger Transaction
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    No vehicles added yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {vehicleData.length > 0 && (
                    <button className="btn btn-danger" onClick={handleClearTable}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Clear Table
                    </button>
                )}
            </div>

        </div>
    );
};

export default TollEmp;
