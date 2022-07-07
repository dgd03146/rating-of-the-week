import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Main.module.css';

const Main = ({ days, onReset }) => {
  const rates = [1, 2, 3, 4, 5];
  let navigate = useNavigate();

  const getAverageRate = () => {
    let sumRate = 0;
    for (let i of days) {
      sumRate += i.rate;
    }

    const averageRate = Math.floor(sumRate / 7);
    return averageRate;
  };

  const averageRate = useMemo(getAverageRate, [days]);

  const resetHandler = () => {
    const resetDays = days.map((it) => {
      return { ...it, rate: 0 };
    });

    onReset(resetDays);
  };

  return (
    <div className={styles.main}>
      <h1>내 일주일은?</h1>
      <ul>
        cd
        {days.map((it) => (
          <li className={styles.dayBox} key={it.id}>
            <h2>{it.day}</h2>
            <div className={styles.rateBox}>
              {rates.map((rate) => {
                const html =
                  rate <= it.rate ? (
                    <div
                      key={rate}
                      className={`${styles.rate} ${styles.yellow}`}
                    ></div>
                  ) : (
                    <div key={rate} className={styles.rate}></div>
                  );
                return html;
              })}
            </div>
            <svg
              onClick={() => {
                navigate('/rate/' + it.day);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
              color="purple"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </li>
        ))}
      </ul>
      <div>
        <h1>평균 평점 : {averageRate}</h1>
        <button onClick={resetHandler}>RESET</button>
      </div>
    </div>
  );
};

export default Main;
