import React from 'react'

const Try = () => {
    let imgSize = {
        width: '100%',
        height: '250px',
        cursor: 'pointer'
    }
    let PageColor = {
      background: '#f7f7f7'
      // background: 'blue'
    }

  return (
    <>
    <div>
    <h1 className='text-center mt-5 mb-5' >Donate As Much As You Can</h1>
    <div className='pb-3' style={PageColor}>
      <div className="container mb-5 pt-5" >
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          <div className="col">
            <div className="card shadow-sm">
              <video src="./videos/video1.mp4" style={imgSize} controls></video>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
            <video src="./videos/video3.mp4" style={imgSize} controls></video>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-sm">
             <video src="./videos/video4.mp4" style={imgSize} controls></video>
            </div>
          </div>
          
        </div>
      </div>

    </div>
    </div>
    </>
  )
}

export default Try

