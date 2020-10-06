import React, { useEffect, useState } from "react";
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

  const [allActivities, setAllActivities] = useState(activityData)
  const [currentActivity, setCurrentActivity] = useState("");
  const [activityType, setActivityType] = useState("");

  
  useEffect(() => {
    const savedStorageActivities = localStorage.getItem('savedActivities')
    const savedActivities = JSON.parse(savedStorageActivities)
    console.log('savedActivities', savedActivities);
    savedActivities && setAllActivities(savedActivities)
  }, [])
  
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
    let updatedActivities = [loggedActivity, ...allActivities];
    localStorage.setItem('savedActivities', JSON.stringify(updatedActivities))
    setAllActivities(updatedActivities);
    setActivityType('')
  };

  const deleteActivity = (id) => {
    let updatedActivities = allActivities.filter((activity) => activity.id !== id);
    localStorage.setItem('savedActivities', JSON.stringify(updatedActivities));
    setAllActivities(updatedActivities);
  };

  const favoriteActivity = (id) => {
    let updatedActivities = allActivities.map((activity) => {
      if (activity.id === id) {
        activity.favorite = !activity.favorite;
      }
      return activity;
    });
    setAllActivities(updatedActivities);
  };

  const filteredActivitites = (type) => {
    activityType === type ? setActivityType('') : setActivityType(type)
   };

  const replayActivity = (activity) => {
    setCurrentActivity({
      type: activity.type,
      description: activity.description,
      min: activity.min,
      sec: activity.sec,
      favorite: activity.favorite,
    });
  };

  console.log("allActivities", allActivities);
  console.log("ActivityType", activityType);

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
        <Form
          beginActivity={beginActivity} />
      )}
        <Activities
          activities={activityType ?
            allActivities.filter(item => {
              if (activityType === 'favorites') {
              return item.favorite === true
              } else {
              return item.type === activityType
              }
            }) : 
            allActivities}
          filteredActivitites={filteredActivitites}
          deleteActivity={deleteActivity}
          favoriteActivity={favoriteActivity}
          activityType={activityType}
          replayActivity={replayActivity}
        />
    </div>
  );
}

export default App;

