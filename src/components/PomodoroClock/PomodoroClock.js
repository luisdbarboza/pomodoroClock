import React, {useContext, useEffect} from 'react';
import TimerContextProvider, {TimerContext} from '../../context/TimerContext';
import {playAudio, stopAudio, validateAction} from '../../utilities';
import './PomodoroClock.css';

const Controls = () => {
  const {timer, dispatch} = useContext(TimerContext);
  const {running} = timer;

  return (
    <div className="start-stop-reset-div">
      <button
        id='start_stop'
        onClick={() => {
          if (!running)
            dispatch({type: 'START_SESSION'});
          else
            dispatch({type: 'PAUSE_SESSION'})
        }}>
        <img src="images/play.svg" alt="play" />
        <img src="images/pause.svg" alt="pause" />
      </button>

      <button
        id="reset"
        onClick={() => {
          if (running) dispatch({type: 'RESTART_SESSION'})
        }}>
        <img src="images/reset.svg" alt="reset" />
      </button>
    </div>
  );
}

const SessionBreakPanel = () => {
  const {timer, dispatch} = useContext(TimerContext);
  const {sessionMinutes, breakMinutes, running} = timer;

  return (
    <div className="session-break-wrapper">
      <div className="session-div">
        <h3 id="session-label">
          Session Length
        </h3>
        <button
          id="session-decrement"
          onClick={() => {
            validateAction(running, sessionMinutes, {type: 'DECREASE_LENGTH', mode: 'session'}, dispatch);
          }}>
          <img src="images/arrow-down.svg" alt="decrease" />
        </button>
        <div id="session-length">
          {sessionMinutes}
        </div>
        <button id="session-increment" onClick={() => {
          validateAction(running, sessionMinutes, {type: 'INCREASE_LENGTH', mode: 'session'}, dispatch);
        }}>
          <img src="images/arrow-up.svg" alt="increase" />
        </button>
      </div >


      <div className="break-div">
        <h3 id="break-label">Break Length</h3>
        <button
          id="break-decrement"
          onClick={() => {
            validateAction(running, breakMinutes, {type: 'DECREASE_LENGTH', mode: 'break'}, dispatch);
          }}
        >
          <img src="images/arrow-down.svg" alt="decrease" />
        </button>
        <div id="break-length">
          {breakMinutes}
        </div>
        <button
          id="break-increment"
          onClick={() => {
            validateAction(running, breakMinutes, {type: 'INCREASE_LENGTH', mode: 'break'}, dispatch);
          }}
        >
          <img src="images/arrow-up.svg" alt="increase" />
        </button>
      </div >
    </div >
  )
}

const TimeLeft = () => {
  const {timer, dispatch} = useContext(TimerContext);
  const {minutesLeft, secondsLeft, running, session, breakTime, message} = timer;

  useEffect(() => {
    if (running) {
      let idTimeout = setTimeout(() => {
        dispatch({
          type: 'UPDATE_TIMER',
          minutesLeft: minutesLeft,
          secondsLeft: secondsLeft - 1,
        });
      }, 1000);

      if (minutesLeft === 1 && secondsLeft === 0) {
        playAudio();
        setTimeout(stopAudio, 5000);
      }

      return () => {
        clearInterval(idTimeout);
      }
    } else if (secondsLeft === -1) {
      let nextAction = session ? 'START_BREAK' : 'RESTART_SESSION';
      dispatch({type: nextAction});
    }
  }, [minutesLeft, secondsLeft, running]);

  return (
    <>
      <div id="timer-label">{session ? 'Session' : breakTime ? 'break' : ''}</div>
      <div id="time-left">
        <div id="minutes">
          <h2
            className={minutesLeft === 1 && secondsLeft < 60 ? 'few-seconds-remaining' : ''}
          >
            {secondsLeft < 60 ? minutesLeft - 1 : minutesLeft}
          </h2>
          <h4>Minutes</h4>
        </div>
          :
      <div id="seconds">
          <h2
            className={minutesLeft === 1 && secondsLeft < 60 ? 'few-seconds-remaining' : ''}
          >
            {(secondsLeft <= 0 || secondsLeft === 60) ? '00' : secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</h2>
          <h4>Seconds</h4>
        </div>
      </div>
    </>
  );
}

const Wrapper = ({children}) => {
  return (
    <div className="external-wrapper">
      <div className="internal-wrapper">
        <h1 className="title">25 + 5 clock</h1>
        {children}
      </div>
      <audio src="sfx/alarm_sound_effect.mp3" id="beep" controls hidden /> {/*HIDDEN AUDIO TAG*/}
    </div>
  );
}

const PomodoroClock = () => {
  return (
    <TimerContextProvider>
      <Wrapper>
        <TimeLeft />
        <SessionBreakPanel />
        <Controls />
      </Wrapper>
    </TimerContextProvider>
  );
}

export default PomodoroClock;
