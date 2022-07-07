import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import { useState } from 'react';
import Rate from './Rate';
import NotFound from './NotFound';
import { useEffect } from 'react';

function App() {
  const [days, setDays] = useState([
    { id: 1, day: '월', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 2, day: '화', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 3, day: '수', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 4, day: '목', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 5, day: '금', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 6, day: '토', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 },
    { id: 0, day: '일', rate: Math.floor(Math.random() * (5 - 1 + 1)) + 1 }
  ]);

  useEffect(() => {
    const current = new Date();
    const currentDate = current.getDay();

    const currentDayfrom = days.slice(currentDate - 1);
    const tocurrentDay = days.slice(0, currentDate - 1);

    const sortedDate = [...currentDayfrom, ...tocurrentDay];
    setDays(sortedDate);
  }, []);

  const onStarRate = (updatedDays) => {
    setDays(updatedDays);
  };

  const onReset = (resetDays) => {
    setDays(resetDays);
  };

  return (
    <div className="App">
      <div className="box">
        <div className="wrap">
          <Routes>
            <Route path="/" element={<Main days={days} onReset={onReset} />} />
            <Route
              path="/rate/:day"
              element={<Rate days={days} onStarRate={onStarRate} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
