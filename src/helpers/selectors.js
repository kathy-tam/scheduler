export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  let appointments = [];
  if (filteredDay.length !== 0) {
    const appointmentIDs = filteredDay[0].appointments;
    appointmentIDs.forEach(id => {
      appointments.push(state.appointments[id]);
    })
  }
  return appointments;
};

export function getInterview(state, interview) {
  let parsedInterview = null;
  if (interview) {
    parsedInterview = {...interview};
    parsedInterview.interviewer = state.interviewers[interview.interviewer];
  }
  return parsedInterview;
};

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  let interviewers = [];
  if (filteredDay.length !== 0) {
    const interviewerIDs = filteredDay[0].interviewers;
    interviewerIDs.forEach(id => {
      interviewers.push(state.interviewers[id]);
    })
  }
  return interviewers;
};