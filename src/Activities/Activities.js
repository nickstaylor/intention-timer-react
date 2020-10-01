import React from "react";
import "./Activities.css";
import ActivityCard from "../ActivityCard/ActivityCard";
import heartFilled from "../images/heart-filled.svg";
import heartOutline from "../images/heart-outline.svg";
import exercise from "../images/exercise.svg";
import meditate from "../images/meditate.svg";
import study from "../images/study.svg";
import exerciseActive from "../images/exercise-active.svg";
import meditateActive from "../images/meditate-active.svg";
import studyActive from "../images/study-active.svg";

const Activities = ({
  activities,
  deleteActivity,
  favoriteActivity,
  activityType,
  replayActivity,
  filteredActivitites
}) => {

    let displayedActivities = activities.map((activity, i) => {
      return (
        <ActivityCard
          key={i}
          activity={activity}
          deleteActivity={deleteActivity}
          favoriteActivity={favoriteActivity}
          replayActivity={replayActivity}
        />
      );
    });

  return (
    <div className="activities-container">
      <section className="activity-section-header">
        <h2>Past Activities</h2>
        <div className="activity-icons">
          <img
            className="heart"
            src={activityType === "favorites" ? heartFilled : heartOutline}
            alt="all-favorites"
            onClick={() => filteredActivitites('favorites')}
          />
          <img
            src={activityType === "study" ? studyActive : study}
            alt="study-favorites"
            onClick={() => filteredActivitites("study")}
          />
          <img
            src={activityType === "meditate" ? meditateActive : meditate}
            alt="meditate-favorites"
            onClick={() => filteredActivitites("meditate")}
          />
          <img
            src={activityType === "exercise" ? exerciseActive : exercise}
            alt="exercise-favorites"
            onClick={() => filteredActivitites("exercise")}
          />
        </div>
      </section>
      <section className="activities-inner-container">
        {displayedActivities}
      </section>
    </div>
  );
};

export default Activities;

