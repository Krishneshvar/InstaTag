import './Contents.css'

function Contents() {
  return (
    <>
    <main>
      {/* <app-navbar></app-navbar> */}

      <div class="one d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center rounded-3 border shadow-lg">
        <img class="car-img" src="/Designer.jpeg" alt="A car on a highway" />
        <div class="img-overlay fade-in-text">
          <h1>InstaTag</h1>
          <h2>Efficiency on the go...</h2>
        </div>
      </div>

      <div class="two d-flex flex-column justify-content-center align-items-center text-secondary px-4 py-5 text-center rounded-3 border shadow-lg">
        <h1 class="display-4 fw-bold text-body-emphasis">Centered screenshot</h1>
        <div class="col-lg-6 mx-auto">
          <div class="card"></div>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>

      <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            .
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
              <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>

      <div class="container my-5">
        <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Primary</button>
              <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
          </div>
          <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>

      <div class="bg-dark text-secondary px-4 py-5 text-center">
        <div class="py-5">
          <h1 class="display-5 fw-bold text-white">Dark color hero</h1>
          <div class="col-lg-6 mx-auto">
            <p class="fs-5 mb-4"></p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
              <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
            </div>
          </div>
        </div>
      </div>

      <div class="b-example-divider mb-0"></div>
    </main>
    </>
  );
}

export default Contents
