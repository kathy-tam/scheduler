import React from "react";
import "components/InterviewerListItem.scss";
const classnames = require('classnames');

export default function InterviewerListItem(props) {
  const {name, avatar, onChange, selected} = props;
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected
  });
  return (
    <li className={interviewerClass} onClick={onChange}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}