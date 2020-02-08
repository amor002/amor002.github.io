import React from 'react';
import logo from './logo.svg';
import './about.css';

function About() {
  return (
    <div className="About">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Developed by <a href="https://www.facebook.com/amr.elmowaled" rel="noopener noreferrer" className="App-link" target="_blank">Amr Elmowaled</a> Using <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React library
        </a>.
        </p>
        <p style={{fontSize: "15px", position: "fixed", left: "10px", bottom: "10px"}}>note: This site is meant to be a training for what I learned in react and doesn't relfect my full considerations in realtime apps!</p>
      </header>
    </div>
  );
}

export default About;
