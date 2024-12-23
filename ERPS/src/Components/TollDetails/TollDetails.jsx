import './TollDetails.css';

const TollDetails = () => {
  // Hardcoded toll data with more vehicle types
  const tollData = [
    { vehicle_type: 'Car', toll_id: 1, booth_no: 'A1', toll_amt: 50 },
    { vehicle_type: 'Truck', toll_id: 2, booth_no: 'B1', toll_amt: 100 },
    { vehicle_type: 'Bus', toll_id: 3, booth_no: 'C1', toll_amt: 75 },
    { vehicle_type: 'Van', toll_id: 4, booth_no: 'E1', toll_amt: 60 },
    { vehicle_type: 'Heavy_Truck', toll_id: 7, booth_no: 'H1', toll_amt: 150 },
  ];

  return (
    <div className="toll-details">
      <h1>Toll Rates</h1>
      <div className="toll-list">
        {
          tollData.map((toll) => (
            <div className="glass" data-text={toll.vehicle_type} style={{ "--r": Math.floor(Math.random() * 30) }} key={toll.toll_id}>
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
          ))
        }
      </div>
    </div>
  );
};

export default TollDetails;
