import {stopAudio} from '../utilities';

const timerReducer = (state, action) => {
  let {sessionMinutes, breakMinutes, running, session} = state;
  let {minutesLeft, secondsLeft, mode} = action;


  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        running: true,
        session: true,
        break: false
      };
    case 'UPDATE_TIMER':
      if (minutesLeft === 1 && secondsLeft === -1) {
        running = false;
      } else if (minutesLeft !== 1 && secondsLeft === 0) {
        secondsLeft = 59;
        minutesLeft--;
      }
      return {...state, minutesLeft, secondsLeft, running, session};
    case 'PAUSE_SESSION':
      return {...state, running: false, session: true};
    case 'RESTART_SESSION':
      stopAudio();

      return {
        ...state,
        running: false,
        session: false,
        break: false,
        minutesLeft: 25,
        secondsLeft: 60,
        sessionMinutes: 25,
        breakMinutes: 5
      };
    case 'INCREASE_LENGTH':
      if (mode === 'session' && !running) {
        return {
          ...state,
          sessionMinutes: sessionMinutes + 1,
          minutesLeft: sessionMinutes + 1,
          secondsLeft: 60
        };
      } else if (mode === 'break' && !running) {
        return {
          ...state,
          breakMinutes: breakMinutes + 1
        };
      }
    case 'DECREASE_LENGTH':
      if (mode === 'session' && !running) {
        return {
          ...state,
          sessionMinutes: sessionMinutes - 1,
          minutesLeft: sessionMinutes - 1,
          secondsLeft: 60
        };
      } else if (mode === 'break' && !running) {
        return {...state, breakMinutes: breakMinutes - 1}
      }
    case 'START_BREAK':
      return {
        ...state,
        running: true,
        breakTime: true,
        session: false,
        minutesLeft: breakMinutes,
        secondsLeft: 60
      }
    default:
      console.log('Algo malo paso :(')
  }
}

export default timerReducer;
