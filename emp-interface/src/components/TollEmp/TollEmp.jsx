import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './TollEmp.css';

const TollEmp = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);
    const { empid } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

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
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchEmployeeDetails();
    }, [empid, navigate]);

    useEffect(() => {
        const qrElement = document.getElementById('qr-reader');
        if (qrElement) {
            setError("QR Reader element not found");
            return;
        }

        const initializeScanner = () => {
            if (!scannerRef.current) {
                const scanner = new Html5QrcodeScanner(
                    'qr-reader',
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    false
                );

                scanner.render(handleScanSuccess, handleScanError);
                scannerRef.current = scanner; // Store scanner instance
            }
        };

        initializeScanner();

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null; // Ensure it's reset
            }
        };
    }, []);

    const handleScanSuccess = (decodedText) => {
        try {
            const parsedData = JSON.parse(decodedText); // Assuming QR code contains JSON

            // Check for duplicate JSON data
            const isDuplicate = vehicleData.some((vehicle) =>
                JSON.stringify(vehicle) === JSON.stringify(parsedData)
            );

            if (!isDuplicate) {
                setVehicleData((prevData) => [...prevData, parsedData]); // Add the new data if it's not a duplicate
                setError(null); // Clear error if the scan is successful
            } else {
                setError('This vehicle data has already been scanned.');
            }
        } catch (err) {
            setError('Invalid QR code data');
        }
    };

    const handleScanError = (errorMessage) => {
        console.error(errorMessage); // Log the error for debugging
        // Optional: Only set error if scanning fails after a timeout
        setError('Scanning for QR code.');
    };

    const handleClearTable = () => {
        setVehicleData([]); // Clear the vehicle data
    };

    // Render loading indicator if data is being fetched
    if (loading) return <p>Loading employee details...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!employee) return <p>No employee data found.</p>;

    return (
        <div className="toll-emp-container">
            <h2>Toll Employee Interface</h2>
            <h2>Welcome, {employee.name} (ID: {employee.empid})</h2>

            <div className="toll-emp-wrapper">
                {/* QR Scanner */}
                <div id="qr-reader" style={{ width: '320px', height: '320px' }}></div>

                {/* Vehicle Information Table */}
                <div className="vehicle-info-table">
                    <h4>Scanned Vehicles</h4>
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

                    {/* Clear Table Button */}
                    {vehicleData.length > 0 && (
                        <button className="btn btn-danger" onClick={handleClearTable}>
                            Clear Table
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TollEmp;
