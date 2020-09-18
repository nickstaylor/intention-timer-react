import React, { useState } from "react";
import "./Form.css";
import exercise from "../images/exercise.svg";
import meditate from "../images/meditate.svg";
import study from "../images/study.svg";
import exerciseActive from "../images/exercise-active.svg";
import meditateActive from "../images/meditate-active.svg";
import studyActive from "../images/study-active.svg";
import warning from "../images/warning.svg";

const Form = ({ beginActivity }) => {
  const [selected, updateSelected] = useState("");
  const [description, updateDescription] = useState("");
  const [minutes, updateMinutes] = useState("");
  const [seconds, updateSeconds] = useState("");
  const [minutesError, updateMinutesError] = useState(false);
  const [secondsError, updateSecondsError] = useState(false);
  const [descError, updateDescError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value.replace(/[^0-9]/, "");
    if (name === "minutes") {
      updateMinutes(newValue);
    } else {
      updateSeconds(newValue);
    }
  };

  const validateForm = () => {
    resetState();
    if (!minutes || minutes > 60) {
      updateMinutesError(true);
    }
    if (seconds < 0 || seconds > 59) {
      updateSecondsError(true);
    }
    if (!description) {
      updateDescError(true);
    }
    if (
      description &&
      minutes &&
      minutes <= 60 &&
      seconds >= 0 &&
      seconds < 60
    ) {
      changeToTimer();
    }
    return;
  };

  const resetState = () => {
    updateMinutesError(false);
    updateSecondsError(false);
    updateDescError(false);
  };

  const changeToTimer = () => {
    beginActivity({
      type: selected,
      description: description,
      min: parseInt(minutes),
      sec: parseInt(seconds) || 0,
      favorite: false,
    });
  };

  return (
    <div className="form-timer-container">
      <h2>New Activity</h2>
      <section className="form-inner-container">
        <div>
          <h3>Select A Category :</h3>
          <section className="menu-buttons">
            <button
              className={selected === "study" ? "study-outline" : ""}
              id="study"
              onClick={(e) => updateSelected(e.target.id)}
            >
              <img
                src={selected === "study" ? studyActive : study}
                alt="study"
              />
              Study
            </button>

            <button
              className={selected === "meditate" ? "meditate-outline" : ""}
              id="meditate"
              onClick={(e) => updateSelected(e.target.id)}
            >
              <img
                src={selected === "meditate" ? meditateActive : meditate}
                alt="meditate"
              />
              Meditate
            </button>

            <button
              className={selected === "exercise" ? "exercise-outline" : ""}
              id="exercise"
              onClick={(e) => updateSelected(e.target.id)}
            >
              <img
                src={selected === "exercise" ? exerciseActive : exercise}
                alt="exercise"
              />
              Exercise
            </button>
          </section>
        </div>
        {/* form section inputs */}
        <section className="activity-description">
          <label htmlFor="description">
            What would you like to accomplish during this time?
          </label>
          <input
            type="text"
            name="description"
            maxLength="60"
            value={description}
            onChange={(e) => updateDescription(e.target.value)}
          />
          {descError && (
            <p className="desc-error">
              <img src={warning} alt="warning" />
              Please enter a Description
            </p>
          )}
        </section>
        <section
          className={descError ? "minutes-seconds-error" : "minutes-seconds"}
        >
          <div className="min-sec-inputs">
            <label htmlFor="minutes">Minutes</label>
            <input
              type="text"
              name="minutes"
              value={minutes}
              onChange={handleChange}
            />
            {minutesError && (
              <p className="min-error">
                <img src={warning} alt="warning" />
                Please enter Minutes (0-60)
              </p>
            )}
          </div>
          <div className="min-sec-inputs">
            <label htmlFor="seconds">Seconds</label>
            <input
              type="text"
              name="seconds"
              value={seconds}
              onChange={handleChange}
            />
            {secondsError && (
              <p className="min-error">
                <img src={warning} alt="warning" />
                Please enter Seconds (0-59)
              </p>
            )}
          </div>
        </section>
        <div
          className={
            minutesError || secondsError
              ? "start-activity-btn-error"
              : "start-activity-btn"
          }
        >
          <button className="start-activity" onClick={validateForm}>
            Start Activity
          </button>
        </div>
      </section>
    </div>
  );
};

export default Form;
