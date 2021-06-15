import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import useTitle from './useTitle';

ReactDOM.render(
  <React.StrictMode>
    <useTitle />
  </React.StrictMode>,
  document.getElementById('root')
);
