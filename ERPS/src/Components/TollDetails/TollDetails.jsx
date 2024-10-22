import React from 'react';
import './TollDetails.css'; // Import your CSS file

const TollDetails = () => {
  // Hardcoded toll data with more vehicle types
  const tollData = [
    { vehicle_type: 'Car', toll_id: 1, booth_no: 'A1', toll_amt: 50 },
    { vehicle_type: 'Truck', toll_id: 2, booth_no: 'B1', toll_amt: 100 },
    { vehicle_type: 'Bus', toll_id: 3, booth_no: 'C1', toll_amt: 75 },
    { vehicle_type: 'Van', toll_id: 5, booth_no: 'E1', toll_amt: 60 },
    { vehicle_type: 'SUV', toll_id: 6, booth_no: 'F1', toll_amt: 80 },
    { vehicle_type: 'Motorcycle', toll_id: 7, booth_no: 'G1', toll_amt: 25 },
    { vehicle_type: 'Heavy_Truck', toll_id: 9, booth_no: 'I1', toll_amt: 150 },
  ];

  return (
    <div className="toll-details">
      <h1>Toll Rates</h1>
      <div className="toll-list">
        {tollData.map((toll) => (
          <div className="toll-item" key={toll.toll_id}>
            <img
              src={`/icons/${toll.vehicle_type.toLowerCase()}.png`}
              alt={`${toll.vehicle_type} icon`}
            />
            <div className="toll-info">
              <h2>{toll.vehicle_type}</h2>
              <p>Booth No: {toll.booth_no}</p>
              <p>Toll Amount: ₹{toll.toll_amt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TollDetails;
