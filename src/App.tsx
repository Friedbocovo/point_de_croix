import React, { useState, useRef } from 'react';

const App = () => {
  const [inputName, setInputName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [orientation, setOrientation] = useState('vertical');
  const [cellSize, setCellSize] = useState(5);
  const [color, setColor] = useState('#D946A6');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const svgRef = useRef(null);

  const letters = {
    // 
    A: [[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,0,0,1,1,1,0],[0,1,1,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1]],
    B: [[1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,0,0,0]],
    C: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],
    D: [[1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,0,0,0]],
    E: [[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],
    F: [[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0]],
    G: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,1,1,1,1,1],[1,1,0,0,0,1,1,1,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],
    H: [[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1]],
    I: [[0,0,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,0,0]],
    J: [[0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,0],[0,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0,0]],
    K: [[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,1,1,0,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,1,1,1,0,0,0,0,0],[1,1,1,1,1,0,0,0,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,0,1,1,0]],
    L: [[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],
    M: [[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,1,1,0,0,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1]],
    N: [[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,0,1,1],[1,1,1,1,0,0,0,0,1,1],[1,1,1,1,1,0,0,0,1,1],[1,1,0,1,1,1,0,0,1,1],[1,1,0,0,1,1,1,0,1,1],[1,1,0,0,0,1,1,1,1,1],[1,1,0,0,0,0,1,1,1,1],[1,1,0,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1]],
    O: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],
    P: [[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0]],
    Q: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,1,1,0,1,1],[1,1,0,0,0,0,1,1,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,1,1]],
    R: [[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,0,0,0,1,1,0,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,0,1,1,0]],
    S: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],
    T: [[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],
    U: [[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],
    V: [[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,0,0,0,0,1,1,0],[0,1,1,1,0,0,1,1,1,0],[0,0,1,1,0,0,1,1,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0]],
    W: [[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,0,1,1,1,1,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,0,0,1,1,1,1],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1]],
    X: [[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,0,0,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,0,0,1,1,1,0],[1,1,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,1,1]],
    Y: [[1,1,0,0,0,0,0,0,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,1,0,0,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0]],
    Z: [[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,1,1,0],[0,0,0,0,0,1,1,1,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,1,1,1,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],
    
    // Minuscules
    a: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,1,1,0,0],[0,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,1,1,0]],
    b: [[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,1,1,1,1,0,0,0]],
    c: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]],
    d: [[0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,1,1,0],[0,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0]],
    e: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,1,1,0],[1,1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]],
    f: [[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0]],
    g: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,0,0]],
    h: [[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0]],
    i: [[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0]],
    j: [[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,0,0,1,1,0,0,0,0],[0,1,1,1,1,0,0,0,0,0]],
    k: [[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,1,1,0,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,0,1,1,0,0,0,0,0],[1,1,1,1,1,0,0,0,0,0],[1,1,1,1,1,0,0,0,0,0],[1,1,0,1,1,0,0,0,0,0],[1,1,0,0,1,1,0,0,0,0],[1,1,0,0,0,1,1,0,0,0]],
    l: [[0,0,1,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,1,1,1,1,0,0,0,0]],
    m: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,0,1,1,0,0],[1,1,1,1,1,1,1,1,1,0],[1,1,1,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,1,1,0],[1,1,0,0,1,1,0,1,1,0]],
    n: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0]],
    o: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
    p: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,1,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,0,0]],
    q: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,1,1,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,1,1,0],[0,0,0,0,0,0,0,1,1,0]],
    r: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0]],
    s: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]],
    t: [[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[1,1,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]],
    u: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,1,0,0,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,1,1,0],[0,0,0,0,0,0,0,0,0,0]],
    v: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,1,0,0,1,1,1,0,0],[0,1,1,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
    w: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,1,1,0],[1,1,0,0,1,0,0,1,1,0],[1,1,0,1,1,1,0,1,1,0],[1,1,1,1,0,1,1,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
    x: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1,0,0],[0,1,1,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,1,1,1,1,0,0,0,0],[0,1,1,0,0,1,1,0,0,0],[1,1,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]],
    y: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,0,0,0,0,1,1,0,0],[1,1,1,0,0,1,1,1,0,0],[0,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,1,1,0,0],[0,1,1,0,0,0,1,1,0,0],[0,1,1,1,1,1,1,0,0,0]],
    z: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]]
  };

  const gridSize = 10;
  const letterSpacing = 2;

  const handleGenerate = () => {
    const name = inputName.trim();
    
    if (!name) {
      setError('Veuillez entrer un texte');
      return;
    }

    const unavailableLetters = [];
    for (let char of name) {
      if (char !== ' ' && !letters[char]) {
        unavailableLetters.push(char);
      }
    }

    if (unavailableLetters.length > 0) {
      setError(`Caractères non disponibles: ${unavailableLetters.join(', ')}`);
      return;
    }

    setError('');
    setDisplayName(name);
  };

  const handleDownloadPNG = (withBackground = true) => {
    if (!svgRef.current || !displayName) return;

    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (withBackground) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const bgSuffix = withBackground ? '' : '-transparent';
        link.download = `point-de-croix-${displayName.toLowerCase().replace(/\s/g, '-')}${bgSuffix}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setShowDownloadOptions(false);
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  };

  const word = displayName.split('').filter(char => char !== ' ');
  
  let totalWidth, totalHeight, totalGridHeight, totalGridWidth;
  
  if (orientation === 'vertical') {
    totalWidth = gridSize * cellSize;
    totalGridHeight = word.length > 0 ? word.length * gridSize + (word.length - 1) * letterSpacing : 0;
    totalHeight = totalGridHeight * cellSize;
  } else {
    totalGridWidth = word.length > 0 ? word.length * gridSize + (word.length - 1) * letterSpacing : 0;
    totalWidth = totalGridWidth * cellSize;
    totalHeight = gridSize * cellSize;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Générateur de Point de Croix</h1>
        <p className="text-gray-600 mb-8 text-center">Créez votre diagramme personnalisé</p>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Entrez votre texte :
          </label>
          <div className="md:flex gap-3 mb-4 grid">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Ex: Marie ou PAUL"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-lg"
              maxLength="20"
            />
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
            >
              Générer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Orientation :
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setOrientation('vertical')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    orientation === 'vertical' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Vertical
                </button>
                <button
                  onClick={() => setOrientation('horizontal')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    orientation === 'horizontal' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Horizontal
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Taille : {cellSize}px
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={cellSize}
                onChange={(e) => setCellSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Petit</span>
                <span>Moyen</span>
                <span>Grand</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Couleur :
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer border-2 border-gray-300"
                />
                <span className="text-sm text-gray-600">{color}</span>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Lettres disponibles: A-Z en majuscules et minuscules
          </p>
        </div>

        {displayName && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-2xl font-bold text-gray-700">{displayName}</h2>
              <div className="relative">
                <button
                  onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger PNG
                </button>
                
                {showDownloadOptions && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-10">
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Choisir le fond :</p>
                      <button
                        onClick={() => handleDownloadPNG(true)}
                        className="w-full px-4 py-2 mb-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <div className="w-5 h-5 bg-white border-2 border-gray-400 rounded"></div>
                        Avec fond blanc
                      </button>
                      <button
                        onClick={() => handleDownloadPNG(false)}
                        className="w-full px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <div className="w-5 h-5 bg-transparent border-2 border-gray-400 rounded" style={{backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px'}}></div>
                        Sans fond (transparent)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-2 border-gray-400 inline-block overflow-auto max-w-full">
              <svg ref={svgRef} width={totalWidth} height={totalHeight}>
                {orientation === 'vertical' ? (
                  <>
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={totalHeight} stroke="#ddd" strokeWidth="1" />
                    ))}
                    
                    {Array.from({ length: totalGridHeight + 1 }).map((_, i) => (
                      <line key={`h-${i}`} x1={0} y1={i * cellSize} x2={totalWidth} y2={i * cellSize} stroke="#ddd" strokeWidth="1" />
                    ))}

                    {word.map((letter, letterIndex) => {
                      const offsetY = letterIndex * (gridSize + letterSpacing) * cellSize;
                      return (
                        <g key={letterIndex}>
                          {letters[letter] && letters[letter].map((row, rowIndex) =>
                            row.map((cell, colIndex) =>
                              cell === 1 ? (
                                <rect
                                  key={`${letterIndex}-${rowIndex}-${colIndex}`}
                                  x={colIndex * cellSize}
                                  y={offsetY + rowIndex * cellSize}
                                  width={cellSize}
                                  height={cellSize}
                                  fill={color}
                                  stroke="#ddd"
                                  strokeWidth="1"
                                />
                              ) : null
                            )
                          )}
                        </g>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {Array.from({ length: totalGridWidth + 1 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={totalHeight} stroke="#ddd" strokeWidth="1" />
                    ))}
                    
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <line key={`h-${i}`} x1={0} y1={i * cellSize} x2={totalWidth} y2={i * cellSize} stroke="#ddd" strokeWidth="1" />
                    ))}

                    {word.map((letter, letterIndex) => {
                      const offsetX = letterIndex * (gridSize + letterSpacing) * cellSize;
                      return (
                        <g key={letterIndex}>
                          {letters[letter] && letters[letter].map((row, rowIndex) =>
                            row.map((cell, colIndex) =>
                              cell === 1 ? (
                                <rect
                                  key={`${letterIndex}-${rowIndex}-${colIndex}`}
                                  x={offsetX + colIndex * cellSize}
                                  y={rowIndex * cellSize}
                                  width={cellSize}
                                  height={cellSize}
                                  fill={color}
                                  stroke="#ddd"
                                  strokeWidth="1"
                                />
                              ) : null
                            )
                          )}
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>

  
          </div>
        )}
      </div>
    </div>
  );
};

export default App;