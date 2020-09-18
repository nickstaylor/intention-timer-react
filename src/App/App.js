import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Form from "../Form/Form";
import TimerPage from "../TimerPage/TimerPage";
import Activities from "../Activities/Activities";
import moment from "moment";

function App() {
  let activityData = [
    {
      type: "meditate",
      description: "Calm the mind",
      min: 15,
      sec: 0,
      date: "08/15/20",
      id: 1,
      favorite: false,
    },
    {
      type: "study",
      description: "Practice React Hooks",
      min: 25,
      sec: 0,
      date: "08/16/20",
      id: 2,
      favorite: true,
    },
    {
      type: "exercise",
      description: "Weight Lifting",
      min: 45,
      sec: 0,
      date: "08/15/20",
      id: 3,
      favorite: false,
    },
    {
      type: "study",
      description: "Learn Express",
      min: 22,
      sec: 0,
      date: "08/24/20",
      id: 4,
      favorite: true,
    },
    {
      type: "exercise",
      description: "Tennis",
      min: 60,
      sec: 0,
      date: "08/25/20",
      id: 5,
      favorite: true,
    },
  ];

  let sampleActivity = {
    date: "8/20/2020",
    description: "Learn Express",
    favorite: false,
    id: 1597973827053,
    min: 0,
    sec: 3,
    type: "study",
  };

  const [activities, setActivities] = useState(activityData);
  const [currentActivity, setCurrentActivity] = useState("");
  const [activityType, setActivityType] = useState("");

  const beginActivity = (activity) => {
    setCurrentActivity(activity);
  };

  const logActivity = () => {
    let loggedActivity = {
      ...currentActivity,
      date: moment().format("l"),
      id: Date.now(),
    };

    console.log("logged activity", loggedActivity);
    let updatedActivities = [loggedActivity, ...activities];
    setActivities(updatedActivities);
  };

  const deleteActivity = (id, type) => {
    let updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
    setActivityType(type);
  };

  const favoriteActivity = (id, type) => {
    console.log("type", type);
    let updatedActivities = activities.map((activity) => {
      if (activity.id === id) {
        activity.favorite = !activity.favorite;
      }
      return activity;
    });
    setActivities(updatedActivities);
    setActivityType(type);
  };

  const replayActivity = (activity) => {
    console.log(activity);
    setCurrentActivity({
      type: activity.type,
      description: activity.description,
      min: activity.min,
      sec: activity.sec,
      favorite: activity.favorite,
    });
  };

  console.log("app activities", activities);
  return (
    <div className="App">
      <Header />

      {currentActivity ? (
        <TimerPage
          activity={currentActivity}
          logActivity={logActivity}
          setCurrentActivity={setCurrentActivity}
        />
      ) : (
        <Form beginActivity={beginActivity} />
      )}

      {!activities.length ? (
        <section className="activities-container">
          <h2>Past Activities</h2>
          <p className="no-activity-msg">
            You haven't logged any activities yet.
          </p>
          <p className="no-activity-msg">Complete the form to get started!</p>
        </section>
      ) : (
        <Activities
          activities={activities}
          deleteActivity={deleteActivity}
          favoriteActivity={favoriteActivity}
          activityType={activityType}
          replayActivity={replayActivity}
        />
      )}
    </div>
  );
}

export default App;

