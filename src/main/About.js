import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Work from "./Work";
const About = () => {
  let PageColor = {
    background: "#f7f7f7",
  };
  return (
    <>
      <Navbar title="Helping Hands" />
      <h1 className="text-center mt-5 mb-5">About Us</h1>
      <div style={PageColor}>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 mb-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="./images/sideimg4.jpg"
                className="d-block mx-lg-auto img-fluid rounded img-thumbnail"
                alt="Bootstrap Themes"
                width={700}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 lh-1 mb-3 fs-3">
                Empowering Unused Medicine Donation in Pakistan
              </h1>
              <p className="lead">
                {" "}
                Introducing Helping Hands, the leading online platform dedicated
                to unused medicine donation in Pakistan. With Helping Hands,
                individuals can make a positive impact on healthcare by easily
                donating their unused medications from the comfort of their
                homes. Say goodbye to the hassle of discarding medicine and
                hello to a convenient solution that benefits both donors and
                recipients. Helping Hands revolutionizes the way people
                contribute to healthcare accessibility. Instead of letting
                unused medicine go to waste, Helping Hands provides a seamless
                online avenue for donors to connect with those in need. By
                eliminating the need to travel, individuals can effortlessly
                contribute to a healthier society. Browsing through the
                platform's user-friendly interface, donors can select medicines
                they wish to donate, knowing they're making a meaningful
                difference. Join Helping Hands today and be a part of the
                movement that transforms healthcare accessibility in Pakistan.
                Your unused medicines can now find a purpose and make a
                significant impact on the lives of those who need it the most.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                {/* <div className="btn-group">
                  <button type="button" className="btn btn-lg btn-outline-success">Read More</button>
                    
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Hero />
      <Work />
      <Footer />
    </>
  );
};

export default About;
