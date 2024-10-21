import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import './TollEmp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTrashAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
                    console.log('Employee Name:', data.name);
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
            const qrCodeRegionId = "reader";
            html5QrCode.current = new Html5Qrcode(qrCodeRegionId);

            const config = {
                fps: 10,
                qrbox: 250
            };

            html5QrCode.current.start(
                { facingMode: "environment" },
                config,
                async (decodedText) => {
                    try {
                        const scannedData = JSON.parse(decodedText);
                        setInstaTagId(scannedData.instaTagId || ''); // Set InstaTag ID
                        await fetchVehicleDetails(scannedData.instaTagId); // Fetch vehicle details
                        stopScanner();
                    } catch (err) {
                        setError('Invalid QR code data format');
                    }
                },
                (errorMessage) => {
                    console.log(`QR code scan error: ${errorMessage}`);
                }
            ).catch((err) => {
                setError(`Unable to start scanning: ${err}`);
            });
        } else {
            stopScanner();
        }

        return () => stopScanner();
    }, [scannerActive]);

    const stopScanner = () => {
        if (html5QrCode.current) {
            html5QrCode.current.stop().then(() => {
                console.log("QR Code scanning stopped.");
            }).catch(err => {
                console.error(`Error stopping QR Code scanning: ${err}`);
            });
        }
    };

    const fetchVehicleDetails = async (instaTagId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/vehicle/${instaTagId}`);
            if (response.ok) {
                const vehicleDetails = await response.json();
                setVehicleData(prevData => [...prevData, vehicleDetails]); // Append the vehicle details
                setError(null);
            } else {
                setError('Error fetching vehicle details.');
            }
        } catch (err) {
            setError('Error fetching vehicle details.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!employee) return <p>Loading...</p>;

    const handleClearTable = () => {
        setVehicleData([]);
    };

    return (
        <div className="toll-emp-container">
            <h2>Toll Employee Interface</h2>
            <h2>Welcome, {employee.name} (ID: {employee.empid})</h2>
            <button onClick={() => setScannerActive(prev => !prev)} className="scan-button">
                <FontAwesomeIcon icon={faCamera} /> {scannerActive ? 'Stop Scanning' : 'Start Scanning'}
            </button>

            {scannerActive && (
                <div>
                    <div id="reader" style={{ width: '100%', height: '250px' }}></div>
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
                    <FontAwesomeIcon icon={faUserPlus} /> Fetch Vehicle
                </button>
            </form>

            <div className="vehicle-info-table">
                <h4>Entered Vehicles</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vehicle Number</th>
                            <th>Owner Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleData.length > 0 ? (
                            vehicleData.map((vehicle, index) => (
                                <tr key={index}>
                                    <td>{vehicle.vehicleNumber}</td>
                                    <td>{vehicle.ownerName}</td> {/* Assuming ownerName is part of vehicle details */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" style={{ textAlign: 'center' }}>
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
