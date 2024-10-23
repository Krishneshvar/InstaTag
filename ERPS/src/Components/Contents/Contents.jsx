import './Contents.css';

function Contents() 
{
  const currYear = new Date().getFullYear();

  return (
    <>
      <main>
        <div className="one d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center border shadow-lg">
          <div className="img-overlay fade-in-text">
            <h1> InstaTag </h1>
            <h2> Efficiency on the go... </h2>
          </div>
        </div>

        <div className="two d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center rounded-3 border shadow-lg">
          <h1 className="display-4 fw-bold text-body-emphasis"> What we provide </h1>
          <div className="d-flex col-lg-6 mx-auto justify-content-between align-items-center cards-container">
            <div className="card">
              <img src="/features/fast-icon.png" alt="Faster Icon" className='provides-icon' />
              <h2>Faster</h2>
              <p>A faster service to improve efficiency on the go...</p>
            </div>
            <div className="card">
              <img src="/features/safe-icon.png" alt="Safer Icon" className='provides-icon' />
              <h2>Safer</h2>
              <p>A safer service so all your data is kept safe to ourselves.</p>
            </div>
            <div className="card">
              <img src="/features/real-time-updates.png" alt="Real Time Updates Icon" className='provides-icon' />
              <h3>Timely Updates</h3>
              <p>Every transaction made regarding your InstTag is updated to you timely.</p>
            </div>
          </div>
        </div>

        <div className="b-example-divider"></div>

        <div className="text-secondary px-4 py-5 text-center">
          <div className="py-5">
            <h1 className="display-5 fw-bold">Instatag Transaction Process Flow</h1>
            <div className="col-lg-8 mx-auto">
              <p className="fs-5 mb-4">
                The below diagram illustrates the transaction flow of the Instatag system. The transaction from the toll plaza is processed by the backend system, validated through the Instatag Mapper, and then debited via the issuing bank.
              </p>
              <img 
                src="icons/toll_model.jpg" 
                alt="Instatag Transaction Flow Diagram" 
                className="img-fluid mb-5 rounded" 
                style={{ maxWidth: '100%', height: 'auto' }} 
              />

              <div className="flowchart">
                <div className="flow-step flow-div">
                  <h4>LEG 1</h4>
                  <p>When a vehicle passes through the toll plaza, the system captures details (Tag ID, TID, Vehicle Type) and sends them for processing.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 2</h4>
                  <p>The system sends a validation request to the Instatag Mapper.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 3</h4>
                  <p>The Instatag Mapper responds with vehicle details or an error if the Tag ID is not registered.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 4</h4>
                  <p>After validation, the backend calculates the toll fare and initiates a debit request.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 5</h4>
                  <p>The system sends the debit request to the issuing bank.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 6</h4>
                  <p>The bank debits the tag holder's account and sends an SMS notification.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 7</h4>
                  <p>The bank response is sent to the backend system.</p>
                </div>
                <div className="flow-arrow text-dark">↓</div>
                <div className="flow-step flow-div">
                  <h4>LEG 8</h4>
                  <p>The toll plaza system is notified, and the barrier is controlled based on the transaction status.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="b-example-divider mb-0"></div>
        <footer className='bg-dark text-light d-flex flex-column justify-content-center align-items-center'>
          <div className='d-flex justify-content-around'>
            <div className="footer-content p-1">Toll Details</div>
            <div className="footer-content p-1">About Us</div>
            <div className="footer-content p-1">Contact</div>
          </div>
          <div className='curr-yr'>&copy; {currYear}</div>
        </footer>
      </main>
    </>
  );
}

export default Contents;
