import Navbar from '../Navbar/Navbar';
import './Contents.css';

function Contents() {
  return (
    <>
      <main>
        <Navbar /> 
        <div className="one d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center rounded-3 border shadow-lg">
          <div className="img-overlay fade-in-text">
            <h1>InstaTag</h1>
            <h2>Efficiency on the go...</h2>
          </div>
        </div>

        <div className="two d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center rounded-3 border shadow-lg">
          <h1 className="display-4 fw-bold text-body-emphasis">What we provide</h1>
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

        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              .
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
              <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button>
              </div>
            </div>
          </div>
        </div>

        <div className="b-example-divider"></div>

        <div className="container my-5">
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
            <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
              <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Primary</button>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Default</button>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            </div>
          </div>
        </div>

        <div className="b-example-divider"></div>

        <div className="bg-dark text-secondary px-4 py-5 text-center">
          <div className="py-5">
            <h1 className="display-5 fw-bold text-white">Dark color hero</h1>
            <div className="col-lg-6 mx-auto">
              <p className="fs-5 mb-4"></p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                <button type="button" className="btn btn-outline-light btn-lg px-4">Secondary</button>
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
