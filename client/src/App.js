import React, { useState, useEffect } from 'react';

function App() {
  const [test, setTest] = useState('');

  const getData = async () => {
    const response = await fetch('/hi');
    console.log(response)
    const jsonData = await response.json();
    console.log(jsonData)
    setTest(jsonData);
  }

  useEffect(() => {
    getData()
  }, [test])
  return (
    <div>
      <p>{test}</p>
    </div>
  );
}

export default App;
