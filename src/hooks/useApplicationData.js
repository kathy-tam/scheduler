import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateSpots(state, day) {
    const currentDay = day || state.day;
    const currentDayObj = state.days.find((dayObj) => dayObj.name === currentDay);
    const index = state.days.findIndex((dayObj) => dayObj.name === currentDay);

    const appointmentIds = currentDayObj.appointments;

    const freeAppointments = appointmentIds.filter((apptId) => !state.appointments[apptId].interview);

    const newSpots = freeAppointments.length;

    const updatedState = { ...state };
    updatedState.days = [...state.days];
    const updatedDay = { ...currentDayObj };

    updatedDay.spots = newSpots;

    updatedState.days[index] = updatedDay;

    return updatedState;
  }
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      axios.put(`/api/appointments/${id}`, {interview}),
      axios.get("/api/days")
    ]).then(all => {
      // setState({ ...state, appointments, days: all[1].data })
      setState(updateSpots({ ...state, appointments }))
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      axios.delete(`/api/appointments/${id}`),
      axios.get("/api/days")
    ]).then(all => {
      // setState({ ...state, appointments, days: all[1].data })
      setState(updateSpots({ ...state, appointments }))
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}