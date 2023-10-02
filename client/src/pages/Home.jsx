import React from "react";

const Home = () => {
  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="home-container position-absolute">
        <div className="home-text py-5">
          <div className="container ">
            <h1 className="home-heading">
              Welcome to the Hospital Management System (HMS)!
            </h1>
            <br />
            <p className="home-info">
              This is a simple application to manage the patients and doctors
              information in a hospital. You can manage the patients and doctors
              information in a hospital.
              <br />
              <br />
              <strong>NOTE:</strong> This application is only for demonstration
              purpose and not for commercial use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
