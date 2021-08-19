import React from "react";
import "components/DayListItem.scss";
const classnames = require('classnames');

export default function DayListItem(props) {
  const {name, spots, setDay, selected} = props;
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  function formatSpots(spots) {
    let formattedSpots = "";
    if (spots === 0) {
      formattedSpots += "no spots";
    } else if (spots === 1) {
      formattedSpots += "1 spot";
    } else {
      formattedSpots = `${spots} spots`;
    }
    return formattedSpots;
  }

  return (
    <li className={dayClass} onClick={() => setDay(name) } data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}