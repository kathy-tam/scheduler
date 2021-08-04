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