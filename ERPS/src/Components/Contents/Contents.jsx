import './Contents.css';

function Contents() {
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
              <img src="/fast-icon.png" alt="Faster Icon" className='provides-icon' />
              Faster
            </div>
            <div className="card">
              <img src="/safe-icon.png" alt="Safer Icon" className='provides-icon' />
              Safer
            </div>
            <div className="card">
              <img src="/automated-icon.png" alt="Automated Icon" className='provides-icon' />
              Automated
            </div>
          </div>
        </div>

        <div className="b-example-divider"></div>

        <div className="bg-dark text-secondary px-4 py-5 text-center">
          <div className="py-5">
            <h1 className="display-5 fw-bold text-white">Footer</h1>
            <div className="col-lg-6 mx-auto">
              <p className="fs-5 mb-4"></p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                Hello
              </div>
            </div>
          </div>
        </div>

        <div className="b-example-divider mb-0"></div>
      </main>
    </>
  );
}

export default Contents;
