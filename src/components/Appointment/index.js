import React from "react";
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function onConfirmDelete() {
    transition(CONFIRM);
  }

  function onDelete() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function onEdit() {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} onEdit={onEdit} onDelete={onConfirmDelete} /> }
      {mode === CREATE && <Form interviewers = {interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" /> }
      {mode === DELETING && <Status message="Deleting" /> }
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={onDelete} /> }
      {mode === EDIT && <Form name={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} /> }
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back} /> }
    </article>
  );
}