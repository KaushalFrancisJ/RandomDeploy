import React from 'react';
import { useState } from 'react';
import Popup from './component/popup.jsx';
// import './App.css';

function App() {
  return (
    <>
      <Popup action={'Submit'} />
      <Popup action={'Update'} />
    </>
  );
}

export default App;
