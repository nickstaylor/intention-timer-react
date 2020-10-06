import React from "react";
import "./ActivityCard.css";
import heartOutline from "../images/heart-outline.svg";
import heartFilled from "../images/heart-filled.svg";
import deleteIcon from "../images/delete.svg";
import replay from "../images/replay-hollow.svg";

const ActivityCard = ({
  activity,
  deleteActivity,
  favoriteActivity,
  replayActivity,
}) => {

  return (
    <div className="activity-card-container">
      <div className="activity-card-subcontainer">
        <section className={`ac-top ${activity.type}`}>
          <p className={`activity-${activity.type}`}>{activity.type}</p>
          <p className="activity-min-sec">{activity.min} min</p>
          {activity.sec !== 0 && (
            <p className="activity-min-sec">{activity.sec} sec</p>
          )}
        </section>
        <section className="ac-bottom">
          <p className="activity-desc">{activity.description}</p>
          <section className="activity-btns">
            <img
              className="replay-image"
              src={replay}
              alt="replay"
              onClick={() => replayActivity(activity)}
            />
            <img
              className="heart"
              src={activity.favorite ? heartFilled : heartOutline}
              alt="favorite"
              onClick={() => favoriteActivity(activity.id)}
            />
            <img
              className="delete-img"
              src={deleteIcon}
              onClick={() => deleteActivity(activity.id)}
              alt="delete"
            />
          </section>
        </section>
      </div>
    </div>
  );
};

export default ActivityCard;
