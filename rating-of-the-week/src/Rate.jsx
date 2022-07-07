import React from 'react';
import styles from './Rate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';

const Rate = ({ days, onStarRate }) => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  let navigate = useNavigate();
  const params = useParams();

  const starRate = useCallback(
    (it) => {
      setClicked(it);
      const updatedDays = days.map((ele) => {
        if (ele.day === params.day) {
          return { ...ele, rate: it };
        } else {
          return { ...ele };
        }
      });

      onStarRate(updatedDays);
    },
    [days, onStarRate, params.day]
  );

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key } = event;

      starRate(parseInt(key));
    },
    [starRate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div>
      <div className={styles.Box}>
        <h3>{params.day}요일 평점 남기기</h3>
        <div className={styles.rateBox}>
          {[1, 2, 3, 4, 5].map((it) => {
            return (
              <div
                className={`${styles.rate}  ${
                  (clicked >= it) | (hovered >= it) && styles.yellow
                }`}
                key={it}
                onMouseEnter={() => setHovered(it)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => starRate(it)}
              ></div>
            );
          })}
        </div>
        <div></div>
        <button
          className={styles.rateBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          평점 남기기
        </button>
      </div>
    </div>
  );
};

export default Rate;

{
  /* <div className={styles.rate}></div>
          <div className={styles.rate}></div>
          <div className={styles.rate}></div>
          <div className={styles.rate}></div> */
}
