import React from 'react'

const Hero = () => {
  return (
    <div>
        <div className="px-4 pt-0 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">WHAT WE DO</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">At our medicine donation website, we connect donors with surplus medications to individuals in need, ensuring that unused medicines find their way to those who require them the most. Our platform provides a secure and seamless donation process, making it easy for donors to contribute and for recipients to receive vital healthcare resources.</p>
          {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div> */}
        </div>
        <div className="overflow-hidden" style={{maxHeight: '50vh'}}>
          <div className="container px-5">
            <img src="./medine/do6.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width={700} height={500} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
