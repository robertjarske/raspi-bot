import React from 'react';
import './Loader.css';

const Loader = ({ text = 'Tuning Engine...', ...props }) => (
  <div className="loader-container">
    <div className="loader">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
      <h4 className="loader-text">{text}</h4>
    </div>
  </div>
);

export default Loader;
