import React, { useState, useEffect } from "react";
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
}) => {
  const [active, setActive] = useState("");
  const [activitiesDisplayed, setActivities] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // console.log('activities', activities);
  useEffect(() => {
    if (!activityType || activityType === undefined) {
      console.log("there is no type", activityType);
      setActivities(activities);
      return;
    }
    if (activityType === "favorites") {
      console.log("the type is favorites", activityType);
      showFavoriteActivities();
    } else {
      console.log("there is a type:", activityType);
      filteredActivitites(activityType);
    }
  }, [activities]);

  const showFavoriteActivities = () => {
    setActive("");
    let updatedActivities = activities.filter(
      (activity) => activity.favorite === true
    );

    if (showFavorites) {
      setActivities(activities);
      setShowFavorites(!showFavorites);
      return;
    }
    setShowFavorites(!showFavorites);
    setActivities(updatedActivities);
  };

  const filteredActivitites = (desc, id) => {
    if (active === desc) {
      setActive("");
      setActivities(activities);
      return;
    }
    let updatedActivities = activities.filter(
      (activity) => activity.type === desc
    );
    setActive(desc);
    setShowFavorites(false);
    setActivities(updatedActivities);
  };

  const toggleFavorite = (id) => {
    if (showFavorites) {
      favoriteActivity(id, "favorites");
      showFavoriteActivities();
    } else {
      favoriteActivity(id, active);
      filteredActivitites(active, id);
    }
  };

  const deleteActivityFromActivities = (id) => {
    if (showFavorites) {
      deleteActivity(id, "favorites");
      showFavoriteActivities();
    } else {
      deleteActivity(id, active);
      filteredActivitites(active, id);
    }
  };

  let displayedActivities;
  if (activitiesDisplayed) {
    displayedActivities = activitiesDisplayed.map((activity, i) => {
      return (
        <ActivityCard
          key={i}
          activity={activity}
          deleteActivity={deleteActivityFromActivities}
          favoriteActivity={toggleFavorite}
          replayActivity={replayActivity}
        />
      );
    });
  }

  return (
    <div className="activities-container">
      <section className="activity-section-header">
        <h2>Past Activities</h2>
        <div className="activity-icons">
          <img
            className="heart"
            src={showFavorites ? heartFilled : heartOutline}
            alt="all-favorites"
            onClick={showFavoriteActivities}
          />
          <img
            src={active === "study" ? studyActive : study}
            alt="study-favorites"
            onClick={() => filteredActivitites("study")}
          />
          <img
            src={active === "meditate" ? meditateActive : meditate}
            alt="meditate-favorites"
            onClick={() => filteredActivitites("meditate")}
          />
          <img
            src={active === "exercise" ? exerciseActive : exercise}
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

