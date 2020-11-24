const stopAudio = () => {
  let beepElement = document.querySelector('#beep');
  beepElement.pause();
  beepElement.currentTime = 0;
};

const playAudio = () => {
  let beepElement = document.querySelector('#beep');
  beepElement.play();
};

const validateAction = (running, minutes, actionObj, dispatch) => {

  switch (actionObj.type) {
    case 'INCREASE_LENGTH':
      if (!running && (minutes < 60)) {
        dispatch(actionObj)
      }
      break;
    case 'DECREASE_LENGTH':
      if (!running && (minutes > 1)) {
        dispatch(actionObj);
      }
      break;
    default:
      console.error("ALGO PASO :(");
  }
}

export {stopAudio, playAudio, validateAction};
