import React, {createContext, useReducer} from 'react';
import timerReducer from '../reducers/timerReducer';

export const TimerContext = createContext();

const TimerContextProvider = ({children}) => {
  const [timer, dispatch] = useReducer(timerReducer, {
    running: false,
    minutesLeft: 25,
    secondsLeft: 60,
    session: false,
    breakTime: false,
    sessionMinutes: 25,
    breakMinutes: 5,
  });

  return (
    <TimerContext.Provider value={{timer, dispatch}}>
      {children}
    </TimerContext.Provider>
  )
}

export default TimerContextProvider;
