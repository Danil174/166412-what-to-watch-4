import React from "react";

const Preload = () => {
  return (
    <section className="loading">
      <div className="page-content">
        <h1 className="loading__title">LOADING</h1>
        <div className="preload-wrapp">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Preload;
