import React, { useRef } from 'react';

import { useContainerQuery } from './utils';
import './App.css';

const BREAKPOINTS = {
  small: window.innerWidth * 0.33,
  medium: window.innerWidth * 0.5,
  large: window.innerWidth * 0.66,
};

function App() {
  const container = useRef(null);
  const size = useContainerQuery(container, BREAKPOINTS);
  return (
    <div className="foo" ref={container}>
      <h1>{size}</h1>
    </div>
  );
}

export default App;
