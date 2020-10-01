import React, { useState, useEffect } from "react";
import "./TimerPage.css";
import replay from "../images/replay.svg";
import deleteIcon from "../images/delete.svg";

const TimerPage = ({ activity, logActivity, setCurrentActivity }) => {
  // console.log('currentActivity', activity);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [activityLogged, setActivityLogged] = useState(false);
  const [minutes, setMinutes] = useState(activity.min);
  const [seconds, setSeconds] = useState(activity.sec);

  useEffect(() => {
    setMinutes(activity.min);
    setSeconds(activity.sec);
    setTimerActive(false);
  }, [activity]);

  useEffect(() => {
    let timer = null;
    if (timerActive) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (minutes && seconds < 0) {
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      }
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        setTimeout(() => setTimerCompleted(true), 1000);
        setTimeout(() => setTimerActive(false), 1000);
      }
    } else if (!timerActive) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerActive, seconds, minutes]);

  const activateTimer = () => {
    setTimerActive(!timerActive);
  };

  const completeActivity = () => {
    logActivity();
    setActivityLogged(true);
  };

  const reloadActivity = () => {
    logActivity();
    setTimerCompleted(false);
    setMinutes(activity.min);
    setSeconds(activity.sec);
  };

  return (
    <div className="form-timer-container">
      <h2>
        Current Activity :{" "}
        <span className={`${activity.type}-header`}>{activity.type}</span>
      </h2>
      <section className="timer-inner-container">
        {!activityLogged ? (
          <>
            <section className="timer-column-box">
              {timerCompleted ? (
                <img
                  onClick={reloadActivity}
                  className="replay-img"
                  src={replay}
                  alt="replay"
                />) :
                (<img
                  onClick={() => setCurrentActivity('')}
                  className="replay-img"
                  src={deleteIcon}
                  alt="delete"
                />)
              }
              <div className="top-timer-column-box">
                <p>{activity.description}</p>
                <p className="timer-display">
                  {minutes}:{seconds < 10 ? "0" + seconds : seconds}
                </p>
              </div>
              <button
                className={`timer-circle-btn ${activity.type}-outline`}
                onClick={activateTimer}
              >
                {timerCompleted ? "congrats!" : timerActive ? "pause" : "start"}
              </button>
            </section>
            {timerCompleted && (
              <button className="log-activity-btn" onClick={completeActivity}>
                Log Activity
              </button>
            )}
          </>
        ) : (
          <button
            className="new-activity-btn"
            onClick={() => setCurrentActivity("")}
          >
            Create a new activity
          </button>
        )}
      </section>
    </div>
  );
};

export default TimerPage;
